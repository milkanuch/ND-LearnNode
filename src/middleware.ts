import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import ErrorResponse from './interfaces/ErrorResponse';
import RequestValidators from './interfaces/RequestValidators';
import jwt, { Secret } from 'jsonwebtoken';

export const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422);
      }
      next(error);
    }
  };
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: err.stack,
  });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, err => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  });
  next();
};

export const decodeToken = async (
  bearerToken: string | undefined,
): Promise<string> => {
  if (!bearerToken) return "Stop, where's your token? ";
  const token = bearerToken.split(' ')[1];

  const user = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err, decoded) => {
      if (err) {
        throw new Error('Invalid token');
      }

      return decoded;
    },
  ) as unknown as jwt.JwtPayload;

  return user.userId;
};
