import { portfolios, users, forumCategories, topics, posts } from './data';
import Portfolio from '../models/portfolio';
import User from '../models/user';
import ForumCategory from '../models/forumCategory';
import Topic from '../models/topic';
import Post from '../models/post';

class FakeDb {
  async clean() {
    await Portfolio.deleteMany({});
    await User.deleteMany({});
    await ForumCategory.deleteMany({});
    await Topic.deleteMany({});
    await Post.deleteMany({});
  }

  async addData() {
    await Portfolio.create(portfolios);
    await User.create(users);
    await ForumCategory.create(forumCategories);
    await Topic.create(topics);
    await Post.create(posts);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

const fakeDb = new FakeDb();
export default fakeDb;
