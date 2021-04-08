import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    nickname: string,
    email: string,
    username: string,
    password: string,
    avatar: string,
    description: string
}

const User = new Schema({
    nickname: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    avatar: String,
    description: String
}, { timestamps: true, versionKey: false })

export const UserModel: Model<IUser> = model('Users', User);
