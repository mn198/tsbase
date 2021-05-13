import express from 'express';
import { Middleware } from '../../middlewares/middleware';
import * as PatternController from './pattern';

const router = express.Router();


router.post('', [
    Middleware.validateJsonWebToken,
    PatternController.create
])

router.get('/', [
    Middleware.validateJsonWebToken,
    Middleware.validatePageIndexAndPageSize,
    PatternController.getAll
])

router.get('/:id', [
    Middleware.validateJsonWebToken,
    PatternController.get
])

router.put('/:id', [
    Middleware.validateJsonWebToken,
    PatternController.update
])

router.delete('/:id', [
    Middleware.validateJsonWebToken,
    PatternController.remove
])


export { router as PatternRoute };