import { compareAsc, isAfter, startOfToday } from 'date-fns'
import { tzDate, tzZero } from './Time'

export function sortByName(pl: Array<any>) {
	return pl.sort((a, b) => a.name.localeCompare(b.name))
}

export function sortByDate(arr: Array<any>) {
	return arr.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
}

export function findToday(days: Array<any>) {
	return days.find((d) => {
		return new Date(d.date).toLocaleDateString() === tzZero(startOfToday()).toLocaleDateString()
	})
}

export function formatDates(arr: Array<any>) {
	return arr.map((x: any) => {
		x.date = tzDate(x.date)
		return x
	})
}

export function eventListFilterSort(ces) {
	const events = ces.filter(ce => {
		return isAfter(
			new Date(ce.date),
			new Date(new Date(new Date().getFullYear(), new Date().getMonth(), 0))
		) && ce
	})
	const formattedDates = formatDates(events)
	const sortedEvents = sortByDate(formattedDates)

	return sortedEvents
}
