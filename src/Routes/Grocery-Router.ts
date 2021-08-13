import { Router } from 'express'
import * as GroceryController from '../Controllers/Grocery-Controller'

export default function GroceryRouter(router: Router): void {
	router.route('/gl')
		.get(GroceryController.GetGroceryList)
		.post(GroceryController.PostGrocery)
		.delete(GroceryController.DeleteGrocery)

	router.route('/gl-clear')
		.post(GroceryController.ClearGroceryList)
}