interface IImage {
    filename: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    fieldname: string,
    path: string,
    size: number
}

export interface IPhoto {
    uploadPhoto(imageStat: any): Observable<Image>;
    getPhotoByFilename(filename: string): Observable<string>;
}