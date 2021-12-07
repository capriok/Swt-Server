import { Request, Response } from 'express'
import { FindDocument, UpdateDocument } from '../Database/Queries'
import { CrimasMessageModel } from '../Models/CrimasMessage'

export const GetCrimasMessage = async (req: Request, res: Response) => {
	console.log('Request: Crimas Message!')

	const crimasMessage = await FindDocument(CrimasMessageModel, {})

	res.json({ message: crimasMessage[0].message })
}

export const UpdateCrimasMessage = async (req: Request, res: Response) => {
	console.log('Request: Update Crimas Message!')

	const { message } = req.body
	const crimasMessage = await UpdateDocument(CrimasMessageModel, '61afc6a4d405fe22c8d41adb', { message })

	res.json({ message: crimasMessage[0].message })
}