import { IFileStat } from './file.model';

export interface IFileController {
    uploadFile(fileStat: IFileStat): Observable<IFileStat>;
    getFileByFilename(filename: string): Observable<string>;
}