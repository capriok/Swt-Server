import { Router as R } from 'express'

import CalendarEventRouter from './Calendar'
import GroceryRouter from './Grocery'
import ScheduleRouter from './Schedule'
import { Ping } from '../Controllers/Ping'
import { GetWeatherStats } from '../Controllers/Weather'

export default function Router(router: R): R {
	router.route('/ping').get(Ping)
	router.route('/weather').get(GetWeatherStats)
	CalendarEventRouter(router)
	GroceryRouter(router)
	ScheduleRouter(router)
	return router
}