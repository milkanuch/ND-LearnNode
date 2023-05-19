import { Router } from 'express';

import { validateRequest } from '../../middleware';
import { UsersModel } from '../models/user';
import * as AuthHandlers from '../handlers/auth';

const router = Router();

router.post(
  '/register',
  validateRequest({
    body: UsersModel,
  }),
  AuthHandlers.registration,
);

router.post(
  '/login',
  validateRequest({
    body: UsersModel.pick({
      email: true,
      password: true,
    }).partial(),
  }),
  AuthHandlers.login,
);

export default router;
