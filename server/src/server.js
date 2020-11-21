import { GraphQLServer } from 'graphql-yoga';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import './env';
import './db';
import schema from './schema';

// GraphqlModels
import PortfolioModel from './graphql-models/portfolioModel';

const server = new GraphQLServer({
  schema,
  context: (req) => ({
    ...req,
    models: { Portfolio: new PortfolioModel(mongoose.model('Portfolio')) },
  }),
});

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { portfolio_token } = req.cookies;
  if (portfolio_token) {
    const { userId } = jwt.verify(portfolio_token, process.env.JWT_SECRET);
    // console.log(userId);
    req.userId = userId;
  }
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
