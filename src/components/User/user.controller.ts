import { observable, Observable } from 'rxjs';
import { IUserController, IUserList } from './user';
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

    getAll(pageIndex: number, pageSize: number): Observable<IUserList> {
        return new Observable((observer: any) => {
            UserModel.aggregate([
                {
                    $sort: {
                        createdAt: -1
                    }
                }, {
                    $facet: {
                        data: [
                            {
                                $skip: (pageIndex - 1) * pageSize
                            },
                            {
                                $limit: pageSize
                            },
                            {
                                $addFields: {
                                    id: "$_id"
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    password: 0
                                }
                            }
                        ],
                        count: [
                            {
                                $count: 'totalRecord'
                            }
                        ]
                    }
                }, {
                    $unwind: {
                        path: '$count'
                    }
                }, {
                    $project: {
                        data: 1,
                        total: '$count.totalRecord',
                    }
                }
            ])
            .then((result: any) => {
                if(result.length){
                    result[0].pageIndex = pageIndex;
                    result[0].pageSize = pageSize;
                    observer.next(result[0]);
                } else {
                    var payload = {
                        data: [],
                        totalRecord: 0,
                        pageIndex,
                        pageSize
                    }
                    observer.next(payload);
                }
            })
        })
    }

    get(userId: string): Observable<IUser> {
        return new Observable((observer: any) => {
            UserModel.findById(userId)
            .then((wantedUser: IUser | null) => {
                observer.next(wantedUser);
            })
            .catch((error: any) => {
                observer.error(error);
            })
        })
    }

    countEmail(email: string): Observable<Number> {
        return new Observable((observer: any) => {
            UserModel.countDocuments({email: email})
            .then((count: any) => {
                observer.next(count);
            })
            .catch((err: any) => {
                observer.error(err);
            })
        })
    }

    countUsername(username: string): Observable<Number>{
        return new Observable((observer: any) => {
            UserModel.countDocuments({username: username})
            .then((count: any) => {
                observer.next(count);
            })
            .catch((err: any) => {
                observer.error(err);
            })
        })
    }
}

export const UserController = new User();
