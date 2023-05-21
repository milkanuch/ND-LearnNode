import { WithId } from 'mongodb';
import * as zod from 'zod';

import { Course } from './course';

export const QuizModel = zod.object({
  id: zod.string(),
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

export type Quiz = zod.infer<typeof QuizModel>;
export type QuizWithId = WithId<Course>;
