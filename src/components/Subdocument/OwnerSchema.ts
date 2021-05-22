import { Schema } from 'mongoose';

export interface IOwner {
    userId: string,
    username: string
    displayName: string,
    role: string
}

export const OwnerSchema = new Schema({
    userId: String,
    username: String,
    role: String,
    displayName: String
}, {id: false, _id: false});
