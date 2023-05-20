import zod, { AnyZodObject } from 'zod';
import { ObjectId } from 'mongodb';

export default interface RequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

export const ParamsWithId = zod.object({
  id: zod
    .string()
    .min(1)
    .refine(
      val => {
        try {
          return new ObjectId(val);
        } catch (error) {
          return false;
        }
      },
      {
        message: 'Invalid ObjectId',
      },
    ),
});

export type ParamsWithId = zod.infer<typeof ParamsWithId>;
