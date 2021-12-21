import { prop, getModelForClass } from '@typegoose/typegoose';

class CrimasMessage {
	@prop({ type: String, required: true })
	public message!: string;
}

export const CrimasMessageModel = getModelForClass(CrimasMessage);