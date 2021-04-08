import express from 'express';
import { AuthRoute } from './Auth';
import { PhotoRoute } from './Photo';
import { UserRoute } from './User';

const router = express.Router();

router.use(PhotoRoute);
router.use(AuthRoute);
router.use(UserRoute);

export { router as AdminRoute };