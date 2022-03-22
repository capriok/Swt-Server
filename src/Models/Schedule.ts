import { prop, getModelForClass } from '@typegoose/typegoose'

class ScheduleConfig {
  @prop({ type: String, required: true })
  public lastFoodDay!: string

  @prop({ type: String, required: true })
  public lastWasteDay!: string

  @prop({ type: String, required: true })
  public lastFloorDay!: string

  @prop({ type: String, required: true })
  public mayoPayday!: string

  @prop({ type: String, required: true })
  public ingallsPayday!: string
}

export const ScheduleModel = getModelForClass(ScheduleConfig)
