import { Request, Response } from 'express'
import { CalendarEventModel } from '../Models/CalendarEvent'
import { FindDocument, CreateDocument, UpdateDocument, DeleteDocument } from '../Database/Queries'
import { eventListFilterFormatSort } from '../Functions/Data'

export const GetCalendarEventList = async (req: Request, res: Response) => {
	console.log('Request: Calendar Event List')

	const calendarEventList = await FindDocument(CalendarEventModel, {})
	const events = eventListFilterFormatSort(calendarEventList)

	res.json({ list: events })
}
export const PostCalendarEvent = async (req: Request, res: Response) => {
	console.log('Request: Post Calendar Event')

	const { event } = req.body
	console.log(event)
	const calendarEventList = await CreateDocument(CalendarEventModel, event)
	const events = eventListFilterFormatSort(calendarEventList)

	res.json({ list: events })
}
export const UpdateCalendarEvent = async (req: Request, res: Response) => {
	console.log('Request: Update Calendar Event')

	const { event } = req.body
	console.log(event)
	const update = {
		name: event.name,
		timed: event.timed,
		date: event.date,
		startTime: event.startTime,
		endTime: event.endTime
	}

	const calendarEventList = await UpdateDocument(CalendarEventModel, event.id, update)
	const events = eventListFilterFormatSort(calendarEventList)

	res.json({ list: events })
}
export const DeleteCalendarEvent = async (req: Request, res: Response) => {
	console.log('Request: Delete Calendar Event')

	const { id } = req.body
	const calendarEventList = await DeleteDocument(CalendarEventModel, id)
	const events = eventListFilterFormatSort(calendarEventList)

	res.json({ list: events })
}