import Container from 'typedi';
import express, { NextFunction, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import createUserValidation from './validations/create-user.validation';
import validateFieldsMiddleware from '../middleware/validate-fields.middleware';

export default (app: express.Application) => {
  const userController = Container.get(UserController);

  const router = express.Router();

  router.post('/', createUserValidation, validateFieldsMiddleware, (req: Request, res: Response, next: NextFunction) =>
    userController.createUser(req, res, next),
  );

  app.use('/users', router);
};
