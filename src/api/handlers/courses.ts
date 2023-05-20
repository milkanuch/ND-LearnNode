import { Response, Request, NextFunction } from 'express';
import { Course, Courses, CourseWithId } from '../models/courses';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/RequestValidators';

export const getAllCourses = async (
  req: Request<{}, {}, Course>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courses = await Courses.find().toArray();

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

export const getCourse = async (
  req: Request<ParamsWithId, CourseWithId, {}>,
  res: Response<CourseWithId>,
  next: NextFunction,
) => {
  try {
    const course = await Courses.findOne({ _id: new ObjectId(req.params.id) });

    if (!course) {
      res.status(404);
      next(`Course not found with id: ${req.params.id}`);
    }

    res.status(200).json(course!);
  } catch (error) {
    console.log(`error: ${error}`);
    next(error);
  }
};

export const setCourse = async (
  req: Request<{}, {}, Course>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course = await Courses.insertOne(req.body);
    if (!course) {
      return res.status(400).json({ message: 'Something went wrong' });
    } else {
      return res.status(200).json({ message: 'Course added successfully' });
    }
  } catch (error) {
    next(error);
  }
};
