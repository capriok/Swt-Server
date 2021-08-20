import { Request, Response } from 'express'
import { CalenderEventModel } from '../Models/CalenderEvent'
import { FindDocument, CreateDocument, UpdateDocument, DeleteDocument } from '../Database/Queries'
import { sortByDate } from '../Functions/Sorters'

export const GetCalenderEventList = async (req: Request, res: Response) => {
	console.log('Request: Calender Events')

	const calenderEvents = await FindDocument(CalenderEventModel, {})

	res.json({ list: (sortByDate(calenderEvents)) })
}
export const PostCalenderEvent = async (req: Request, res: Response) => {
	console.log('Request: Post Calender Event')

	const { event } = req.body
	console.log(event)
	const calenderEventList = await CreateDocument(CalenderEventModel, event)

	res.json({ list: sortByDate(calenderEventList) })
}
export const UpdateCalenderEvent = async (req: Request, res: Response) => {
	console.log('Request: Update Calender Event')

	const { event } = req.body
	console.log(event)
	const update = {
		date: event.date,
		timed: event.timed
	}

	const calenderEventList = await UpdateDocument(CalenderEventModel, event.id, update)

	res.json({ list: sortByDate(calenderEventList) })
}
export const DeleteCalenderEvent = async (req: Request, res: Response) => {
	console.log('Request: Delete Calender Event')

	const { id } = req.body
	const calenderEventList = await DeleteDocument(CalenderEventModel, id)

	res.json({ list: sortByDate(calenderEventList) })
}