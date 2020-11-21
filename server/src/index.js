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
// app.use(cookieParser());

// app.use((req, res, next) => {
//   const { token } = req.cookies;
//   if (token) {
//     const { userID } = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(userID);
//     req.userId = userID;
//   }
//   next();
// });

const getUser = (token) => {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (!user) {
    throw new Error('User token not found');
  }
  return user;
};

const server = new ApolloServer({
  schema,
  context: contextMiddleware,
});

server.applyMiddleware({
  app,
  cors: corsOptions,
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
