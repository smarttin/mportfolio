import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: String,
    slug: { type: String, unique: true, index: true },
    fullSlug: { type: String, unique: true, index: true },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    parent: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
