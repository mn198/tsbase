import { Observable } from "rxjs";
import logging from "../../config/logging";
import { FileModel } from "./file.model";
import { IFileController, IFileStat } from './file.d';
import { IOwner } from "../Subdocument/OwnerSchema";
import { IFile } from "../Subdocument/FileSchema";

const namespace = "File Controller";

class File implements IFileController {
    uploadFile(fileStat: IFile, owner: IOwner): Observable<IFileStat>{
        return new Observable((observer: any) => {
            if(fileStat){
                var newFile: IFileStat =  {
                    ...fileStat,
                    owner: owner
                }
                FileModel.create(newFile)
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