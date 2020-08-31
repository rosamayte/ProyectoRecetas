import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Recipe extends Document {

  @Prop({
    type: String,
    required: true
  })
  name;

  @Prop({
    type: String,
    required: true
  })
  description;

  @Prop({
    type: [{ quantity: Number, name: String }],
    required: true
  })
  ingredients;

  @Prop({
    type: String,
    required: true
  })
  steps;

  @Prop({
    type: String,
    default: 'noImage.jpg'
  })
  picture;

  @Prop({
    type: [Number],
    default: [0, 0]
  })
  votes;

  @Prop({
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true
  })
  owner;

  @Prop({
    type: Date,
    default: Date.now()
  })
  date;
}
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
