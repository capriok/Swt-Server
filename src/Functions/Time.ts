export function tzZero(date: any) {
	const d = new Date(date)
	d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
	return d
}

export function tzDate(date: any) {
	const d = new Date(date)
	d.setMinutes(d.getMinutes() + 420)
	return d.toJSON()
}
