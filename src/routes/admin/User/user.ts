import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../../components/User/user.controller';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const create = (request: Request, response: Response) => {
    UserController.create(request.body).subscribe({
        next: (user: any) => {
            response.json(user);
        },
        error: (error: any) => {
            if (error.name === 'MongoError' && error.code === 11000) {
                response.status(StatusCodes.BAD_REQUEST).json({ error: 'duplicated key error', code: StatusCodes.BAD_REQUEST });
            } else {
                response.status(StatusCodes.BAD_REQUEST).json({ error, code: StatusCodes.BAD_REQUEST });
            }
        }
    });
};

const getOne = (request: Request, response: Response) => {
    UserController.getOneUser(request.params.id).subscribe({
        next: (user: any) => {
            response.json(user);
        },
        error: (error: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error, code: StatusCodes.BAD_REQUEST });
        }
    });
};

const getAll = (request: Request, response: Response) => {
    UserController.getAllUsers(+request.params.pageIndex, +request.params.pageSize).subscribe({
        next: (users: any) => {
            response.json(users);
        },
        error: (err: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error: err, code: StatusCodes.BAD_REQUEST });
        }
    });
};

export { create, getAll, getOne };
