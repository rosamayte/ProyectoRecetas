import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
    name: string;
    description: string;
    ingredients: Array<{ quantity: number, name: string }>;
    steps: string;
    picture: string;
    votes: number;
    owner: string;
    date: Date;
}

const RecipeSchema: Schema<IRecipe> = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [{ quantity: Number, name: String }],
        required: true
    },
    steps: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: 'noImage.jpg'
    },
    votes: {
        type: Number,
        default: 0
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { typePojoToMixed: false });

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);
