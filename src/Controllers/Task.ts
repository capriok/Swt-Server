import { FindDocument, CreateDocument, DeleteDocument, ClearDocuments } from '../Database/Queries'
import { Request, Response } from 'express'
import { TaskModel } from '../Models/Task'
import { sortByPinned } from '../Functions/Sorters'

export const GetTaskList = async (req: Request, res: Response) => {
	console.log('Request: Task List')

	const taskList = await FindDocument(TaskModel, {})
	res.json({ list: sortByPinned(taskList) })
}
export const PostTask = async (req: Request, res: Response) => {
	console.log('Request: Post Task')

	const { task } = req.body
	const taskList = await CreateDocument(TaskModel, task)

	res.json({ list: sortByPinned(taskList) })
}
export const DeleteTask = async (req: Request, res: Response) => {
	console.log('Request: Delete Task')

	const { id } = req.body
	const taskList = await DeleteDocument(TaskModel, id)

	res.json({ list: sortByPinned(taskList) })
}
export const ClearTaskList = async (req: Request, res: Response) => {
	console.log('Request: Clear Task List')

	const taskList = await ClearDocuments(TaskModel)

	res.json({ list: sortByPinned(taskList) })
}