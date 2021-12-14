import { prop, getModelForClass } from '@typegoose/typegoose';

class Grocery {
	@prop({ type: String, required: true })
	public name!: string;

	@prop({ type: Number, required: true })
	public qty!: number;

	@prop({ type: String, required: true })
	public type!: string;
}

export const GroceryModel = getModelForClass(Grocery);