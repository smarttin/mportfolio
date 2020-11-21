import User from '../../models/user';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';

// const signToken = (userID) => {
//   return jwt.sign({ userID }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };
// const createSendCookie = (user, res) => {
//   const token = signToken(user.id);
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //1day
//     ),
//     secure: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//   };
//   res.cookie('portfolio_token', token, cookieOptions);
//   return user;
// };

export default {
  Query: {
    me: async (_, args, ctx, info) => {
      if (!ctx.request.userId) {
        return null;
      }
      const user = await User.findById({ _id: ctx.request.userId });
      return user;
    },
  },
  Mutation: {
    signUp: async (_, { input }, ctx) => {
      const { email, username, password } = input;
      let errors = {};

      try {
        if (email.trim() === '') errors.email = 'Email must not be empty';
        if (username.trim() === '')
          errors.username = 'Username must not be empty';
        if (password.trim() === '')
          errors.password = 'Password must not be empty';
        if (Object.keys(errors).length > 0) {
          throw errors;
        }
        const user = await User.create({ email, username, password });
        // create jwt
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        // set the jwt as cookie on the response
        ctx.response.cookie('portfolio_token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24, // 1 day cookie
          secure: process.env.NODE_ENV === 'production',
        });
        // return the user
        return user;
      } catch (error) {
        if (error.code && error.code === 11000) {
          throw new Error('User with provided email already exists!');
        }
        // throw new UserInputError('Bad input', { errors: error });
        throw error;
      }
    },
    signIn: async (_, { input }, ctx) => {
      const { email, password } = input;
      let errors = {};

      if (email.trim() === '') errors.email = 'username must not be empty';
      if (password === '') errors.password = 'password must not be empty';

      if (Object.keys(errors).length > 0) {
        throw new UserInputError('bad input', { errors });
      }

      const user = await User.findOne({ email });

      if (!user || !(await user.validatePassword(password, user.password))) {
        errors.email = 'Incorrect email or password!';
        throw new UserInputError('Incorrect email or password!', { errors });
      }

      // create jwt
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      // set the jwt as cookie on the response
      ctx.response.cookie('portfolio_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day cookie
        secure: process.env.NODE_ENV === 'production',
      });
      // return the user
      return user;
    },
    signOut: async (_, args, ctx) => {
      ctx.response.clearCookie('portfolio_token');
      return true;
    },
  },
};
