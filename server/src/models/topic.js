import mongoose from 'mongoose';
const { Schema } = mongoose;

const topicSchema = new Schema(
  {
    title: String,
    content: String,
    slug: { type: String, unique: true, index: true },
    forumCategory: { type: Schema.Types.ObjectId, ref: 'ForumCategory' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Topic', topicSchema);
