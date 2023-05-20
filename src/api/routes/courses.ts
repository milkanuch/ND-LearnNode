import { Router } from 'express';
import * as CoursesHandler from '../handlers/courses';
const router = Router();

router.get('/all', CoursesHandler.getAllCourses);

export default router;
