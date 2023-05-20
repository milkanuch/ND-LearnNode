import { Router } from 'express';
import { setCourse, getAllCourses, getCourse } from '../handlers/courses';
import { validateRequest } from '../../middleware';
import { CoursesModel } from '../models/courses';
import { ParamsWithId } from '../../interfaces/RequestValidators';
const router = Router();

router.get('/', getAllCourses);
router.get(
  '/get/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  getCourse,
);

router.post(
  '/add-course',
  validateRequest({
    body: CoursesModel.pick({ name: true, description: true }),
  }),
  setCourse,
);

export default router;
