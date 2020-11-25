import { AuthenticationError } from 'apollo-server-express';
import User from '../../models/user';

const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default {
  Query: {
    getPortfolio: async (_, { id }, ctx) => {
      try {
        const portfolio = await ctx.models.Portfolio.getById(id);
        if (!portfolio) {
          throw new Error('Portfolio not found');
        }
        return portfolio;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getPortfolios: async (_, __, ctx) => {
      try {
        const portfolios = await ctx.models.Portfolio.getAll();
        if (!portfolios) {
          throw new Error('No portfolios not found, proceed to create one');
        }
        return portfolios;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getUserPortfolios: async (_, __, ctx) => {
      try {
        return await ctx.models.Portfolio.getAllByUser(ctx.request.userId);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createPortfolio: async (_, { input }, ctx) => {
      try {
        if (!ctx.request.userId)
          throw new AuthenticationError('You must sign in to do that');

        const user = await User.findById(ctx.request.userId);
        if (!user.role === 'admin') {
          throw new AuthenticationError(
            'You are not Authorized to perform this action'
          );
        }
        const createdPortfolio = await ctx.models.Portfolio.create({
          ...input,
          user: user.id,
        });
        return createdPortfolio;
      } catch (error) {
        throw new Error(error);
      }
    },
    alterPortfolio: async (_, args, ctx) => {
      const { id, input, action } = args;
      try {
        if (!ctx.request.userId)
          throw new AuthenticationError('You must be logged in to do that');

        const portfolio = await ctx.models.Portfolio.getById(id);

        if (portfolio) {
          if (action === EDIT) {
            const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(
              { _id: id },
              input
            );
            return updatedPortfolio;
          } else if (action === DELETE) {
            const deletedPortfolio = await ctx.models.Portfolio.findAndDelete({
              _id: id,
            });
            return deletedPortfolio;
          }
        }
        throw Error('portfolio does not exist');
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
