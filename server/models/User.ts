import mongoose, { Document, Model } from 'mongoose';
import { isEmail } from 'validator';
import * as bcrypt from 'bcrypt';

interface UserDocument extends Document {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDocument> {
  login(email: string, password: string): Promise<UserDocument>;
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});

// Hash password before saving to database
userSchema.pre<UserDocument>('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login user
userSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error('Incorrect password');
  }
  throw new Error('Incorrect email');
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
