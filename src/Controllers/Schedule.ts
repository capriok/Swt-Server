import { Request, Response } from 'express'
import { ScheduleModel } from '../Models/Schedule'
import { FindDocument, UpdateDocument } from '../Database/Queries'

import { HomeSchedules } from '../Functions/Schedule'

export const GetSchedules = async (req: Request, res: Response) => {
	console.log('Request: Schedules')

	const scheduleConfig = await FindDocument(ScheduleModel, {}).then(res => { return res[0] })
	const schedules = await HomeSchedules(scheduleConfig)

	res.json({ schedules: schedules })
}

export const GetScheduleConfig = async (req: Request, res: Response) => {
	console.log('Request: Schedule Config')

	const scheduleConfig = await FindDocument(ScheduleModel, {})

	res.json({ config: scheduleConfig[0] })
}

export const UpdateScheduleConfig = async (req: Request, res: Response) => {
	console.log('Request: Update Schedule Config')

	const { config } = req.body
	console.log(config)
	const schedulesId = await FindDocument(ScheduleModel, {}).then(res => { return res[0]._id })
	const scheduleConfig = await UpdateDocument(ScheduleModel, schedulesId, config)

	res.json({ config: scheduleConfig[0] })
}
