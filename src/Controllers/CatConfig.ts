import { Request, Response } from 'express'
import { CatConfigModel } from '../Models/CatConfig'
import { FindDocument, CreateDocument, ClearDocuments } from '../Database/Queries'

import * as Scheduler from '../Functions/Scheduler'
import { PlantModel } from '../Models/Plant'

export const GetCatConfigSchedule = async (req: Request, res: Response) => {
	console.log('Request: Cats Schedule')

	const catConfig = await FindDocument(CatConfigModel, {}).then(res => { return res[0] })
	const catSchedule = {
		food: await Scheduler.CatFood(catConfig),
		waste: await Scheduler.CatWaste(catConfig)
	}

	res.json({ schedule: catSchedule })
}

export const GetCatConfig = async (req: Request, res: Response) => {
	console.log('Request: Cat Config')

	const catConfig = await FindDocument(CatConfigModel, {})

	res.json({ days: catConfig })
}

export const UpdateCatConfig = async (req: Request, res: Response) => {
	console.log('Request: Update Cat Config')

	const { config } = req.body
	await ClearDocuments(CatConfigModel)
	const catConfig = await CreateDocument(CatConfigModel, config)

	res.json({ config: catConfig })
}