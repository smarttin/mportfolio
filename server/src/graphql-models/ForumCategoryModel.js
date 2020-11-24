import BaseModel from './BaseModel';

class ForumCategoryModel extends BaseModel {
  getAll() {
    return this.Model.find({});
  }

  getBySlug(slug) {
    return this.Model.findOne({ slug }).populate('user');
  }
}

export default ForumCategoryModel;
