import express from 'express';
import { Middleware } from '../../../middlewares/middleware';
import * as UserController from './user';

const router = express.Router();

router.post('/users', [
    Middleware.validateUserPayload,
    UserController.create
])

export { router as UserRoute };