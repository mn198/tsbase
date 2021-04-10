import { Observable } from "rxjs";
import { IUser } from "./user.model";

export interface IUserController {
    create(userData: IUser): Observable<any>;
    getOneUser(userId: string): Observable<IUser>;
    getAllUsers(pageIndex: number, pageSize: number): Observable<IUserList>;
}

interface IUserList {
    data: [IUser],
    pageIndex: number,
    pageSize: number,
    total: number
}