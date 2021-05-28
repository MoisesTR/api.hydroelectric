import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';
import log from '../lib/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: HttpException, _request: Request, response: Response, _next: NextFunction) => {
  log.info('Error middleware');
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  log.info('Stack trace', error.stack);

  response.status(status).send({
    message,
    status,
  });
};
