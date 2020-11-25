import './env';
import './db';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import schema from './schema';
import { isAuthenticated } from './middlewares/isAuthenticated';

// GraphqlModels
import PortfolioModel from './graphql-models/portfolioModel';
import User from './models/user';
import contextMiddleware from './middlewares/contextMiddleware';

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cookieParser());

const getUser = (authHeader) => {
  const token = authHeader.split(' ')[1];
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
};

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    const authHeader = req.headers.authorization || '';
    // console.log(authHeader);
    const user = getUser(authHeader);
    return {
      user,
      res,
      ...req,
    };
  },
});

server.applyMiddleware({
  app,
  cors: corsOptions,
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
