import { Observable } from "rxjs";
import { IPattern } from "./pattern.model";

export interface IPatternController {
    create(patternData: IPattern): Observable<IPattern>;
    get(patternId: string): Observable<IPattern>;
    update(patternId: string, patternData): Observable<IPattern>;
    remove(peatternId: string): Observable<any>;
    getAll(search: string, pageIndex: number, pageSize: number): Observable<IPagingPattern>;
    getAllByOwner(search: string, pageIndex: number, pageSize: number, owner: string): Observable<IPagingPattern>;
}

interface IPagingPattern {
    data: [IPattern],
    pageIndex: number,
    pageSize: number,
    total: number
}