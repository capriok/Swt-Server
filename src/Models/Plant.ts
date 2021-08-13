import { prop, getModelForClass } from '@typegoose/typegoose';

class Plant {
	@prop({ type: String, required: true })
	public name!: string;

	@prop({ type: Number, required: true })
	public cycle!: number;

	@prop({ type: String, required: true })
	public last!: string;

}

export const PlantModel = getModelForClass(Plant);