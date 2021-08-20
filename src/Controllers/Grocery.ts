import { Request, Response } from 'express'
import { GroceryModel } from '../Models/Grocery'
import { FindDocument, CreateDocument, DeleteDocument, ClearDocuments } from '../Database/Queries'

export const GetGroceryList = async (req: Request, res: Response) => {
	console.log('Request: Grocery List')

	const groceryList = await FindDocument(GroceryModel, {})

	res.json({ list: groceryList })
}
export const PostGrocery = async (req: Request, res: Response) => {
	console.log('Request: Post Grocery')

	const { item } = req.body
	console.log(item)
	const groceryList = await CreateDocument(GroceryModel, item)

	res.json({ list: groceryList })
}
export const DeleteGrocery = async (req: Request, res: Response) => {
	console.log('Request: Delete Grocery')

	const { id } = req.body
	const groceryList = await DeleteDocument(GroceryModel, id)

	res.json({ list: groceryList })
}
export const ClearGroceryList = async (req: Request, res: Response) => {
	console.log('Request: Clear Grocery List')

	const groceryList = await ClearDocuments(GroceryModel)

	res.json({ list: groceryList })
}