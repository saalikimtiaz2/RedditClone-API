const express = require('express');
const postsController = require('../controllers/postsController');

const { getPosts } = postsController;

const router = express.Router();

// ---------------- 1)  Routers --------------------------------
router.route('/').get(getPosts);

module.exports = router;
