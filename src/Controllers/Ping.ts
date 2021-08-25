import { Request, Response } from 'express'

export const Ping = async (req: Request, res: Response) => {
	console.log('Request: Ping!')
	setTimeout(() => {
		res.json({ status: 200 })
	}, 2000)
}