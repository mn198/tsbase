import express from 'express';
import { Utils } from '../../components/Utils/utils';
import * as PhotoController from './photo';

const router = express.Router();

router.post('/photos',
    Utils.uploadImage.single('image'),
    PhotoController.uploadPhoto
)

router.get('/photos/:filename', PhotoController.readPhoto);

export { router as PhotoRoute };