exports.getPosts = async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    message: 'posts',
  });
};
