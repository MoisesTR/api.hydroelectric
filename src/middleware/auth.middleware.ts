import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_COOKIE_NAME } from '../utils/jwt';
import { variables } from '../environment/variables';
import Logger from '../lib/logger';

const verifyAuth = (req: Request, res: Response, next: NextFunction): Response | void => {
  let token: string = req.cookies[ACCESS_TOKEN_COOKIE_NAME] || req.get('authorization');

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(401).send('Unauthorized access');
  }

  try {
    const decoded: any = jwt.verify(token, variables.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(403).send('Invalid signature token!');
    }

    req.userId = decoded.userId;
    return next();
  } catch (err) {
    Logger.error(err);
    return res.status(401).send('Please login again!');
  }
};

export default verifyAuth;
