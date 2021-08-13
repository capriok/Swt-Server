import { Router } from 'express'
import * as PlantController from '../Controllers/Plant-Controller'

export default function PlantRouter(router: Router): void {
	router.route('/ps')
		.get(PlantController.GetPlantSchedule)

	router.route('/pl')
		.get(PlantController.GetPlantList)
		.post(PlantController.PostPlant)
		.put(PlantController.UpdatePlant)
		.delete(PlantController.DeletePlant)
}