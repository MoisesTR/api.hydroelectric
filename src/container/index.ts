import Container from 'typedi';
import { IUser } from 'repositories/interfaces/user';
import { TYPES } from '../types';
import UserRepository from '../repositories/user.repository';
import UserModel from '../db/models/user';
import Logger from '../lib/logger';

export default () => {
  try {
    Container.set('userModel', UserModel);
    Container.set('logger', Logger);
    Container.set<IUser>(TYPES.userRepo, Container.get(UserRepository));
    Logger.info('The container has been loaded successfully');
  } catch (err) {
    Logger.error(err);
    throw err;
  }
};
