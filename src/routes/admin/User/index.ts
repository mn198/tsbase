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

router.get('/users/:id', [
    Middleware.validateJsonWebToken,
    UserController.getOne
])

router.post('/users/check_username', [
    UserController.checkUsername
])

router.post('/users/check_email', [
    UserController.checkEmail
])

export { router as UserRoute };