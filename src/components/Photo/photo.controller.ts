import { Observable } from "rxjs";
import logging from "../../config/logging";
import { PhotoModel } from "./photo.model";
import { IPhoto, IImage } from './photo.d';

const namespace = "Photo Controller";

class Photo implements IPhoto {
    uploadPhoto(imageStat: any): Observable<IImage>{
        return new Observable((observer: any) => {
            if(imageStat){
                PhotoModel.create(imageStat)
                .then((_: any) => {
                    observer.next(imageStat);
                })
            } else {
                observer.next(null);
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