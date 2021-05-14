import express from 'express';
import { Middleware } from '../../middlewares/middleware';
import * as UserController from './user';

const router = express.Router();

// create new user
router.post('/users', [
    Middleware.validateUserPayload,
    UserController.create
])

// Get paging users
router.get('/users/', [
    Middleware.validateJsonWebToken,
    Middleware.grantAccess('readAny', 'user'),
    Middleware.validatePageIndexAndPageSize,
    UserController.getAll
])

// Get current logged in user
router.get('/users/me', [
    Middleware.validateJsonWebToken,
    Middleware.grantAccess('readOwn', 'user'),
    UserController.getCurrentUser
])

// Get any user
router.get('/users/:id', [
    Middleware.validateJsonWebToken,
    Middleware.grantAccess('readAny', 'user'),
    UserController.get
])

// Check if username exists
router.post('/users/check_username', [
    UserController.checkUsername
])

// Check if email exists
router.post('/users/check_email', [
    UserController.checkEmail
])

export { router as UserRoute };