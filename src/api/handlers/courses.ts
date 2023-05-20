import { Response, Request, NextFunction } from 'express';
import { Course, Courses } from '../models/courses';

export const getAllCourses = async (
  req: Request<{}, {}, Course>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courses = await Courses.find();
    if (!courses) {
      return res
        .status(404)
        .json({ message: "Sorry we don't have any sections for you yet." });
    }

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};
