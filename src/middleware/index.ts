import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import loadCorsConfiguration from './cors.middleware';

export default (app: express.Application) => {
  app.use(morgan('tiny'));
  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
  app.use(mongoSanitize());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: '10kb' }));
  loadCorsConfiguration(app);
};
