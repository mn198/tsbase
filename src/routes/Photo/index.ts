import express from 'express';
import { Utils } from '../../components/Utils/utils';
import { Middleware } from '../../middlewares/middleware';
import * as PhotoController from './photo';

const router = express.Router();

router.post('/photos',
    Middleware.validateJsonWebToken,
    Utils.uploadImage.single('image'),
    PhotoController.uploadPhoto
)

router.get('/photos/:filename', PhotoController.readPhoto);

export { router as PhotoRoute };