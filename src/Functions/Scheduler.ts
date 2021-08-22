import { startOfToday, isSameDay, compareAsc, addDays, subDays, differenceInDays } from 'date-fns'
import { UpdateDocument } from '../Database/Queries'
import { CatConfigModel } from '../Models/CatConfig'
import { PlantModel } from '../Models/Plant'

type CatConfig = {
	id?: string
	lastFoodDay: string
	lastWasteDay: string
}
type CatScheduleDay = {
	date: Date
	is: boolean
	progress: number
}

type Plant = {
	id?: string
	name: string
	cycle: number
	last: string
}
type PlantScheduleDay = {
	date: Date
	plants: Array<Plant>
}

const isProd = process.env.NODE_ENV === 'production'
const isUTCNextDay = new Date().getHours() >= 17
console.log(new Date())
console.log(new Date().getHours())
console.log(isUTCNextDay)

const ServerDate = isProd && isUTCNextDay ? subDays(startOfToday(), 1) : startOfToday()
ServerDate.setMinutes(ServerDate.getMinutes() - ServerDate.getTimezoneOffset())
console.log(ServerDate);

export async function Cats(cc: CatConfig): Promise<Array<CatScheduleDay>> {
	const catSchedule = {
		food: await CatFood(cc),
		waste: await CatWaste(cc)
	}
	const week = GenerateWeek()

	const schedule: any = week.map(day => {
		const foodDayMatch = catSchedule.food.find((d) => isSameDay(d.date, day))
		const wasteDayMatch = catSchedule.waste.find((d) => isSameDay(d.date, day))

		if (!foodDayMatch || !wasteDayMatch) return

		return {
			date: day,
			food: {
				is: foodDayMatch.is,
				progress: foodDayMatch.progress
			},
			waste: {
				is: wasteDayMatch.is,
				progress: wasteDayMatch.progress
			}
		}
	})

	console.log(schedule);
	return schedule
}

export async function Plants(pl: Array<Plant>): Promise<Array<PlantScheduleDay>> {
	const thisWeek = GenerateWeek()

	pl.forEach(async plant => {
		let lastWaterDay = new Date(plant.last)
		const shouldUpdate = LastDayComaprison(lastWaterDay, plant.cycle)
		if (shouldUpdate) {
			const nextWaterDay = addDays(lastWaterDay, plant.cycle).toJSON()
			plant.last = nextWaterDay
			const doc = { last: nextWaterDay }
			await UpdateDocument(PlantModel, plant.id, doc)
		}
	})

	const schedule: any = thisWeek.map(day => {
		const plants = new Array()
		pl.forEach(plant => {
			const lastWaterDay = new Date(plant.last)
			const nextWaterDay = addDays(lastWaterDay, plant.cycle)
			if (isSameDay(day, nextWaterDay)) {
				plants.push(plant)
			}
		})

		return {
			date: day,
			plants: plants
		}
	})

	console.log(schedule);
	return schedule
}

async function CatFood(cd: CatConfig): Promise<Array<CatScheduleDay>> {
	const Interval = 2

	let lastFoodDay = new Date(cd.lastFoodDay)
	const shouldUpdate = LastDayComaprison(lastFoodDay, Interval)

	if (shouldUpdate) {
		const nextDay = addDays(lastFoodDay, Interval)
		lastFoodDay = nextDay
		const doc = { lastFoodDay: nextDay.toJSON() }
		console.log('Updating CatConfigModel Lfd --------------------------');
		await UpdateDocument(CatConfigModel, '6119628c4d3b6b515097dea6', doc)
	}

	const foodDays = MapDays(lastFoodDay, Interval)
	// console.log(foodDays);

	return foodDays
}

async function CatWaste(cd: CatConfig): Promise<Array<CatScheduleDay>> {
	const Interval = 4

	let lastWasteDay = new Date(cd.lastWasteDay)
	const shouldUpdate = LastDayComaprison(lastWasteDay, Interval)

	if (shouldUpdate) {
		const nextDay = addDays(lastWasteDay, Interval)
		lastWasteDay = nextDay
		const doc = { lastWasteDay: nextDay.toJSON() }
		console.log('Updating CatConfigModel Lwd --------------------------');
		await UpdateDocument(CatConfigModel, '6119628c4d3b6b515097dea6', doc)
	}

	const wasteDays = MapDays(lastWasteDay, Interval)
	// console.log(wasteDays);

	return wasteDays
}

function GenerateWeek() {
	let week = new Array()

	Populate(ServerDate, 1)
	console.log(week);
	return week

	function Populate(s, n) {
		if (n > 7) return
		week.push(s)
		Populate(addDays(s, 1), n + 1)
	}
}

function LastDayComaprison(last, intv) {
	const difInDays = Math.abs(differenceInDays(last, ServerDate))
	return difInDays >= intv
		? true
		: false
}

function MapDays(last: Date, intv: number): Array<any> {
	const days = new Array()

	FindDays(last)

	return [...new Map(days.map(d => [d.date, d])).values()]
		.sort((a, b) => compareAsc(a.date, b.date))

	function FindDays(l, temp = l, n = 14) {
		if (n === 0) return

		let isDay = true
		let prog = 100
		const dif = differenceInDays(l, temp)
		const percent = Math.abs(dif) / intv * 100

		if (dif !== 0) {
			isDay = false
			dif === -Math.abs(dif)
				? prog = prog - percent
				: prog = percent
		}

		const day = {
			date: l,
			is: isDay,
			progress: Math.floor(prog)
		}

		if (isDay) temp = addDays(l, intv)

		days.push(day)
		FindDays(addDays(l, 1), temp, n - 1)
	}
}
