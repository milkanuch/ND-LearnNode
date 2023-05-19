import { WithId } from 'mongodb';
import * as zod from 'zod';

import { db } from '../../database';

export const UsersModel = zod.object({
  nickname: zod.string().min(3),
  email: zod.string().email(),
  password: zod.string().min(6),
});

export type User = zod.infer<typeof UsersModel>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');
