import * as zod from 'zod';
import { db } from '../../database';
import { WithId } from 'mongodb';

export const CoursesModel = zod.object({
  name: zod.string(),
  description: zod.string(),
});

export type Course = zod.infer<typeof CoursesModel>;
export type CourseWithId = WithId<Course>;
export const Courses = db.collection<Course>('courses');
