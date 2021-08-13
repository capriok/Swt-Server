import { Router } from 'express'
import * as CatConfigController from '../Controllers/CatConfig-Controller'

export default function CatConfigRouter(router: Router): void {
	router.route('/cs')
		.get(CatConfigController.GetCatConfigSchedule)

	router.route('/cc')
		.get(CatConfigController.GetCatConfig)
		.put(CatConfigController.UpdateCatConfig)
}