import { Request, Response, NextFunction } from 'express';
import { PhotoController } from '../../../components/Photo/photo.controller';
import fs from 'fs';

const uploadPhoto = (request: Request, response: Response) => {
    console.log(request.file)
    PhotoController.uploadPhoto(request.file)
    .subscribe({
        next: (imageStat: any) => {
            response.json(imageStat);
        },
        error: (err: any) => {
            response.json(err);
        }
    })
}

const middlewareStorePhoto = (request: Request, response: Response, next: NextFunction) => {
    PhotoController.uploadPhoto(request.file)
    .subscribe({
        next: (_: any) => {
            next();
        },
        error: (_: any) => {
            next()
        }
    })
}

const readPhoto = (request: Request, response: Response) => {
    try {
        if(fs.existsSync('./uploads/' + request.params.filename)){
            response.sendFile(request.params.filename, { root: './uploads'})
        } else {
            response.sendFile('no-image.png', { root: './uploads'})
        }
    } catch(err: any) {
        response.sendFile('no-image.png', { root: './uploads'})
    }

}

export {
    uploadPhoto,
    middlewareStorePhoto,
    readPhoto
}