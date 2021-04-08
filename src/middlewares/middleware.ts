import { NextFunction, Request, Response } from 'express';
import { IUser, UserModel } from '../components/User/user.model';
import messageConstants from '../constants/messageConstants';
import { IMiddleware } from './middleware.d';
import crypto from 'crypto';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import validator from 'validator';

class MiddlewareClass implements IMiddleware {
    isPasswordAndUserMatch(request: Request, response: Response, next: NextFunction) {
        UserModel.findOne({ username: request.body.username }).then((wantedUser: IUser | null) => {
            if (!wantedUser) {
                response.status(400).json({ error: messageConstants.INVALID_USERNAME_OR_PASSWORD });
            } else {
                var passwordFields = wantedUser.password.split('$');
                var salt = passwordFields[0];
                var hash = crypto.createHmac('sha512', salt).update(request.body.password).digest('base64');
                if (hash === passwordFields[1]) {
                    request.body = {
                        uid: wantedUser._id,
                        name: wantedUser.username,
                        email: wantedUser.email,
                        nickname: wantedUser.nickname,
                        avatar: wantedUser.avatar,
                        description: wantedUser.description
                    };
                    return next();
                } else {
                    response.status(400).json({ error: messageConstants.INVALID_USERNAME_OR_PASSWORD });
                }
            }
        });
    }

    validateJsonWebToken(request: Request | any, response: Response, next: NextFunction){
        if(request.headers['authorization']){
            try {
                let authorization = request.headers['authorization'].split(' ');
                if(authorization[0] !== 'Bearer'){
                    return response.status(401).json({error: messageConstants.UNAUTHORIZED})
                } else {
                    request.jwt = jwt.verify(authorization[1], config.jwt.secret);
                    return next();
                }
            } catch(err){
                return response.status(403).json({error: messageConstants.FORBIDDEN})
            }
        } else {
            return response.status(401).json({error: messageConstants.UNAUTHORIZED})
        }
    }

    validateUserPayload(request: Request , response: Response, next: NextFunction){
        var user: IUser = request.body;
        var valid = 1;

        if(!validator.isLength(user.username, { min: 6, max: 32})){
            valid = 0;
            response.status(400).json({error: messageConstants.INVALID_USERNAME_LENGTH});
        }
        
        if(!validator.isLength(user.password, { min: 6, max: 32})){
            valid = 0;
            response.status(400).json({error: messageConstants.INVALID_PASSWORD_LENGTH});
        }
        
        if(!validator.isEmail(user.email)){
            valid = 0;
            response.status(400).json({error: messageConstants.INVALID_EMAIL});
            
        }

        if(valid){
            next();
        }
    }
}

export const Middleware = new MiddlewareClass();
