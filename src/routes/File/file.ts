import { Request, Response, NextFunction } from 'express';
import { FileController } from '../../components/File/file.controller';
import fs from 'fs';

const uploadFile = (request: Request, response: Response) => {
    var stat: any = request.file; 
    FileController.uploadFile(stat)
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