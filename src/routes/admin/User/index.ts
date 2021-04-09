import express from 'express';
import { Middleware } from '../../../middlewares/middleware';
import * as UserController from './user';

const router = express.Router();

router.post('/users', [
    Middleware.validateUserPayload,
    UserController.create
])

router.get('/users/pageIndex/:pageIndex/pageSize/:pageSize', [
    Middleware.validateJsonWebToken,
    Middleware.validatePageIndexAndPageSize,
    UserController.getAll
])

export { router as UserRoute };