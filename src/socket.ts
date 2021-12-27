export const router = require('express').Router()

export function initialize(io: any) {
	const swt = 'Sweetie'

	io.on("connection", (socket: any) => {

		socket.on('connected', ({ }) => {
			console.log('Socket: Connected');
			socket.join(swt)
		})

		socket.on('ce-change', (ce) => {
			console.log('Socket: Changed Calendar Events');
			io.to(swt).emit('ce-update', ce)
		})

		socket.on('gl-change', (gl) => {
			console.log('Socket: Changed Grocery List');
			io.to(swt).emit('gl-update', gl)
		})

		socket.on('cs-change', (cs) => {
			console.log('Socket: Changed Cat Schedule');
			io.to(swt).emit('cs-update', cs)
		})

	})
}
