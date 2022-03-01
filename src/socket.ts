export const router = require('express').Router()

export function initialize(io: any) {
	const swt = 'Sweetie'

	io.on("connection", (socket: any) => {

		socket.on('connected', ({ }) => {
			console.log(`Socket: Connected to ${swt}`)
			socket.join(swt)
		})

		socket.on('calendar-change', (data) => {
			console.log('Socket: Changed Calendar Events')
			io.to(swt).emit('calendar-update', data)
		})

		socket.on('grocery-change', (data) => {
			console.log('Socket: Changed Grocery List')
			io.to(swt).emit('grocery-update', data)
		})

		socket.on('schedule-change', (data) => {
			console.log('Socket: Changed Schedules')
			io.to(swt).emit('schedule-update', data)
		})

	})
}
