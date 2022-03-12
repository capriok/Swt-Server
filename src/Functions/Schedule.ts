import { isSameDay, addDays, differenceInDays, compareAsc } from 'date-fns'
import { FindDocument, UpdateDocument } from '../Database/Queries'
import { ScheduleModel } from '../Models/Schedule'
import { ServerDate } from './Index'

type ScheduleConfig = {
	id?: string
	lastFoodDay: string
	lastWasteDay: string
	lastFloorDay: string
}
type ScheduleDay = {
	date: Date
	is: boolean
	progress: number
}

export async function Schedules(sc: ScheduleConfig) {
	const scheduleConfig = {
		food: await UpdateConfig('lastFoodDay', sc.lastFoodDay, 2),
		waste: await UpdateConfig('lastWasteDay', sc.lastWasteDay, 3),
		floor: await UpdateConfig('lastFloorDay', sc.lastFloorDay, 7)
	}

	const foodDayMatch = scheduleConfig.food.find((d) => isSameDay(d.date, ServerDate))
	const wasteDayMatch = scheduleConfig.waste.find((d) => isSameDay(d.date, ServerDate))
	const floorDayMatch = scheduleConfig.floor.find((d) => isSameDay(d.date, ServerDate))

	return {
		date: ServerDate,
		food: {
			is: foodDayMatch.is,
			progress: foodDayMatch.progress
		},
		waste: {
			is: wasteDayMatch.is,
			progress: wasteDayMatch.progress
		},
		floor: {
			is: floorDayMatch.is,
			progress: floorDayMatch.progress
		}
	}
}

async function UpdateConfig(type: string, config: string, interval: number): Promise<Array<ScheduleDay>> {
	let lastDay = new Date(config)
	const shouldUpdate = LastDayComaprison(lastDay, interval)

	if (shouldUpdate) {
		const nextDay = addDays(lastDay, interval)
		lastDay = nextDay
		const doc = { [type]: nextDay.toJSON() }
		console.log(`Updating ScheduleModel: ${type}`);
		const schedulesId = await FindDocument(ScheduleModel, {}).then(res => { return res[0]._id })
		await UpdateDocument(ScheduleModel, schedulesId, doc)
	}

	return GenerateSchedule(lastDay, interval)
}

function LastDayComaprison(last: Date, intv: number) {
	const difInDays = Math.abs(differenceInDays(last, ServerDate))
	return difInDays >= intv
		? true
		: false
}

function GenerateSchedule(last: Date, intv: number): Array<any> {
	const days = new Array()

	FindDays(last)

	return [...new Map(days.map(d => [d.date, d])).values()]
		.sort((a, b) => compareAsc(a.date, b.date))

	function FindDays(l, temp = l, n = intv + 1) {
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