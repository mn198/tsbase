import { Observable } from 'rxjs';
import { IUserController } from './user';
import { IUser, UserModel } from './user.model';
import crypto from 'crypto';

class User implements IUserController {
    create(user: IUser): Observable<any> {
        return new Observable((observer: any) => {
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(user.password).digest('base64');
            user.password = salt + '$' + hash;
            UserModel.create(user)
                .then((newUser: IUser) => {
                    observer.next(newUser);
                })
                .catch((err) => {
                    observer.error(err);
                });
        });
    }
}

export const UserController = new User();
