import { model, Schema, Model, Document } from 'mongoose';

export interface IImageStat extends Document {
    filename: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    fieldname: string,
    path: string,
    size: number
}
const Photo = new Schema({
    filename: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    fieldname: String,
    path: String,
    size: Number
}, { timestamps: true, versionKey: false })

export const PhotoModel: Model<IImageStat> = model('Photos', Photo); 