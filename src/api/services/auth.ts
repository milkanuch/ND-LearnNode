import { ObjectId } from 'mongodb';
import jwt, { Secret } from 'jsonwebtoken';

export const createTokens = (id: ObjectId) => {
  const accessToken = jwt.sign(
    { userId: id },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: '14d' },
  );
  return {
    accessToken,
  };
};
