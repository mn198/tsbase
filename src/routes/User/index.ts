import express from 'express';
import { Middleware } from '../../middlewares/middleware';
import * as UserController from './user';

const router = express.Router();

router.post('', [
    Middleware.validateUserPayload,
    UserController.create
])

router.get('/pageIndex/:pageIndex/pageSize/:pageSize', [
    Middleware.validateJsonWebToken,
    Middleware.validatePageIndexAndPageSize,
    UserController.getAll
])

router.get('/:id', [
    Middleware.validateJsonWebToken,
    UserController.get
])

router.post('/check_username', [
    UserController.checkUsername
])

router.post('/check_email', [
    UserController.checkEmail
])

export { router as UserRoute };