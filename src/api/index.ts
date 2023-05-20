import express from 'express';

import emojis from './emojis';
import auth from './routes/auth';
import courses from './routes/courses';

const router = express.Router();

router.use('/emojis', emojis);
router.use('/auth', auth);
router.use('/courses', courses);

export default router;
