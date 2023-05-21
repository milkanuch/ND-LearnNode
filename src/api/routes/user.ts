import { Router } from 'express';
import { getCurrentUser, updateUser } from '../handlers/user';
import { getAllQuizResults, setQuizResult } from '../handlers/result';
import { ResultModel } from '../models/result';
import { validateRequest } from '../../middleware';
import { UsersModel } from '../models/user';
const router = Router();

router.get('/', getCurrentUser);
router.get('/get-all-quiz-results', getAllQuizResults);

router.put(
  '/set-quiz-result',
  validateRequest({
    body: ResultModel.pick({ id: true, userScore: true, quizLength: true }),
  }),
  setQuizResult,
);
router.put(
  '/update-user',
  validateRequest({
    body: UsersModel.pick({ nickname: true, email: true }),
  }),
  updateUser,
);

export default router;
