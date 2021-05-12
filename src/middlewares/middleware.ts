import e, { NextFunction, Request, Response } from 'express';
import { IUser, UserModel } from '../components/User/user.model';
import messageConstants from '../constants/messageConstants';
import { IMiddleware } from './middleware.d';
import crypto from 'crypto';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { Utils } from '../components/Utils/utils';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserController } from '../components/User/user.controller';
import { zip } from 'rxjs';

class MiddlewareClass implements IMiddleware {
    isPasswordAndUserMatch(request: Request, response: Response, next: NextFunction) {
        UserModel.findOne({ username: request.body.username }).then((wantedUser: IUser | null) => {
            if (!wantedUser) {
                response.status(StatusCodes.BAD_REQUEST).json({ error: messageConstants.INVALID_USERNAME_OR_PASSWORD, code: StatusCodes.BAD_REQUEST });
            } else {
                var passwordFields = wantedUser.password.split('$');
                var salt = passwordFields[0];
                var hash = crypto.createHmac('sha512', salt).update(request.body.password).digest('base64');
                if (hash === passwordFields[1]) {
                    request.body = {
                        id: wantedUser.id,
                        displayName:  wantedUser.displayName,
                        username: wantedUser.username,
                        email: wantedUser.email,
                        picture: wantedUser.picture,
                        description: wantedUser.description
                    };
                    return next();
                } else {
                    response.status(StatusCodes.BAD_REQUEST).json({ error: messageConstants.INVALID_USERNAME_OR_PASSWORD, code: StatusCodes.BAD_REQUEST });
                }
            }
        });
    }

    validateJsonWebToken(request: Request | any, response: Response, next: NextFunction) {
        if (request.headers['authorization']) {
            try {
                let authorization = request.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return response.status(StatusCodes.UNAUTHORIZED).json({ error: ReasonPhrases.UNAUTHORIZED, code: StatusCodes.UNAUTHORIZED });
                } else {
                    request.jwt = jwt.verify(authorization[1], config.jwt.secret);
                    return next();
                }
            } catch (err) {
                return response.status(StatusCodes.FORBIDDEN).json({ error: ReasonPhrases.FORBIDDEN, code: StatusCodes.FORBIDDEN });
            }
        } else {
            return response.status(StatusCodes.UNAUTHORIZED).json({ error: ReasonPhrases.UNAUTHORIZED, code: StatusCodes.UNAUTHORIZED });
        }
    }

    validateUserPayload(request: Request, response: Response, next: NextFunction) {
        
        var user: IUser = request.body;
        var valid = 1;
        var errors: any = [];
        
        var countEmail = UserController.countEmail(user.email);
        var countUsername = UserController.countUsername(user.username);
        
        zip(countEmail, countUsername)
        .subscribe({
            next: (results: any) => {
                if(results[0] > 0){
                    errors.push(messageConstants.DUPLICATED_EMAIL);
                    valid = 0;
                }
                if(results[1] > 0){
                    errors.push(messageConstants.DUPLICATED_USERNAME);
                    valid = 0;
                }

                if (!validator.isLength(user.username, { min: 6, max: 32 })) {
                    valid = 0;
                    errors.push(messageConstants.INVALID_USERNAME_LENGTH);
                }
                
                if (!validator.isLength(user.password, { min: 6, max: 32 })) {
                    valid = 0;
                    errors.push(messageConstants.INVALID_PASSWORD_LENGTH);
                }
        
                if (!validator.isEmail(user.email)) {
                    valid = 0;
                    errors.push(messageConstants.INVALID_EMAIL);
                }
                
                if (valid) {
                    next();
                } else {
                    response.status(StatusCodes.BAD_REQUEST).json({ errors, code: StatusCodes.BAD_REQUEST });
                }
            }
        })
    }

    validatePageIndexAndPageSize(request: Request, response: Response, next: NextFunction) {
        var pageIndex = Utils.mustBePositiveInteger(request.params.pageIndex, 1);
        var pageSize = Utils.mustBePositiveInteger(request.params.pageSize, 30);
        request.params.pageIndex = pageIndex;
        request.params.pageSize = pageSize;
        next();
    }
}

export const Middleware = new MiddlewareClass();
