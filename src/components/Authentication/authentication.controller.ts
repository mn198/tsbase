import { Request, Response } from 'express';
import { IAuthController } from './authentication';
import crypto from 'crypto';
import config from '../../config/config';
import jwt from 'jsonwebtoken';
import messageConstants from '../../constants/messageConstants';

class Auth implements IAuthController {
    login(request: Request, response: Response) {
        try {
            var refreshId = request.body.id + config.jwt.secret;
            var salt = crypto.randomBytes(16).toString('base64');
            var hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');

            request.body.refresh_key = salt;
            var iat = Math.floor(Date.now() / 1000) - 30;
            var exp = Math.floor(Date.now() / 1000) + 60 * 60 * config.jwt.exp;

            var token = jwt.sign({ ...request.body, iat, exp }, config.jwt.secret);
            var b = Buffer.from(hash);
            var refresh_token = b.toString('base64');

            response.status(201).send({ access_token: token, refresh_token: refresh_token });
        } catch (err) {
            response.status(400).json({ error: messageConstants.INVALID_USERNAME_OR_PASSWORD });
        }
    }

    oauth_login(request: any, response: Response) {
        try {
            console.log(request.user);
            var refreshId = request.user.id + config.jwt.secret;
            var salt = crypto.randomBytes(16).toString('base64');
            var hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');

            request.user.refresh_key = salt;
            var iat = Math.floor(Date.now() / 1000) - 30;
            var exp = Math.floor(Date.now() / 1000) + 60 * 60 * config.jwt.exp;

            var token = jwt.sign(
                {
                    id: request.user.id,
                    username: request.user.username,
                    displayName: request.user.displayName,
                    picture: request.user.picture,
                    description: request.user.description,
                    email: request.user.email,
                    iat,
                    exp
                },
                config.jwt.secret
            );
            var b = Buffer.from(hash);
            var refresh_token = b.toString('base64');

            response.status(201).send({ access_token: token, refresh_token: refresh_token });
        } catch (err) {
            response.status(400).json({ error: messageConstants.INVALID_USERNAME_OR_PASSWORD });
        }
    }
}

export const AuthController = new Auth();
