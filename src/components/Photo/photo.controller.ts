import { Observable } from "rxjs";
import logging from "../../config/logging";
import { PhotoModel } from "./photo.model";
import { IPhotoController, IImageStat } from './photo.d';
import { IFile } from "../Subdocument/FileSchema";
import { IOwner } from "../Subdocument/OwnerSchema";

const namespace = "Photo Controller";

class Photo implements IPhotoController {
    uploadPhoto(fileStat: IFile, owner: IOwner): Observable<IImageStat>{
        return new Observable((observer: any) => {
            if(fileStat){
                var newImage: IImageStat = {
                    ...fileStat,
                    owner
                }
                PhotoModel.create(newImage)
                .then((stat: any) => {
                    observer.next(stat);
                })
                .catch((err) => {
                    observer.error(err);
                })
            } else {
                observer.error({error: 'not a png/jpeg file'});
            }
        })
    }

    getPhotoByFilename(filename: string): Observable<string> {
        return new Observable((observer: any) => {
            PhotoModel.find({ filename: filename })
            .then((wantedPhoto: any) => {
                observer.next(wantedPhoto);
            })

        })
    }
}
 
export const PhotoController = new Photo();