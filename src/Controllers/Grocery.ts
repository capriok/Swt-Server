import { Request, Response } from 'express'
import { GroceryModel } from '../Models/Grocery'
import { FindDocument, CreateDocument, UpdateDocument, DeleteManyDocuments } from '../Database/Queries'
import { SortByName } from '../Functions/Common'

export const GetGroceryList = async (req: Request, res: Response) => {
	console.log('Request: Grocery List')

	const groceryList = await FindDocument(GroceryModel, {})
	const sortedGroceryList = SortByName(groceryList)

	res.json({ list: sortedGroceryList })
}
export const PostGrocery = async (req: Request, res: Response) => {
	console.log('Request: Post Grocery')

	const { item } = req.body
	console.log(item)
	const groceryList = await CreateDocument(GroceryModel, item)
	const sortedGroceryList = SortByName(groceryList)

	res.json({ list: sortedGroceryList })
}
export const UpdateGrocery = async (req: Request, res: Response) => {
	console.log('Request: Update Grocery')

	const { item } = req.body
	console.log(item)
	const groceryList = await UpdateDocument(GroceryModel, item.id, item)
	const sortedGroceryList = SortByName(groceryList)

	res.json({ list: sortedGroceryList })
}
export const DeleteCheckedGrocery = async (req: Request, res: Response) => {
	console.log('Request: Delete Checked Grocery Items')

	const groceryList = await DeleteManyDocuments(GroceryModel, { checked: true })
	const sortedGroceryList = SortByName(groceryList)

	res.json({ list: sortedGroceryList })
}

export const DeleteAllGrocery = async (req: Request, res: Response) => {
	console.log('Request: Delete All Grocery Items')

	const groceryList = await DeleteManyDocuments(GroceryModel, {})
	const sortedGroceryList = SortByName(groceryList)

	res.json({ list: sortedGroceryList })
}
