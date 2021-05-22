import { Request, Response, NextFunction } from 'express';
import { PhotoController } from '../../components/Photo/photo.controller';
import fs from 'fs';
import { IFile } from '../../components/Subdocument/FileSchema';
import { IOwner } from '../../components/Subdocument/OwnerSchema';

const uploadPhoto = (request: Request, response: Response) => {
    var stat: IFile = request.file; 
    var owner: IOwner = {
        userId: request.jwt.id,
        username: request.jwt.username,
        displayName: request.jwt.displayName,
        role: request.jwt.role,
    }
    PhotoController.uploadPhoto(stat, owner)
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