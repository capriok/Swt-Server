import { Request, Response } from 'express'
import { GetWeather } from '../Functions/Weather'

export const GetWeatherStats = async (req: Request, res: Response) => {
	console.log('Request: Weather Stats')

	const weatherStats = await GetWeather()

	res.json({ stats: weatherStats })
}