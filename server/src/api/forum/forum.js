export default {
  Query: {
    forumCategories: (_, __, ctx) => {
      return ctx.models.ForumCategory.getAll();
    },
    topicsByCategory: async (root, { category }, ctx) => {
      const forumCategory = await ctx.models.ForumCategory.getBySlug(category);
      if (!forumCategory) {
        return null;
      }
      return ctx.models.Topic.getAllByCategory(forumCategory.id);
    },
    topicBySlug: (root, { slug }, ctx) => {
      return ctx.models.Topic.getBySlug(slug);
    },
    postsByTopic: async (root, { slug, pageNum, pageSize }, ctx) => {
      const topic = await ctx.models.Topic.getBySlug(slug);
      return ctx.models.Post.getAllByTopic(topic, pageNum, pageSize);
    },
  },
  Mutation: {
    createTopic: async (root, { input }, ctx) => {
      if (!ctx.request.userId)
        throw new AuthenticationError('You must sign in to do that');
      const category = await ctx.models.ForumCategory.getBySlug(
        input.forumCategory
      );
      input.forumCategory = category.id;
      input.user = ctx.request.userId;
      const topic = await ctx.models.Topic.create(input);
      return topic;
    },
    createPost: async (root, { input }, ctx) => {
      if (!ctx.request.userId)
        throw new AuthenticationError('You must sign in to do that');
      input.user = ctx.request.userId;
      const post = await ctx.models.Post.create(input);
      return post;
    },
  },
};
