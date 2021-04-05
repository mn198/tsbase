import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export const PhotoModel = mongoose.model('Photos', Photo);