import { AuthenticationError } from 'apollo-server-express';
import User from '../../../models/user';

export default {
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
  },
};
