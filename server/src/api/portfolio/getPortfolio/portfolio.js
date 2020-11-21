export default {
  Query: {
    getPortfolio: async (_, { id }, ctx) => {
      try {
        const portfolio = await ctx.models.Portfolio.getById(id);
        if (!portfolio) {
          throw new Error('portfolio not found');
        }
        return portfolio;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getPortfolios: async (_, args, ctx) => {
      try {
        const portfolios = await ctx.models.Portfolio.getAll();
        return portfolios;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
