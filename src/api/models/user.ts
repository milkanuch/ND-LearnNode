import * as zod from 'zod';

import { db } from '../../database';

export const UsersModel = zod.object({
  nickname: zod.string().min(3),
  email: zod.string().email(),
  password: zod.string().min(6),
  results: zod
    .array(
      zod.object({
        id: zod.string(),
        userScore: zod.number(),
        quizLength: zod.number(),
      }),
    )
    .default([]),
});

export type User = zod.infer<typeof UsersModel>;
export const Users = db.collection<User>('users');
