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
    type: String,
    unique: true,
    required: true
  })
  email;
  
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
    default: 'noImageProfile.jpg'
  })
  image;

  @Prop({
    type: [String],
    default: []
  })
  networks;

  @Prop({
    type: String,
    required: true
  })
  password;
}
export const UserSchema = SchemaFactory.createForClass(User);
