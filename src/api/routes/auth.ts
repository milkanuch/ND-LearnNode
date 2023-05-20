import { Router } from 'express';

import { validateRequest } from '../../middleware';
import { UsersModel } from '../models/user';
import { registration, login } from '../handlers/auth';

const router = Router();

router.post(
  '/register',
  validateRequest({
    body: UsersModel,
  }),
  registration,
);

router.post(
  '/login',
  validateRequest({
    body: UsersModel.pick({
      email: true,
      password: true,
    }).partial(),
  }),
  login,
);

export default router;
