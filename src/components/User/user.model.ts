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
    username: { type: String, unique: true, minlength: 6, maxlength: 32 },
    password: { type: String},
    avatar: { type: String, default: ''},
    description: { type: String, default: ''}
}, { timestamps: true, versionKey: false })

export const UserModel: Model<IUser> = model('Users', User);
