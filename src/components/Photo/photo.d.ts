import { IImageStat } from './photo.model';

export interface IPhotoController {
    uploadPhoto(imageStat: IImageStat): Observable<IImageStat>;
    getPhotoByFilename(filename: string): Observable<string>;
}