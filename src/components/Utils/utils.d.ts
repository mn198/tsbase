export interface IUtils {
    mustBePositiveInteger(origin: any, defaultNumber?: number): number;
    slugify(pattern: string): string;
    createCSVFilename(prefix: string): string;
    elapsedTime(start: number): string;
    startOfDay(date: any): string;
    endOfDay(date: any): string;
    uploadImage
}