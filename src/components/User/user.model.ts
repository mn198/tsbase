import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    email: string;
    username: string;
    password: string;
    picture: string;
    description: string;
    googleId: string;
    photos: { value: string }[],
    role: string,
}

const User = new Schema(
    {
        displayName: { type: String, default: ''},
        name: {
            familyName: String,
            givenName: String
        },
        email: { type: String, unique: true },
        username: { type: String, minlength: 6, maxlength: 32 },
        password: { type: String },
        picture: { type: String, default: '' },
        description: { type: String, default: '' },
        googleId: String,
        facebookId: String,
        twitterId: String,
        photos: [
            {
                value: { type: String }
            }
        ],
        role: {
            type: String,
            enum: ['admin', 'pro', 'basic'],
            default: 'basic'
        }
    },
    { timestamps: true, versionKey: false }
);

User.set('toJSON', {
    virtuals: true,
    transform: (doc: any, converted: any) => {
        delete converted._id;
    }
});

export const UserModel: Model<IUser> = model('Users', User);
