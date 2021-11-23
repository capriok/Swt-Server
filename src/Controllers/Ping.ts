import { Request, Response } from 'express'

export const Ping = async (req: Request, res: Response) => {
	console.log('Request: Ping!')
	res.json({ status: 200 })
}