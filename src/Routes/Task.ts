import { Router } from 'express'
import * as TaskController from '../Controllers/Task'

export default function TaskRouter(router: Router): void {
	router.route('/tl')
		.get(TaskController.GetTaskList)
		.post(TaskController.PostTask)
		.delete(TaskController.DeleteTask)

	router.route('/tl-clear')
		.post(TaskController.ClearTaskList)
}