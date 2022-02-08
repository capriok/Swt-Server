import { Router } from 'express'
import * as GroceryController from '../Controllers/Grocery'

export default function GroceryRouter(router: Router): void {
	router.route('/gl')
		.get(GroceryController.GetGroceryList)
		.post(GroceryController.PostGrocery)
		.put(GroceryController.UpdateGrocery)

	router.route('/gl-rem-checked')
		.post(GroceryController.DeleteCheckedGrocery)

	router.route('/gl-rem-all')
		.post(GroceryController.DeleteAllGrocery)
}