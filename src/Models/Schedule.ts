import { prop, getModelForClass } from '@typegoose/typegoose'

class ScheduleConfig {
  @prop({ type: String, required: true })
  public lastFoodDay!: string

  @prop({ type: String, required: true })
  public lastWasteDay!: string
<<<<<<< HEAD

  @prop({ type: String, required: true })
  public lastFloorDay!: string
=======

  @prop({ type: String, required: true })
  public lastFloorDay!: string

  @prop({ type: String, required: true })
  public mayoPayday!: string

  @prop({ type: String, required: true })
  public ingallsPayday!: string
>>>>>>> 2a6f5cf289fc1c22bcf2feb45baaa2a21159795e
}

export const ScheduleModel = getModelForClass(ScheduleConfig)
