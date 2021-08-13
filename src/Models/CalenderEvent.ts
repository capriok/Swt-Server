import { prop, getModelForClass } from '@typegoose/typegoose';

class CalenderEvent {
	@prop({ type: String, required: true })
	public name!: string;

	@prop({ type: String, required: true })
	public date!: string;

	@prop({ type: Boolean, required: true })
	public timed!: boolean;
}

export const CalenderEventModel = getModelForClass(CalenderEvent);