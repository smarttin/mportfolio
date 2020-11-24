import slugify from 'slugify';
import uniqueSlug from 'unique-slug';
import BaseModel from './BaseModel';

class TopicModel extends BaseModel {
  async getRandoms(limit) {
    const query = await super.getRandoms(limit);
    return query().populate('user');
  }

  getBySlug(slug) {
    return this.Model.findOne({ slug })
      .populate('user')
      .populate('forumCategory');
  }

  getAllByCategory(forumCategory) {
    return this.Model.find({ forumCategory })
      .populate('user')
      .populate('forumCategory');
  }

  async _create(data) {
    const createdTopic = await this.Model.create(data);
    return this.Model.findById(createdTopic.id)
      .populate('user')
      .populate('forumCategory');
  }

  async create(topicData) {
    // generateSlug
    topicData.slug = slugify(topicData.title, {
      replacement: '-',
      remove: undefined,
      lower: true,
      strict: false,
    });

    let topic;
    try {
      topic = await this._create(topicData);
      return topic;
    } catch (e) {
      if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
        topicData.slug += `-${uniqueSlug()}`;
        topic = await this._create(topicData);
        return topic;
      }

      return null;
    }
  }
}

export default TopicModel;
