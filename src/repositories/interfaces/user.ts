import { Types } from 'mongoose';
import { CreateUserDto } from '../../dtos/user.dto';
import { UserDocument } from '../../db/documents/user-document';

export interface IUser {
  findUserById(userId: Types.ObjectId): Promise<UserDocument | null>;
  findUserByUserName(userName: string): Promise<UserDocument | null>;
  createUser(createUserDto: CreateUserDto): Promise<UserDocument>;
}
