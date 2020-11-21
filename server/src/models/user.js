import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    avatar: String,
    email: {
      type: String,
      required: 'Email is required!',
      lowercase: true,
      index: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    name: {
      type: String,
      minlength: [6, 'Minimum name length is 6 characters!'],
    },
    username: {
      type: String,
      required: true,
      minlength: [6, 'Minimum username length is 6 characters!'],
    },
    password: {
      type: String,
      minlength: [6, 'Minimum password length is 6 characters!'],
      maxlength: [32, 'Maximum password length is 32 characters!'],
      required: true,
    },
    role: {
      enum: ['guest', 'admin'],
      type: String,
      required: true,
      default: 'guest',
    },
    info: String,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.validatePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
export default User;
