import { Request, Response } from 'express'
import { CatConfigModel } from '../Models/Cats'
import { FindDocument, UpdateDocument } from '../Database/Queries'

import { CatsSchedules } from '../Functions/Cats'
import { FindToday } from '../Functions/Common'

export const GetCatSchedule = async (req: Request, res: Response) => {
	console.log('Request: Cats Schedule')

	const catConfig = await FindDocument(CatConfigModel, {}).then(res => { return res[0] })
	const catSchedule = await CatsSchedules(catConfig)

	res.json({ today: FindToday(catSchedule) })
}

export const GetCatConfig = async (req: Request, res: Response) => {
	console.log('Request: Cat Config')

	const catConfig = await FindDocument(CatConfigModel, {})

	res.json({ config: catConfig[0] })
}

export const UpdateCatConfig = async (req: Request, res: Response) => {
	console.log('Request: Update Cat Config')

	const { config } = req.body
	console.log(config)
	const catConfig = await UpdateDocument(CatConfigModel, '6119628c4d3b6b515097dea6', config)

	res.json({ config: catConfig[0] })
}