import express from 'express';
import { Utils } from '../../components/Utils/utils';
import { Middleware } from '../../middlewares/middleware';
import * as FileController from './file';

const router = express.Router();

router.post('/files',
    Middleware.validateJsonWebToken,
    Utils.uploadAnyFile.single('file'),
    FileController.uploadFile
)

router.get('/files/:filename', FileController.readFile);

export { router as FileRoute };