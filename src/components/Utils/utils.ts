import { IUtils } from './utils.d';
import multer from 'multer';

class UtilsClass implements IUtils {
    toAscii(word: string) {
        word = word.toLowerCase();
        word = word.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        word = word.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        word = word.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        word = word.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        word = word.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        word = word.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        word = word.replace(/đ/g, 'd');
        word = word.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
        word = word.replace(/ + /g, ' ');
        word = word.trim();
        return word;
    }

    slugify(pattern: string): string {
        let slug = this.toAscii(pattern);
        slug = slug
            .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-');
        return slug;
    }

    mustBePositiveInteger(origin: any, defaultNumber: number) {
        if (!isNaN(origin) && +origin > 0) {
            return origin;
        }
        if (defaultNumber != null) {
            return defaultNumber;
        }
        return 1;
    }

    createCSVFilename(prefix: string): string {
        let filename = prefix + '-' + new Date().getTime() + '-' + new Date().toLocaleDateString().split('/').join('_') + '.xlsx';
        return filename;
    }

    elapsedTime(start: number): string {
        const elapsed = (new Date().getTime() - start) / 1000;

        if (elapsed >= 0) {
            let diff: any = {};

            diff.days = Math.floor(elapsed / 86400);
            diff.hours = Math.floor((elapsed / 3600) % 24);
            diff.minutes = Math.floor((elapsed / 60) % 60);
            diff.seconds = Math.floor(elapsed % 60);

            let message = `${diff.days}d ${diff.hours}h ${diff.minutes}m ${diff.seconds}s.`;
            message = message.replace(/(?:0. )+/, '');
            return message;
        }
        return '';
    }

    startOfDay(date: any): string {
        const t = new Date(date);
        const y = t.getFullYear();
        const m = ('0' + (t.getMonth() + 1)).slice(-2);
        const d = ('0' + t.getDate()).slice(-2);
        const result = y + '-' + m + '-' + d + 'T00:00:00.001';
        return result;
    }

    endOfDay(date: any): string {
        const t = new Date(date);
        const y = t.getFullYear();
        const m = ('0' + (t.getMonth() + 1)).slice(-2);
        const d = ('0' + t.getDate()).slice(-2);
        const result = y + '-' + m + '-' + d + 'T23:59:59.999';
        return result;
    }

    storage = multer.diskStorage({
        destination: function (request: any, file: any, cb: any) {
            cb(null, './uploads');
        },
        filename: function (request: any, file: any, cb: any) {
            cb(null, new Date().getTime() + '_' + file.originalname);
        }
    })

    fileFilter = (request: any, file: any, cb: any) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

    uploadImage = multer({
        storage: this.storage,
        // limits: {
        //     fileSize: 1024 * 1024 * 5
        // },
        fileFilter: this.fileFilter
    })
}

export const Utils = new UtilsClass();
