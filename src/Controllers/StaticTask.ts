import { Request, Response } from 'express'
import { StaticTaskModel } from '../Models/StaticTask'
import { FindDocument, CreateDocument, UpdateDocument } from '../Database/Queries'

export const GetStaticTaskList = async (req: Request, res: Response) => {
	console.log('Request: Static Task List')

	const staticTaskList = await FindDocument(StaticTaskModel, {})

	res.json({ list: staticTaskList })
}
export const PostStaticTask = async (req: Request, res: Response) => {
	console.log('Request: Post Static Task')

	const { task } = req.body
	console.log(task)
	const staticTaskList = await CreateDocument(StaticTaskModel, task)

	res.json({ list: staticTaskList })
}
export const UpdateStaticTask = async (req: Request, res: Response) => {
	console.log('Request: Update Static Task')

	const { task } = req.body
	console.log(task)
	const update = {
		name: task.name,
		weekday: task.weekday
	}
	const staticTaskList = await UpdateDocument(StaticTaskModel, task.id, update)

	res.json({ list: staticTaskList })
}