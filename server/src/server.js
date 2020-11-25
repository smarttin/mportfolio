import { GraphQLServer } from 'graphql-yoga';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from './models/user';

import './env';
import './db';
import schema from './schema';

// GraphqlModels
import PortfolioModel from './graphql-models/portfolioModel';
import ForumCategoryModel from './graphql-models/ForumCategoryModel';
import TopicModel from './graphql-models/TopicModel';
import PostModel from './graphql-models/PostModel';

// initialize apollo server
const server = new GraphQLServer({
  schema,
  context: (req) => ({
    ...req,
    models: {
      Portfolio: new PortfolioModel(mongoose.model('Portfolio')),
      ForumCategory: new ForumCategoryModel(mongoose.model('ForumCategory')),
      Topic: new TopicModel(mongoose.model('Topic')),
      Post: new PostModel(mongoose.model('Post')),
    },
  }),
});

// use express middleware to handle cookies (jwt)
server.express.use(cookieParser());

// decode the jwt to get the user id on each request - req.userId
server.express.use((req, res, next) => {
  const { portfolio_token } = req.cookies;
  if (portfolio_token) {
    const { userId } = jwt.verify(portfolio_token, process.env.JWT_SECRET);
    // console.log(userId);
    req.userId = userId;
  }
  next();
});

// attach full user details to every request - req.user
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await User.findById(req.userId);
  // console.log('user', user);
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  (deets) => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
