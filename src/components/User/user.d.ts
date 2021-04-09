import { Observable } from "rxjs";
import { IUser } from "./user.model";

export interface IUserController {
    create(userData: IUser): Observable<any>;
    getAllUsers(pageIndex: number, pageSize: number): Observable<any>;
}