import { Router } from 'express'
import * as ScheduleController from '../Controllers/Schedule'

export default function CatConfigRouter(router: Router): void {
	router.route('/schedule')
		.get(ScheduleController.GetSchedules)

	router.route('/schedule-config')
		.get(ScheduleController.GetScheduleConfig)
		.put(ScheduleController.UpdateScheduleConfig)
}