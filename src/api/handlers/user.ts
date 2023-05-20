import { decodeToken } from './../../middleware';
import { Response, Request, NextFunction } from 'express';
import { User, Users } from '../models/user';

import { ObjectId } from 'mongodb';

export const getCurrentUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decryptedUser = await decodeToken(req.headers.authorization!);

    if (!decryptedUser) {
      res.status(404);
      next(`Something went wrong`);
    }
    const user = await Users.findOne({ _id: new ObjectId(decryptedUser) });

    if (!user) {
      res.status(404);
      next(`User not found`);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
