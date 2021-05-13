import { Request, Response, NextFunction } from 'express';
import { PatternController } from '../../components/Pattern/pattern.controller';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import logging from '../../config/logging';

const namespace = "Pattern route handler";

const create = (request: Request, response: Response) => {
    PatternController.create(request.body).subscribe({
        next: (pattern: any) => {
            response.json(pattern);
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
    PatternController.get(request.params.id).subscribe({
        next: (pattern: any) => {
            response.json(pattern);
        },
        error: (error: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error, code: StatusCodes.BAD_REQUEST });
        }
    });
};

const remove = (request: Request, response: Response) => {
    PatternController.remove(request.params.id).subscribe({
        next: (pattern: any) => {
            response.json(pattern);
        },
        error: (error: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error, code: StatusCodes.BAD_REQUEST });
        }
    });
};

const update = (request: Request, response: Response) => {
    PatternController.update(request.params.id, request.body).subscribe({
        next: (pattern: any) => {
            response.json(pattern);
        },
        error: (error: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error, code: StatusCodes.BAD_REQUEST });
        }
    });
};

const getAll = (request: Request, response: Response) => {
    var pageIndex: any  = request.query.pageIndex;
    var pageSize: any  = request.query.pageSize;
    var search: any  = request.query.search;

    PatternController.getAll(search, +pageIndex, +pageSize).subscribe({
        next: (patterns: any) => {
            response.json(patterns);
        },
        error: (err: any) => {
            response.status(StatusCodes.BAD_REQUEST).json({ error: err, code: StatusCodes.BAD_REQUEST });
        }
    });
};

export { create, getAll, get, update, remove };
