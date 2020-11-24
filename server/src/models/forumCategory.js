import mongoose from 'mongoose';
const { Schema } = mongoose;

const forumCategorySchema = new Schema(
  {
    title: String,
    subTitle: String,
    slug: { type: String, unique: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.model('ForumCategory', forumCategorySchema);
