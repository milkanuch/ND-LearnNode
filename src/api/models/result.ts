import * as zod from 'zod';
import { db } from '../../database';
import { WithId } from 'mongodb';

export const ResultModel = zod.object({
  id: zod.string(),
  userScore: zod.number(),
  quizLength: zod.number(),
});

export type Result = zod.infer<typeof ResultModel>;
export type ResultWithId = WithId<typeof ResultModel>;
export const Results = db.collection<Result>('results');
