import { startOfToday } from 'date-fns'

export const ServerDate: Date = startOfToday()
ServerDate.setMinutes(ServerDate.getMinutes() - ServerDate.getTimezoneOffset())
console.log('ServerDate:', ServerDate)

export function SortByName(pl: Array<any>) {
	return pl.sort((a, b) => a.name.localeCompare(b.name))
}
