import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { FileController } from '../../components/File/file.controller';
import { IOwner } from '../../components/Subdocument/OwnerSchema';
import { IFile } from '../../components/Subdocument/FileSchema';

const uploadFile = (request: Request, response: Response) => {
    var stat: IFile = request.file; 
    var owner: IOwner = {
        userId: request.jwt.id,
        username: request.jwt.username,
        displayName: request.jwt.displayName,
        role: request.jwt.role,
    }
    FileController.uploadFile(stat, owner)
    .subscribe({
        next: (imageStat: any) => {
            response.json(imageStat);
        },
        error: (err: any) => {
            response.json(err);
        }
    })
}


const readFile = (request: Request, response: Response) => {
    try {
        if(fs.existsSync('./uploads/' + request.params.filename)){
            response.sendFile(request.params.filename, { root: './uploads'})
        } else {
            response.status(404).json({error: 'file not found'});
        }
    } catch(err: any) {
        response.status(404).json({error: 'file not found'});
    }

}



export {
    uploadFile,
    readFile,
}