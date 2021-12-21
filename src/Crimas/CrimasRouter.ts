import { Router } from 'express'
import * as CrimasMessageController from './CrimasController'

export default function CrimasMessageRouter(router: Router): void {
	router.route('/cm')
		.get(CrimasMessageController.GetCrimasMessage)
		.put(CrimasMessageController.UpdateCrimasMessage)
}