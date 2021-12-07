import { Router as R } from 'express'

import CalendarEventRouter from './CalendarEvent'
import GroceryRouter from './Grocery'
import CatConfigRouter from './CatConfig'
import { Ping } from '../Controllers/Ping'
import CrimasMessageRouter from './CrimasMessage'

export default function Router(router: R): R {
	router.route('/ping').get(Ping)
	CalendarEventRouter(router)
	GroceryRouter(router)
	CatConfigRouter(router)
	CrimasMessageRouter(router)
	return router
}