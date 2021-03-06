import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../components/User/user.controller';
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

const get = (request: Request, response: Response) => {
    UserController.get(request.params.id).subscribe({
        next: (user: any) => {
            response.json(user);
        },
        error: (error: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error, code: StatusCodes.BAD_REQUEST });
        }
    });
};

const getCurrentUser = (request: Request, response: Response) => {
    UserController.get(request.jwt.id).subscribe({
        next: (user: any) => {
            response.json(user);
        },
        error: (error: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error, code: StatusCodes.BAD_REQUEST });
        }
    });
};

const getAll = (request: Request, response: Response) => {
    var pageIndex: any  = request.query.pageIndex;
    var pageSize: any  = request.query.pageSize;

    UserController.getAll(+pageIndex, +pageSize).subscribe({
        next: (users: any) => {
            response.json(users);
        },
        error: (err: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error: err, code: StatusCodes.BAD_REQUEST });
        }
    });
};

const checkEmail = (request: Request, response: Response) => {
    UserController.countEmail(request.body.email)
    .subscribe({
        next: (count: any) => {
            response.json({count});
        },
        error: (error: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error, code: StatusCodes.BAD_REQUEST });
        }
    })
}

const checkUsername = (request: Request, response: Response) => {
    UserController.countUsername(request.body.username)
    .subscribe({
        next: (count: any) => {
            response.json({count});
        },
        error: (error: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error, code: StatusCodes.BAD_REQUEST });
        }
    })
}

export { create, getAll, get, checkEmail, checkUsername, getCurrentUser };
