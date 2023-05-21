import * as zod from 'zod';
import { db } from '../../database';
import { WithId } from 'mongodb';

export const CoursesModel = zod.object({
  name: zod.string(),
  description: zod.string(),
  quizzes: zod
    .array(
      zod.object({
        question: zod.string().min(3),
        answers: zod.array(zod.string()).default([]),
        correctAnswer: zod.string().min(3),
      }),
    )
    .default([]),
});

export type Course = zod.infer<typeof CoursesModel>;
export type CourseWithId = WithId<Course>;
export const Courses = db.collection<Course>('courses');
