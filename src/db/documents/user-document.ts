import { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  userName: string;
  password: string;

  comparePassword: (passwordToValidate: string) => Promise<boolean>;
}

export type UserModel = Model<UserDocument>;
