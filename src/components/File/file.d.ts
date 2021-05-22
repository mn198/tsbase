import { IFile } from "../Subdocument/FileSchema";

export interface IFileController {
    uploadFile(fileStat: IFile, owner: IOwner): Observable<IFileStat>;
    getFileByFilename(filename: string): Observable<string>;
}

export interface IFileStat {
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