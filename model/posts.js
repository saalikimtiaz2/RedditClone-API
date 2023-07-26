const mongoose = require('mongoose');
// const validator = require('validator');

const postsSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  likes: {
    type: Number,
    default: 0,
  },
  disLikes: {
    type: Number,
    default: 0,
  },
  postType: {
    type: String,
    required: true,
    enums: ['image', 'text', 'link'],
  },
  postTime: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
    maxLength: 300,
  },
  overVirew: String,
  url: String,
  image: String,
  community: String,
});
const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
