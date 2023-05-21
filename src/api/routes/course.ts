import { Router } from 'express';
import { setCourse, getAllCourses, getCourse } from '../handlers/course';
import { getQuiz, setQuiz } from '../handlers/quiz';
import { validateRequest } from '../../middleware';
import { CoursesModel } from '../models/course';
import { ParamsWithId } from '../../interfaces/RequestValidators';
import { QuizModel } from '../models/quiz';
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

router.get(
  '/get-quiz/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  getQuiz,
);

router.post(
  '/create-quiz',
  validateRequest({
    body: QuizModel.pick({ quizzes: true, id: true }),
  }),
  setQuiz,
);

export default router;
