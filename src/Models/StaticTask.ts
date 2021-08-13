import { prop, getModelForClass } from '@typegoose/typegoose';

class StaticTask {
	@prop({ type: String, required: true })
	public name!: string;

	@prop({ type: String, required: true })
	public weekday!: string;

}

export const StaticTaskModel = getModelForClass(StaticTask);