import { compareAsc } from 'date-fns'
import { tzDate } from './Time'

export function SortByDate(arr: Array<any>) {
	return arr.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
}

export function FormatDates(arr: Array<any>) {
	return arr.map((x: any) => {
		x.date = tzDate(x.date)
		return x
	})
}

export function FilterBeforeCurrentMonth(events) {
	return events.filter(e => {
		const eventDate = new Date(e.date).getTime()
		const lastDayofLastMonth = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			0
		).getTime()

		return eventDate > lastDayofLastMonth && e
	})
}
