import { startOfToday, isSameDay, compareAsc, addDays, differenceInDays } from 'date-fns'
import { UpdateDocument } from '../Database/Queries'
import { CatConfigModel } from '../Models/Cats'
import { GenerateWeek, LastDayComaprison, MapDays, ServerDate } from './Common'

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

export async function CatsSchedules(cc: CatConfig): Promise<Array<CatScheduleDay>> {
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
		console.log('Updating CatConfigModel Last Food Day');
		await UpdateDocument(CatConfigModel, '6119628c4d3b6b515097dea6', doc)
	}

	const foodDays = MapDays(lastFoodDay, Interval)

	return foodDays
}

async function CatWaste(cd: CatConfig): Promise<Array<CatScheduleDay>> {
	const Interval = 3

	let lastWasteDay = new Date(cd.lastWasteDay)
	const shouldUpdate = LastDayComaprison(lastWasteDay, Interval)

	if (shouldUpdate) {
		const nextDay = addDays(lastWasteDay, Interval)
		lastWasteDay = nextDay
		const doc = { lastWasteDay: nextDay.toJSON() }
		console.log('Updating CatConfigModel Last Waste Day');
		await UpdateDocument(CatConfigModel, '6119628c4d3b6b515097dea6', doc)
	}

	const wasteDays = MapDays(lastWasteDay, Interval)

	return wasteDays
}
