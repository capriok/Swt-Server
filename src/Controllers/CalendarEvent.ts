import { Request, Response } from 'express'
import { CalendarEventModel } from '../Models/CalendarEvent'
import { FindDocument, CreateDocument, UpdateDocument, DeleteDocument } from '../Database/Queries'
import { sortByDate } from '../Functions/Sorters'
import { isAfter } from 'date-fns'

function filterEventsBeforeFirstOfMonth(ces) {
	return ces.filter(ce => {
		return isAfter(
			new Date(ce.date),
			new Date(new Date(new Date().getFullYear(), new Date().getMonth(), 0))
		) && ce
	})
}

export const GetCalendarEventList = async (req: Request, res: Response) => {
	console.log('Request: Calendar Event List')

	const calendarEventList = await FindDocument(CalendarEventModel, {})
	const eventsAfterFirstOfMonth = filterEventsBeforeFirstOfMonth(calendarEventList)

	res.json({ list: (sortByDate(eventsAfterFirstOfMonth)) })
}
export const PostCalendarEvent = async (req: Request, res: Response) => {
	console.log('Request: Post Calendar Event')

	const { event } = req.body
	console.log(event)
	const calendarEventList = await CreateDocument(CalendarEventModel, event)
	const eventsAfterFirstOfMonth = filterEventsBeforeFirstOfMonth(calendarEventList)

	res.json({ list: sortByDate(eventsAfterFirstOfMonth) })
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
	const eventsAfterFirstOfMonth = filterEventsBeforeFirstOfMonth(calendarEventList)

	res.json({ list: sortByDate(eventsAfterFirstOfMonth) })
}
export const DeleteCalendarEvent = async (req: Request, res: Response) => {
	console.log('Request: Delete Calendar Event')

	const { id } = req.body
	const calendarEventList = await DeleteDocument(CalendarEventModel, id)
	const eventsAfterFirstOfMonth = filterEventsBeforeFirstOfMonth(calendarEventList)

	res.json({ list: sortByDate(eventsAfterFirstOfMonth) })
}