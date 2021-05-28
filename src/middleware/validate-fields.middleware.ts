import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export default (req: Request, res: Response, next: NextFunction): void | Response => {
  const errors = validationResult(req).array({ onlyFirstError: true });

  if (errors.length === 0) {
    return next();
  }

  return res.status(400).json(errors);
};
