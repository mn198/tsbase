import { Observable } from "rxjs";
import logging from "../../config/logging";
import { IFileStat, FileModel } from "./file.model";
import { IFileController } from './file.d';

const namespace = "File Controller";

class File implements IFileController {
    uploadFile(fileStat: IFileStat): Observable<IFileStat>{
        return new Observable((observer: any) => {
            if(fileStat){
                FileModel.create(fileStat)
                .then((stat: any) => {
                    observer.next(stat);
                })
                .catch((err) => {
                    observer.error(err);
                })
            } else {
                observer.error({error: 'can\'t recieve file'});
            }
        })
    }

    getFileByFilename(filename: string): Observable<string> {
        return new Observable((observer: any) => {
            FileModel.find({ filename: filename })
            .then((wantedFile: any) => {
                observer.next(wantedFile);
            })

        })
    }
}
 
export const FileController = new File();