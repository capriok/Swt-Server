import { startOfToday, isSameDay, compareAsc, addDays, subDays, differenceInDays } from 'date-fns'
import { FindDocument, UpdateDocument } from '../Database/Queries'
import { CatConfigModel } from '../Models/CatConfig'
import { PlantModel } from '../Models/Plant'

export async function CatFood(cd: CatConfig): Promise<Array<CatScheduleDay>> {
	const Interval = 2

	let lastFoodDay = new Date(cd.lastFoodDay)
	const shouldUpdate = LastDayComaprison(lastFoodDay, Interval)

	if (shouldUpdate) {
		const nextDay = addDays(lastFoodDay, Interval)
		lastFoodDay = nextDay
		const doc = { lastFoodDay: nextDay.toJSON() }
		await UpdateDocument(CatConfigModel, '6118113fa75dc53ee49558d2', doc)
	}

	const foodDays = MapDays(lastFoodDay, Interval)
	// console.log(foodDays);

	return foodDays
}

export async function CatWaste(cd: CatConfig): Promise<Array<CatScheduleDay>> {
	const Interval = 4

	let lastWasteDay = new Date(cd.lastWasteDay)
	const shouldUpdate = LastDayComaprison(lastWasteDay, Interval)

	if (shouldUpdate) {
		const nextDay = addDays(lastWasteDay, Interval)
		lastWasteDay = nextDay
		const doc = { lastWasteDay: nextDay.toJSON() }
		await UpdateDocument(CatConfigModel, '6118113fa75dc53ee49558d2', doc)
	}

	const wasteDays = MapDays(lastWasteDay, Interval)
	// console.log(wasteDays);

	return wasteDays
}

const LastDayComaprison = (last, intv) => {
	const difInDays = Math.abs(differenceInDays(last, startOfToday()))
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

export async function Plants(pl: Array<Plant>): Promise<Array<PlantScheduleDay>> {
	const today = startOfToday()
	const thisWeek = generateWeek(today)

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

function generateWeek(s: Date) {
	let week = new Array()
	Populate(subDays(s, 3), 1)
	return week

	function Populate(s, n) {
		if (n > 7) return
		week.push(s)
		Populate(addDays(s, 1), n + 1)
	}
}



type CatConfig = {
	lastFoodDay: string
	lastWasteDay: string
}
type CatScheduleDay = {
	date: Date
	food: {
		is: boolean
		progress: number
	}
	waste: {
		is: boolean
		progress: number
	}
}
type Plant = {
	id: string
	name: string
	cycle: number
	last: string
}
type PlantScheduleDay = {
	date: Date
	plants: Array<Plant>
}