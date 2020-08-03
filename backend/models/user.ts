import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    recipes: Array<string>;
    ranking: number;
    info: string;
}

const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    recipes: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    ranking: {
        type: Number,
        default: 0
    },
    info: {
        type: String,
        default: ''
    }
});

export default mongoose.model<IUser>('User', UserSchema);
