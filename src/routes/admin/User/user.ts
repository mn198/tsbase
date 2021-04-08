import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../../components/User/user.controller';

const create = (request: Request, response: Response) => {
    UserController.create(request.body)
    .subscribe({
        next: (user: any) => {
            response.json(user);
        },
        error: (err: any) => {
            response.json(err);
        }
    })
}

export {
    create
}