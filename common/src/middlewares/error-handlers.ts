import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error('Some un-expected error occurred', err);
  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  });
};
