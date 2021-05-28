import { UserDocument } from 'db/documents/user-document';
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

userSchema.pre('save', async function saveUser(next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function comparePassword(passwordToValidate) {
  return bcrypt.compare(passwordToValidate, this.password);
};
export default model<UserDocument>('user', userSchema);
