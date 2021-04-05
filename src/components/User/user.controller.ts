import { Observable } from "rxjs";
import { IUserController } from "./user";
import { IUser, UserModel } from "./user.model";

class UserClass implements IUserController {
    create(user: IUser): Observable<any> {
        return new Observable((observer: any) => {
            UserModel.create(user)
            .then((newUser: IUser) => {
                observer.next(newUser);
            })
            .catch((err) => {
                observer.error(err);
            })
        })
    }
}

export const UserController = new UserClass();