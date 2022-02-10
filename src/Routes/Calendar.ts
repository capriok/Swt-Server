import { Router } from 'express'
import * as CalendarEventController from '../Controllers/Calendar'

export default function CalendarEventRouter(router: Router): void {
	router.route('/ce')
		.get(CalendarEventController.GetCalendarEventList)
		.post(CalendarEventController.PostCalendarEvent)
		.put(CalendarEventController.UpdateCalendarEvent)
		.delete(CalendarEventController.DeleteCalendarEvent)
}