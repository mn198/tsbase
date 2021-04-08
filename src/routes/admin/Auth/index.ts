import express from 'express';
import { AuthController } from '../../../components/Auth/auth.controller';
import { Middleware } from '../../../middlewares/middleware';

const router = express.Router();

router.post('/login', [Middleware.isPasswordAndUserMatch, AuthController.login]);

export { router as AuthRoute };