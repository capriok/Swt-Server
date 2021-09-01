import { Request, Response } from 'express'
import { CalenderEventModel } from '../Models/CalenderEvent'
import { FindDocument, CreateDocument, UpdateDocument, DeleteDocument } from '../Database/Queries'
import { sortByDate } from '../Functions/Sorters'
import { ServerDate } from '../Functions/Scheduler'
import { isAfter } from 'date-fns'

export const GetCalenderEventList = async (req: Request, res: Response) => {
	console.log('Request: Calender Events')

	const calenderEvents = await FindDocument(CalenderEventModel, {})
	calenderEvents.filter(ce => {
		if (isAfter(new Date(ServerDate), new Date(ce.date))) {
			console.log('Deleting Past Calender Event');
			DeleteDocument(CalenderEventModel, ce.id)
		}
	})
	const filteredPastCalenderEvents = calenderEvents

	res.json({ list: (sortByDate(filteredPastCalenderEvents)) })
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
		timed: event.timed,
		date: event.date,
		startTime: event.startTime,
		endTime: event.endTime
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