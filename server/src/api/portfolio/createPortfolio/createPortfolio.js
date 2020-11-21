import { AuthenticationError } from 'apollo-server-express';
import User from '../../../models/user';

export default {
  Mutation: {
    createPortfolio: async (_, { input }, ctx) => {
      try {
        if (!ctx.request.userId)
          throw AuthenticationError('You must be logged in to do that');

        const user = await User.findById(ctx.request.userId);

        const createdPortfolio = await ctx.models.Portfolio.create({
          ...input,
          user: user.id,
        });
        return createdPortfolio;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
