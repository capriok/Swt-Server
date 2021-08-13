import { prop, getModelForClass } from '@typegoose/typegoose';

class Task {
	@prop({ type: String, required: true })
	public name!: string;

	@prop({ type: Boolean, required: true })
	public pinned!: boolean;

}

export const TaskModel = getModelForClass(Task);