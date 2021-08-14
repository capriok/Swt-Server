import { Router as R } from 'express'

import CalenderEventRouter from './CalenderEvent'
import GroceryRouter from './Grocery'
import TaskRouter from './Task'
import StaticTaskRouter from './StaticTask'
import CatConfigRouter from './CatConfig'
import PlantRouter from './Plant'

export default function Router(router: R): R {
	CalenderEventRouter(router)
	GroceryRouter(router)
	TaskRouter(router)
	StaticTaskRouter(router)
	CatConfigRouter(router)
	PlantRouter(router)
	return router
}