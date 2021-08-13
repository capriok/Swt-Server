import { Request, Response } from 'express'
import { CatConfigModel } from '../Models/CatConfig'
import { FindDocument, CreateDocument, ClearDocuments } from '../Database/Queries'

export const GetCatConfigSchedule = async (req: Request, res: Response) => {
	console.log('Request: Cats Schedule')

	const catConfig = await FindDocument(CatConfigModel, {})
	// const catSchedule = Swt.getCatSchedule(catConfig)
	res.json({ schedule: catConfig })
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