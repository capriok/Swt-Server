export const router = require('express').Router()

export function initialize(io: any) {
	const swt = 'Sweetie'

	io.on("connection", (socket: any) => {
		socket.on('connected', ({ }) => {
			console.log('Socket: Connected');
			socket.join(swt)
		})

		socket.on('update-message', (message: string) => {
			console.log('Socket: Update Message');
			console.log(message);
			io.to(swt).emit('message-change', message)
		})
	})
}
