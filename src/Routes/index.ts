import { Router as R } from 'express'

import CalendarEventRouter from './Calendar'
import GroceryRouter from './Grocery'
import CatConfigRouter from './Cats'
import { Ping } from '../Controllers/Ping'
import { GetWeatherStats } from '../Controllers/Weather'

export default function Router(router: R): R {
	router.route('/ping').get(Ping)
	router.route('/ws').get(GetWeatherStats)
	CalendarEventRouter(router)
	GroceryRouter(router)
	CatConfigRouter(router)
	return router
}