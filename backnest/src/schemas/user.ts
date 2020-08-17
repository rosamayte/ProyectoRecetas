import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    required: true
  })
  name;
  @Prop({
    // type: [mongoose.Schema.Types.ObjectId],
    type: [String],
    default: []
  })
  recipes;
  @Prop({
    type: Number,
    default: 0
  })
  ranking;
  @Prop({
    type: String,
    default: ""
  })
  info;
  @Prop({
    type: String,
    required:true
  })
  password;
}
export const UserSchema = SchemaFactory.createForClass(User);
