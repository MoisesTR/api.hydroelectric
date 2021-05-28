import 'dotenv/config';
import 'reflect-metadata';
import Express, { Request, Response } from 'express';

import errorMiddleware from './middleware/error.middleware';
import loadContainer from './container/index';
import loadMiddlewares from './middleware/index';
import loadRoutes from './routes/index';
import startServer from './server';
import initDBConnection from './db/index';

const app = Express();

loadMiddlewares(app);
loadContainer();

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>HydroElectric API!</h1>');
});

loadRoutes(app);

app.use(errorMiddleware);

initDBConnection().then(() => {
  startServer(app);
});
