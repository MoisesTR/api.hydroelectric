import { Response } from 'express';
import ApplicationException from '../exceptions/application.exception';
import { SqlException, SqlError } from '../exceptions/sql.exception';

export default abstract class BaseController {
    handleException(err: any, res: Response) {
        if (err instanceof ApplicationException) {
            res.status(400);
            res.send(err.message);
        } else if (err instanceof SqlException) {
            if (err.cause.number === 50000) {
                res.status(400);
                res.send(err.message);
                return;
            }
            throw new Error(err.message);
        } else {
            throw new Error(err);
        }
    }
}
