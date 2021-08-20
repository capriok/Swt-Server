import { Router } from 'express'
import * as StaticTaskController from '../Controllers/StaticTask'

export default function StaticTaskRouter(router: Router): void {
	router.route('/st')
		.get(StaticTaskController.GetStaticTaskList)
		.post(StaticTaskController.PostStaticTask)
		.put(StaticTaskController.UpdateStaticTask)
}