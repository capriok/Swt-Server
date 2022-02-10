import { prop, getModelForClass } from '@typegoose/typegoose';

class Grocery {
	@prop({ type: String, required: true })
	public name!: string;

	@prop({ type: Boolean, required: true })
	public checked!: boolean;
}

export const GroceryModel = getModelForClass(Grocery)