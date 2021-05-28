/* eslint-disable @typescript-eslint/no-unused-vars */
import Container from 'typedi';
import express, { Request, Response, NextFunction } from 'express';
import validateFieldsMiddleware from '../middleware/validate-fields.middleware';
import AuthController from '../controllers/auth.controller';
import loginValidation from './validations/login.validation';
import verifyAuth from '../middleware/auth.middleware';

export default (app: express.Application) => {
  const authController = Container.get(AuthController);

  const router = express.Router();

  router.post('/login', loginValidation, validateFieldsMiddleware, (req: Request, res: Response, next: NextFunction) =>
    authController.login(req, res, next),
  );

  router.get('/me', verifyAuth, (req: Request, res: Response, next: NextFunction) => authController.me(req, res, next));

  router.get('/logout', verifyAuth, (req: Request, res: Response) => authController.logout(req, res));

  app.use('/auth', router);
};
