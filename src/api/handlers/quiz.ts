import { Response, Request, NextFunction } from 'express';
import { Quiz } from '../models/quiz';
import { Courses } from '../models/course';
import { ObjectId } from 'mongodb';

export const setQuiz = async (
  req: Request<{}, {}, Quiz>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const quiz = req.body;
    if (!quiz.id) {
      res.status(400).json({ message: 'Course is required' });
      return;
    }
    const { quizzes } = quiz;
    if (!quizzes) {
      res.status(400).json({ message: 'Quiz is required' });
      return;
    }

    await Courses.updateOne(
      { _id: new ObjectId(quiz.id) },
      {
        $set: { quizzes },
      },
    );
    res.status(200).json({ message: 'Quiz created' });
  } catch (err) {
    next(err);
  }
};

export const getQuiz = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course = await Courses.findOne({ _id: new ObjectId(req.params.id) });
    if (!course) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    const quizzes = course.quizzes;
    res.status(200).json(quizzes);
  } catch (err) {
    next(err);
  }
};
