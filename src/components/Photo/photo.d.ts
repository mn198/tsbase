import { IFile } from "../Subdocument/FileSchema";
import { IOwner } from "../Subdocument/OwnerSchema";

export interface IPhotoController {
    uploadPhoto(fileStat: IFile, owner: IOwner): Observable<IImageStat>;
    getPhotoByFilename(filename: string): Observable<string>;
}

export interface IImageStat {
    filename: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    fieldname: string,
    path: string,
    size: number,
    owner: {
        userId: string,
        username: string,
        role: string,
        displayName: string
    }
}