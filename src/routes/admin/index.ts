import express from 'express';
import { PhotoRoute } from './Photo';

const router = express.Router();

router.use('/admin', PhotoRoute);

export { router as AdminRoute };