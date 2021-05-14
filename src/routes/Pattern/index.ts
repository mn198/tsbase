import express from 'express';
import { PatternModel } from '../../components/Pattern/pattern.model';
import { Middleware } from '../../middlewares/middleware';
import * as PatternController from './pattern';

const router = express.Router();

// Create new pattern
router.post('/patterns', [
    Middleware.validateJsonWebToken,
    PatternController.create
])

// Get paging patterns
router.get('/patterns', [
    Middleware.validateJsonWebToken,
    Middleware.grantAccess('readAny', 'pattern'),
    Middleware.validatePageIndexAndPageSize,
    PatternController.getAll
])

// Get paging patterns by owner
router.get('/:userId/patterns', [
    Middleware.validateJsonWebToken,
    Middleware.validateUserId,
    Middleware.grantAccess('readOwn', 'pattern'),
    Middleware.validatePageIndexAndPageSize,
    PatternController.getAllByOwner
])

// Get any pattern
router.get('/patterns/:id', [
    Middleware.validateJsonWebToken,
    Middleware.grantAccess('readAny', 'pattern'),
    PatternController.get
])

// Get your own pattern
router.get('/:userId/patterns/:id', [
    Middleware.validateJsonWebToken,
    Middleware.validateUserId,
    Middleware.grantAccess('readOwn', 'pattern'),
    Middleware.validateOwnership(PatternModel),
    PatternController.get
])

// Update any pattern
router.put('/patterns/:id', [
    Middleware.validateJsonWebToken,
    Middleware.grantAccess('updateAny', 'pattern'),
    PatternController.update
])

// Update your own pattern
router.put('/:userId/patterns/:id', [
    Middleware.validateJsonWebToken,
    Middleware.validateUserId,
    Middleware.grantAccess('updateOwn', 'pattern'),
    Middleware.validateOwnership(PatternModel),
    PatternController.update
])

// Remove your own pattern
router.delete('/:userId/patterns/:id', [
    Middleware.validateJsonWebToken,
    Middleware.validateUserId,
    Middleware.grantAccess('deleteOwn', 'pattern'),
    Middleware.validateOwnership(PatternModel),
    PatternController.remove
])

// Remove any pattern
router.delete('/patterns/:id', [
    Middleware.validateJsonWebToken,
    Middleware.grantAccess('deleteAny', 'pattern'),
    PatternController.remove
])


export { router as PatternRoute };