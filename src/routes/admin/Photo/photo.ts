import { Request, Response, NextFunction } from 'express';
import { PhotoController } from '../../../components/Photo/photo.controller';
import fs from 'fs';

const uploadPhoto = (request: Request, response: Response) => {
    var stat: any = request.file; 
    PhotoController.uploadPhoto(stat)
    .subscribe({
        next: (imageStat: any) => {
            response.json(imageStat);
        },
        error: (err: any) => {
            response.json(err);
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
    readPhoto,
}