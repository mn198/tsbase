import { IImageStat } from './photo.model';

export interface IPhoto {
    uploadPhoto(imageStat: IImageStat): Observable<IImageStat>;
    getPhotoByFilename(filename: string): Observable<string>;
}