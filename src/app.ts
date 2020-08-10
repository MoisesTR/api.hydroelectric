import { loadControllers } from 'awilix-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import loadContainer from './container';

const app: express.Application = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});
console.log(process.env.APP_ENV);

// JSON SUPPORT
app.use(express.json());

// CORS SUPPORT
app.use(cors());

// CONTAINER
loadContainer(app);

// JWT
// const secretKey = process.env.jwt_secret_key;

// if (secretKey) {
//     app.use(jwt({
//         secret: secretKey,
//         algorithms: ['HS256']
//     }));
// } else {
//     throw new Error('Secret ket is not defined');
// }

app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export default app;
