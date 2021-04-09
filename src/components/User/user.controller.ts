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

    getAllUsers(pageIndex: number, pageSize: number): Observable<any> {
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
}

export const UserController = new User();
