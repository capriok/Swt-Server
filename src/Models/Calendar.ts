import { prop, getModelForClass } from '@typegoose/typegoose';
class CalenderEvent {
	@prop({ type: String, required: true })
	public name!: string;

	@prop({ type: Boolean, required: true })
	public timed!: boolean;

	@prop({ type: String, required: true })
	public date!: string;

	@prop({ type: String })
	public startTime?: string;

	@prop({ type: String })
	public endTime?: string;
}

export const CalendarEventModel = getModelForClass(CalenderEvent)