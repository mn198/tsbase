import { model, Schema, Model, Document } from 'mongoose';
import { OwnerSchema } from '../Subdocument/OwnerSchema';

interface IFileStat extends Document {
    filename: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    fieldname: string,
    path: string,
    size: number,
    owner: {
        userId: string,
        username: string,
        role: string,
        displayName: string
    }
}

const File = new Schema({
    filename: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    fieldname: String,
    path: String,
    size: Number,
    owner: OwnerSchema
}, { timestamps: true, versionKey: false })

export const FileModel: Model<IFileStat> = model('Files', File); 