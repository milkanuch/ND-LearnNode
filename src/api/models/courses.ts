import * as zod from 'zod';
import { db } from '../../database';

export const CoursesModel = zod.object({
  _id: zod.string(),
  name: zod.string(),
  description: zod.string(),
});

export type Course = zod.infer<typeof CoursesModel>;
export const Courses = db.collection<Course>('courses');
