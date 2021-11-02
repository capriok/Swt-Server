import { Request, Response } from 'express'
import { CalendarEventModel } from '../Models/CalendarEvent'
import { FindDocument, CreateDocument, UpdateDocument, DeleteDocument } from '../Database/Queries'
import { sortByDate } from '../Functions/Sorters'
import { isBefore } from 'date-fns'

export const GetCalendarEventList = async (req: Request, res: Response) => {
	console.log('Request: Calendar Events')

	const calendarEvents = await FindDocument(CalendarEventModel, {})
	const d = new Date()
	const eventsAfterFirstOfMonth = []

	calendarEvents.forEach(ce => {
		if (isBefore(new Date(new Date(d.getFullYear(), d.getMonth(), 1)), new Date(ce.date))) eventsAfterFirstOfMonth.push(ce)
	})

	console.log(eventsAfterFirstOfMonth);

	res.json({ list: (sortByDate(eventsAfterFirstOfMonth)) })
}
export const PostCalendarEvent = async (req: Request, res: Response) => {
	console.log('Request: Post Calendar Event')

	const { event } = req.body
	console.log(event)
	const calendarEventList = await CreateDocument(CalendarEventModel, event)

	res.json({ list: sortByDate(calendarEventList) })
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

	res.json({ list: sortByDate(calendarEventList) })
}
export const DeleteCalendarEvent = async (req: Request, res: Response) => {
	console.log('Request: Delete Calendar Event')

	const { id } = req.body
	const calendarEventList = await DeleteDocument(CalendarEventModel, id)

	res.json({ list: sortByDate(calendarEventList) })
}