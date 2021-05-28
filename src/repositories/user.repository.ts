import { UserDocument, UserModel } from 'db/documents/user-document';
import { CreateUserDto } from 'dtos/user.dto';
import { Types } from 'mongoose';
import { Inject, Service } from 'typedi';
import { IUser } from './interfaces/user';

@Service()
class UserRepository implements IUser {
  constructor(@Inject('userModel') private userModel: UserModel) {}

  async findUserById(userId: Types.ObjectId): Promise<UserDocument | null> {
    return this.userModel.findById(userId);
  }

  async findUserByUserName(userName: string): Promise<UserDocument | null> {
    return this.userModel.findOne({
      userName,
    });
  }

  createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }
}

export default UserRepository;
