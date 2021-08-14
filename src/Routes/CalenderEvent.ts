import { Router } from 'express'
import * as CalenderEventController from '../Controllers/CalenderEvent'

export default function CalenderEventRouter(router: Router): void {
	router.route('/ce')
		.get(CalenderEventController.GetCalenderEventList)
		.post(CalenderEventController.PostCalenderEvent)
		.put(CalenderEventController.UpdateCalenderEvent)
		.delete(CalenderEventController.DeleteCalenderEvent)
}