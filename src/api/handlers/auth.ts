import { Response, Request, NextFunction } from 'express';
import { User, Users, UsersModel } from '../models/user';
import bcrypt from 'bcrypt';
import { createTokens } from '../services/auth';

export const login = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const { accessToken } = createTokens(user._id);
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const registration = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = UsersModel.parse(req.body);
    const existingUser = await Users.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or phone number already exists',
      });
    }
    const newSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, newSalt);
    user.password = hashedPassword;

    const insertResult = await Users.insertOne(user);
    if (!insertResult.acknowledged) {
      next('Error inserting user.');
      return;
    }

    const { accessToken } = createTokens(insertResult.insertedId);

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
