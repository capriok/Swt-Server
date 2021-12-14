import { compareAsc } from 'date-fns'

export function sortByName(pl: Array<any>) {
	return pl.sort((a, b) => a.name.localeCompare(b.name))
}

export function sortByDate(arr: Array<any>) {
	return arr.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
}