import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request , res: Response, next: NextFunction) => {
  console.log('"somthing went wrong err', err);

  res.status(400).send({
    message: 'Something went wrong'
  });
};