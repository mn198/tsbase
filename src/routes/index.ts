import express from 'express';
import { AuthRoute } from './Auth';
import { PatternRoute } from './Pattern';
import { PhotoRoute } from './Photo';
import { UserRoute } from './User';

const router = express.Router();

router.use(PhotoRoute);
router.use('/auth', AuthRoute);
router.use('/users', UserRoute);
router.use('/patterns', PatternRoute);

export { router as RoutesConfig };