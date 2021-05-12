import { model, Schema, Model, Document } from 'mongoose';

export interface IPattern extends Document {
    name: string
}

const Pattern = new Schema(
    {
        name: String
    },
    { timestamps: true, versionKey: false }
);

Pattern.set('toJSON', {
    virtuals: true,
    transform: (doc: any, converted: any) => {
        delete converted._id;
    }
});

export const PatternModel: Model<IPattern> = model('Patterns', Pattern);
