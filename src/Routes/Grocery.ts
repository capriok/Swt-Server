import { Router } from 'express'
import * as GroceryController from '../Controllers/Grocery'

export default function GroceryRouter(router: Router): void {
	router.route('/grocery')
		.get(GroceryController.GetGroceryList)
		.post(GroceryController.PostGrocery)
		.put(GroceryController.UpdateGrocery)

	router.route('/grocery-rem-checked')
		.post(GroceryController.DeleteCheckedGrocery)

	router.route('/grocery-rem-all')
		.post(GroceryController.DeleteAllGrocery)
}