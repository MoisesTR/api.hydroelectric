import express from 'express';
import loadUserRoutes from './user.route';
import loadAuthRoutes from './auth.route';

export default (app: express.Application) => {
  loadUserRoutes(app);
  loadAuthRoutes(app);
};
