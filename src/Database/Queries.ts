import { ReturnModelType } from '@typegoose/typegoose'
export async function FindDocument(model, query): Promise<Array<typeof model>> {
	return await model.find(query)
}
export async function CreateDocument(model, doc): Promise<Array<typeof model>> {
	return await model
		.create(doc)
		.then(async () => await FindDocument(model, {}))
		.catch(err => { throw err })
}
export async function UpdateDocument(model, id, doc): Promise<Array<typeof model>> {
	const q = { _id: id }
	const u = { $set: doc }
	return await model.updateOne(q, u)
		.then(async () => await FindDocument(model, {}))
		.catch(err => { throw err })
}
export async function DeleteDocument(model, id): Promise<Array<typeof model>> {
	const q = { _id: id }
	return await model.deleteOne(q)
		.then(async () => await FindDocument(model, {}))
		.catch(err => { throw err })
}
export async function ClearDocuments(model): Promise<Array<typeof model>> {
	return await model.deleteMany({})
		.then(async () => await FindDocument(model, {}))
		.catch(err => { throw err })
}