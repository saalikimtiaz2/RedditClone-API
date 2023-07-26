const Posts = require('../model/posts');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

// Method => GET
// Route => /posts
//  Description =>  Get all a tours
exports.getPosts = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Posts.find(), req.query)
    .filter()
    .sorting()
    .limitFields()
    .paginate();

  const posts = await features.query;

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: { posts },
  });
});

// Method => POST
// Route => /posts
//  Description =>  Create a new post
exports.createNewPost = catchAsync(async (req, res, next) => {
  const data = {
    ...req.body,
    postedBy: req.user._id,
  };
  const newPost = await Posts.create(data);
  res.status(200).json({
    status: 'success',
    post: newPost,
  });
});

// Method => GET
// Route => /posts/id
//  Description =>  Get a post using id
exports.getPostById = catchAsync(async (req, res, next) => {
  const post = await Posts.findById(req.params.id).select('-__v');

  if (!post) {
    return next(new AppError('No post such found!', 404));
  }

  res.status(200).json({
    status: 'success',
    post: post,
  });
});
