import { Router as R } from 'express'

import CalenderEventRouter from './CalenderEvent-Router'
import GroceryRouter from './Grocery-Router'
import TaskRouter from './Task-Router'
import StaticTaskRouter from './StaticTask-Router'
import CatConfigRouter from './CatConfig-Router'
import PlantRouter from './Plant-Router'

export default function Router(router: R): R {
	CalenderEventRouter(router)
	GroceryRouter(router)
	TaskRouter(router)
	StaticTaskRouter(router)
	CatConfigRouter(router)
	PlantRouter(router)
	return router
};