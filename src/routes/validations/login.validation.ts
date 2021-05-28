import { body } from 'express-validator';
import { getMessageLenght } from './utils';

export default [
  body('userName', 'The userName is required')
    .isString()
    .exists()
    .isLength({ min: 5, max: 15 })
    .withMessage(getMessageLenght('userName', 5, 15)),
  body('password', 'The password is required')
    .isString()
    .exists()
    .isLength({ min: 5, max: 14 })
    .withMessage(getMessageLenght('password', 5, 14)),
];
