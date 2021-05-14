import { Observable, Observer } from 'rxjs';
import { MongoSearchParser } from '../MongoSearch';
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
            PatternModel.updateOne({ _id: patternId }, { set: patternData })
                .then((updatedPattern: IPattern | null) => {
                    observer.next(updatedPattern);
                })
                .catch((error: any) => {
                    observer.error(error);
                });
        });
    }

    remove(patternId: string): Observable<IPattern> {
        return new Observable((observer: Observer<any>) => {
            PatternModel.remove({_id: patternId})
            .then((removedPattern: IPattern | null) => {
                observer.next(removedPattern);
            })
            .catch((error: any) => {
                observer.error(error);
            });
        });
    }

    getAll(search: string, pageIndex: number, pageSize: number): Observable<IPagingPattern> {
        return new Observable((observer: Observer<any>) => {
            PatternModel.aggregate([
                {
                    $match: {
                        name: { $regex: search, $options: 'i'}
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $addFields: {
                        id: "$_id"
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                },
                {
                    $facet: {
                        data: [{ $skip: (pageIndex - 1) * pageSize }, { $limit: pageSize }],
                        count: [{ $count: 'totalRecord' }]
                    }
                },
                {
                    $unwind: {
                        path: '$count'
                    }
                },
                {
                    $project: {
                        data: 1,
                        total: '$count.totalRecord'
                    }
                }
            ]).then((patterns: any) => {
                if (patterns && patterns.length) {
                    patterns[0].pageIndex = pageIndex;
                    patterns[0].pageSize = pageSize;
                    patterns[0].sort = {
                        orderBy: 'createdAt',
                        direction: 'des'
                    }
                    observer.next(patterns[0]);
                } else {
                    var payload = {
                        data: [],
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        sort: {
                            orderBy: 'createdAt',
                            direction: 'des'
                        },
                        total: 0
                    };
                    observer.next(payload);
                }
            });
        });
    }
    getAllByOwner(search: string, pageIndex: number, pageSize: number, owner: string): Observable<IPagingPattern> {
        return new Observable((observer: Observer<any>) => {
            PatternModel.aggregate([
                {
                    $match: {
                        name: { $regex: search, $options: 'i'},
                        owner: owner
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $addFields: {
                        id: "$_id"
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                },
                {
                    $facet: {
                        data: [{ $skip: (pageIndex - 1) * pageSize }, { $limit: pageSize }],
                        count: [{ $count: 'totalRecord' }]
                    }
                },
                {
                    $unwind: {
                        path: '$count'
                    }
                },
                {
                    $project: {
                        data: 1,
                        total: '$count.totalRecord'
                    }
                }
            ]).then((patterns: any) => {
                if (patterns && patterns.length) {
                    patterns[0].pageIndex = pageIndex;
                    patterns[0].pageSize = pageSize;
                    patterns[0].sort = {
                        orderBy: 'createdAt',
                        direction: 'des'
                    }
                    observer.next(patterns[0]);
                } else {
                    var payload = {
                        data: [],
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        sort: {
                            orderBy: 'createdAt',
                            direction: 'des'
                        },
                        total: 0
                    };
                    observer.next(payload);
                }
            });
        });
    }
}

export const PatternController = new Pattern();
