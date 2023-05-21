import express from 'express';

import auth from './routes/auth';
import course from './routes/course';
import user from './routes/user';

const router = express.Router();

router.use('/auth', auth);
router.use('/courses', course);
router.use('/users', user);

export default router;
