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
    const decryptedUser = await decodeToken(req.headers.authorization);
    if (!decryptedUser) {
      return res.status(404).json({ message: 'Token not found' });
    }

    const user = await Users.findOne({ _id: new ObjectId(decryptedUser) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decryptedUser = await decodeToken(req.headers.authorization);
    console.log('🚀 ~ file: user.ts:35 ~ decryptedUser:', decryptedUser);
    if (!decryptedUser) {
      return res.status(404).json({ message: 'Token not found' });
    }
    const { email, nickname } = req.body;
    const user = await Users.findOneAndUpdate(
      { _id: new ObjectId(decryptedUser) },
      { $set: { email, nickname } },
    );
    console.log('🚀 ~ file: user.ts:44 ~ user:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
