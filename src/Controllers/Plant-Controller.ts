import { Request, Response } from 'express'
import { PlantModel } from '../Models/Plant'
import { FindDocument, CreateDocument, UpdateDocument, DeleteDocument } from '../Database/Queries'

export const GetPlantSchedule = async (req: Request, res: Response) => {
	console.log('Request: Plants Schedule')

	const plantList = await FindDocument(PlantModel, {})
	// const plantSchedule = Swt.getPlantSchedule(plantList)
	res.json({ schedule: plantList })
}

export const GetPlantList = async (req: Request, res: Response) => {
	console.log('Request: Plant List')

	const plantList = await FindDocument(PlantModel, {})
	res.json({ list: plantList })
}
export const PostPlant = async (req: Request, res: Response) => {
	console.log('Request: Post Plant')

	const { plant } = req.body
	const plantList = await CreateDocument(PlantModel, plant)

	res.json({ list: plantList })
}
export const UpdatePlant = async (req: Request, res: Response) => {
	console.log('Request: Update Plant')

	const { plant } = req.body
	const update = {
		cycle: plant.cycle,
		last: plant.last
	}
	const plantList = await UpdateDocument(PlantModel, plant.id, update)

	res.json({ list: plantList })
}
export const DeletePlant = async (req: Request, res: Response) => {
	console.log('Request: Delete Plant')

	const { id } = req.body
	const plantList = await DeleteDocument(PlantModel, id)

	res.json({ list: plantList })
}