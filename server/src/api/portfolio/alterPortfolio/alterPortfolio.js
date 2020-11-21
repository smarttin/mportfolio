const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default {
  Mutation: {
    alterPortfolio: async (_, args, ctx) => {
      const { id, input, action } = args;
      try {
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
