import express from 'express';
import { AuthController } from '../../components/Authentication/authentication.controller';
import { Middleware } from '../../middlewares/middleware';
import passport from 'passport';

const router = express.Router();

router.post('/login', [
    Middleware.isPasswordAndUserMatch, 
    AuthController.login]
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', [
    passport.authenticate('google'), 
    AuthController.oauth_login
]);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email']}));

router.get('/facebook/callback', [
    passport.authenticate('facebook'),
    AuthController.oauth_login
]);

export { router as AuthRoute };
