const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { login, signup } = authController;

const { getAllUsers, getUser, updateUser, addUser, deleteUser } =
  userController;

const router = express.Router();

// ---------------- 1) Auth Routers --------------------------------
router.post('/signup', signup);
router.post('/login', login);

// ---------------- 2) Other Routers --------------------------------
router.route('/').get(getAllUsers).post(addUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
