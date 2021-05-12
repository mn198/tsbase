import { Observable, Observer } from 'rxjs';
import { IPagingPattern, IPatternController } from './pattern';
import { IPattern, PatternModel } from './pattern.model';

class Pattern implements IPatternController {
    create(patternData: IPattern): Observable<IPattern> {
        return new Observable((observer: Observer<any>) => {
            PatternModel.create(patternData)
                .then((newPattern: IPattern | null) => {
                    observer.next(newPattern);
                })
                .catch((error: any) => {
                    observer.error(error);
                });
        });
    }

    get(patternId: string): Observable<IPattern> {
        return new Observable((observer: Observer<any>) => {
            PatternModel.findById(patternId)
                .then((wantedPattern: IPattern | null) => {
                    observer.next(wantedPattern);
                })
                .catch((error: any) => {
                    observer.error(error);
                });
        });
    }

    update(patternId: string, patternData: IPattern): Observable<IPattern> {
        return new Observable((observer: Observer<any>) => {
            PatternModel.update({ id: patternId }, { set: patternData })
                .then((updatedPattern: IPattern | null) => {
                    observer.next(updatedPattern);
                })
                .catch((error: any) => {
                    observer.error(error);
                });
        });
    }

    delete(patternId: string): Observable<IPattern> {
        return new Observable((observer: Observer<any>) => {
            PatternModel.remove({id: patternId})
            .then((deletedPattern: IPattern | null) => {
                observer.next(deletedPattern);
            })
            .catch((error: any) => {
                observer.error(error);
            });
        });
    }

    getAll(pageIndex: number, pageSize: number): Observable<IPagingPattern> {
        return new Observable((observer: Observer<any>) => {
            
        });
    }
}
