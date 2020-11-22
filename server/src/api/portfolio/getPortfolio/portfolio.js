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
};
