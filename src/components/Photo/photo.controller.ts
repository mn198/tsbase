import { Observable } from "rxjs";
import logging from "../../config/logging";
import { IImageStat, PhotoModel } from "./photo.model";
import { IPhoto } from './photo.d';

const namespace = "Photo Controller";

class Photo implements IPhoto {
    uploadPhoto(imageStat: IImageStat): Observable<IImageStat>{
        return new Observable((observer: any) => {
            if(imageStat){
                PhotoModel.create(imageStat)
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