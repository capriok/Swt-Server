import { addDays, compareAsc, differenceInDays, startOfToday } from 'date-fns'

export const ServerDate: Date = startOfToday()
ServerDate.setMinutes(ServerDate.getMinutes() - ServerDate.getTimezoneOffset())
console.log('ServerDate:', ServerDate)

export function SortByName(pl: Array<any>) {
	return pl.sort((a, b) => a.name.localeCompare(b.name))
}

export function LastDayComaprison(last: Date, intv: number) {
	const difInDays = Math.abs(differenceInDays(last, ServerDate))
	return difInDays >= intv
		? true
		: false
}

export function GenerateSchedule(last: Date, intv: number): Array<any> {
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
