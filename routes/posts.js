const express = require('express');
const postsController = require('../controllers/postsController');
const { protect } = require('../controllers/authController');

const { getPosts, createNewPost, getPostById } = postsController;

const router = express.Router();

// ---------------- 1)  Routers --------------------------------
router.route('/').get(getPosts).post(protect, createNewPost);

router.route('/:id').get(getPostById);

module.exports = router;
