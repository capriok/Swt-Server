import { Router as R } from 'express'

import CalendarEventRouter from './CalendarEvent'
import GroceryRouter from './Grocery'
import CatConfigRouter from './CatConfig'
import { Ping } from '../Controllers/Ping'

export default function Router(router: R): R {
	router.route('/ping').get(Ping)
	CalendarEventRouter(router)
	GroceryRouter(router)
	CatConfigRouter(router)
	return router
}