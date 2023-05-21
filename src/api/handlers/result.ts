import { Response, Request, NextFunction } from 'express';
import { Result } from '../models/result';
import { decodeToken } from '../../middleware';
import { Users } from '../models/user';
import { ObjectId } from 'mongodb';
import { Courses } from '../models/course';

export const setQuizResult = async (
  req: Request<{}, {}, Result>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userToken = req.headers.authorization;
    const userId = await decodeToken(userToken);

    if (!userId) {
      return res.status(400).json({ message: 'Seems like we lost user token' });
    }

    const userResult = await Users.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { results: req.body } },
    );

    if (!userResult) {
      return res.status(40).json({ message: 'Something went wrong' });
    } else {
      return res
        .status(200)
        .json({ message: 'Users Results added successfully' });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllQuizResults = async (
  req: Request<{}, {}, Result>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userToken = req.headers.authorization;
    const userId = await decodeToken(userToken);
    if (!userId) {
      return res.status(400).json({ message: 'Seems like we lost user token' });
    }
    const userResults = await Users.findOne({ _id: new ObjectId(userId) });

    if (!userResults) {
      return res.status(400).json({ message: 'Something went wrong' });
    }

    const userCourses = await Promise.all(
      userResults.results.map(async result => {
        const { id, userScore, quizLength } = result;
        const course = await Courses.findOne({ _id: new ObjectId(id) });

        if (course) {
          return {
            courseName: course.name,
            userScore,
            quizLength,
          };
        }
      }),
    );

    res.status(200).json(userCourses);
  } catch (err) {
    next(err);
  }
};
