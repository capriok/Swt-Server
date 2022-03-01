export function TimezoneZero(date: any) {
	const d = new Date(date)
	d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
	return d
}

export function TimezoneDate(date: any) {
	const d = new Date(date)
	d.setMinutes(d.getMinutes() + 420)
	return d.toJSON()
}
