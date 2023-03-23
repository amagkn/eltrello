import { model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { UserDocument } from '../types/user.interface';

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: [validator.isEmail, 'invalid email'],
      createIndexes: { unique: true },
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

userSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const UserModel = model<UserDocument>('User', userSchema);
