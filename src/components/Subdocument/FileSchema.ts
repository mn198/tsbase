import { Schema } from 'mongoose';

export interface IFile {
    filename: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    fieldname: string,
    path: string,
    size: number
}

export const FileSchema = new Schema({
    filename: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    fieldname: String,
    path: String,
    size: Number
}, { id: false, _id: false })