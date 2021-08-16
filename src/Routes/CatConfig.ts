import { Router } from 'express'
import * as CatConfigController from '../Controllers/CatConfig'

export default function CatConfigRouter(router: Router): void {
	router.route('/cs')
		.get(CatConfigController.GetCatSchedule)

	router.route('/cc')
		.get(CatConfigController.GetCatConfig)
		.put(CatConfigController.UpdateCatConfig)
}