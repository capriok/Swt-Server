import { startOfToday, isSameDay, compareAsc, addDays, subDays, differenceInDays } from 'date-fns'

export function generateWeek(s: Date) {
	let week = new Array()
	Populate(subDays(s, 3), 1)
	return week

	function Populate(s, n) {
		if (n > 7) return
		week.push(s)
		Populate(addDays(s, 1), n + 1)
	}
}

export function createCatSchedule(cd: CatConfig): Array<CatScheduleDay> {
	const { lastFoodDay, lastWasteDay } = cd

	// verfiy last food day of food and waste
	// 	update json storage to today if day is intv after last day

	const Food_Intv = 2
	const Waste_Intv = 4

	const lfd = new Date(lastFoodDay)
	const lwd = new Date(lastWasteDay)
	const today = startOfToday()

	const thisWeek = generateWeek(today)

	const foodDays = FindDays(lfd, Food_Intv)
	const wasteDays = FindDays(lwd, Waste_Intv)

	const schedule: any = thisWeek.map(day => {
		const foodDayMatch = foodDays.find((d) => isSameDay(d.date, day))
		const wasteDayMatch = wasteDays.find((d) => isSameDay(d.date, day))

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

	// console.log(schedule);
	return schedule

	export function FindDays(last: Date, intv: number): Array<any> {
		const days = new Array()
		Find(subDays, last)
		Find(addDays, last)

		return [...new Map(days.map(d => [d.date, d])).values()]
			.sort((a, b) => compareAsc(a.date, b.date))

		function Find(cb, l, temp = l, n = 7) {
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

			if (isDay) temp = cb(l, intv)

			days.push(day)
			Find(cb, cb(l, 1), temp, n - 1)
		}
	}
}
export function createPlantSchedule(pl: Array<Plant>): Array<PlantScheduleDay> {
	const today = startOfToday()
	const thisWeek = generateWeek(today)

	const schedule: any = thisWeek.map(day => {
		const plants = new Array()
		pl.forEach(plant => {
			const plantLast = new Date(plant.last)
			const plantNext = addDays(plantLast, plant.cycle)

			if (isSameDay(day, plantNext)
				|| isSameDay(plantLast, today)
				// push plant if plantNext is after today
				// || isAfter(plantNext, today)
			) plants.push(plant)
		})

		return {
			date: day,
			plants: plants
		}
	})
	// console.log(schedule);
	return schedule
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