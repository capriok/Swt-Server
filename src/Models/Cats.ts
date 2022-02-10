import { prop, getModelForClass } from '@typegoose/typegoose';

class CatConfig {
	@prop({ type: String, required: true })
	public lastFoodDay!: string;

	@prop({ type: String, required: true })
	public lastWasteDay!: string;

}

export const CatConfigModel = getModelForClass(CatConfig)