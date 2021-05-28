/* eslint-disable no-underscore-dangle */
import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { Types } from 'mongoose';
import { IUser } from 'repositories/interfaces/user';
import { TYPES } from '../types';
import { generateAccessToken } from '../utils/jwt';
import { LoginDto, LoginUserInfoDto } from '../dtos/login.dto';
import HttpException from '../exceptions/http.exception';

@Service()
class AuthService {
  constructor(@Inject(TYPES.userRepo) readonly userRepository: IUser, @Inject('logger') private readonly log: Logger) {}

  async login(loginDto: LoginDto): Promise<LoginUserInfoDto> {
    try {
      const user = await this.userRepository.findUserByUserName(loginDto.userName);

      if (!user) {
        throw new HttpException(404, `The user doesn't exist in the website`);
      }

      const isValidPassword = await user.comparePassword(loginDto.password);

      if (!isValidPassword) {
        throw new HttpException(401, 'The password or userName is incorrect');
      }

      const accessToken = generateAccessToken({ userName: user.name, userId: String(user._id) });
      return {
        userId: String(user._id),
        userName: user.userName,
        name: user.name,
        accessToken,
      };
    } catch (err) {
      this.log.error('An error has been occurred in the sync service');
      throw err;
    }
  }

  async me(userId: Types.ObjectId): Promise<LoginUserInfoDto> {
    try {
      const user = await this.userRepository.findUserById(userId);

      if (!user) {
        throw new HttpException(404, `The user doesn't exist in the website`);
      }

      return {
        userId: String(user._id),
        userName: user.userName,
        name: user.name,
        accessToken: '',
      };
    } catch (err) {
      this.log.error('An error has been occurred in the me service');
      throw err;
    }
  }
}

export default AuthService;
