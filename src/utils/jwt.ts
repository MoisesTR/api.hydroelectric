import jwt from 'jsonwebtoken';
import { variables } from '../environment/variables';

const ACCESS_TOKEN_COOKIE_NAME = 'access_token';

const generateAccessToken = (payload: { userName: string; userId: string }): string => {
  const accessToken = jwt.sign(payload, variables.ACCESS_TOKEN_SECRET, {
    expiresIn: variables.ACCESS_TOKEN_LIFE,
    algorithm: 'HS256',
    audience: payload.userId,
    issuer: '',
  });

  return accessToken;
};

export { generateAccessToken, ACCESS_TOKEN_COOKIE_NAME };
