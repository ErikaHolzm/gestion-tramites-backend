import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReminderDocument = Reminder & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Reminder {
  @Prop({ required: true })
  nombre!: string;

  @Prop({ required: true })
  descripcion!: string;

  @Prop({ required: true, type: Date })
  fechaVencimiento!: Date;

  @Prop({ required: true })
  categoria!: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user!: Types.ObjectId;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);

ReminderSchema.virtual('status').get(function () {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaVencimiento = new Date(this.fechaVencimiento);
  fechaVencimiento.setHours(0, 0, 0, 0);
  const diffTime = fechaVencimiento.getTime() - hoy.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return 'vencido';
  } else if (diffDays <= 3) {
    return 'próximo';
  } else {
    return 'vigente';
  }
});
