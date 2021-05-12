import { Observable } from "rxjs";
import { IUser } from "./user.model";

export interface IUserController {
    create(userData: IUser): Observable<any>;
    get(userId: string): Observable<IUser>;
    getAll(pageIndex: number, pageSize: number): Observable<IUserList>;
    countEmail(email: string): Observable<Number>;
    countUsername(username: string): Observable<Number>;
}

interface IUserList {
    data: [IUser],
    pageIndex: number,
    pageSize: number,
    total: number
}