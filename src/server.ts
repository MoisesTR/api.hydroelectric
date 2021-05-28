import http from 'http';
import { variables } from './environment/variables';
import log from './lib/logger';

export default (app: Express.Application) => {
  const httpServer = new http.Server(app);
  httpServer.listen(variables.SERVER_PORT, () => {
    log.info(`Listening on port: ${variables.SERVER_PORT}`);
  });
  process.on('SIGTERM', () => {
    httpServer.close(() => {
      process.exit(0);
    });
  });
};
