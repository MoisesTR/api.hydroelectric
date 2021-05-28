import { Inject, Service } from 'typedi';
import { Types } from 'mongoose';
import { Logger } from 'winston';
import { IUser } from 'repositories/interfaces/user';
import { TYPES } from '../types';
import { UserDocument } from '../db/documents/user-document';
import { CreateUserDto } from '../dtos/user.dto';
import HttpException from '../exceptions/http.exception';

@Service()
class UserService {
  constructor(@Inject(TYPES.userRepo) private readonly userRepository: IUser, @Inject('logger') readonly log: Logger) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      return await this.userRepository.createUser(createUserDto);
    } catch (err) {
      this.log.error('An error has been occurred in createUser service');
      throw err;
    }
  }

  async findUserById(userId: Types.ObjectId): Promise<UserDocument> {
    try {
      const user = await this.userRepository.findUserById(userId);

      if (!user) throw new HttpException(404, 'The user requested by id was not found');
      return user;
    } catch (err) {
      this.log.error('An error has been occurred in findUserById service');
      throw err;
    }
  }

  async findUserByUserName(userName: string): Promise<UserDocument> {
    try {
      const user = await this.userRepository.findUserByUserName(userName);

      if (!user) throw new HttpException(404, 'The user requested by userName was not found');
      return user;
    } catch (err) {
      this.log.error('An error has been occurred in findUserByUserName service');
      throw err;
    }
  }
}

export default UserService;
