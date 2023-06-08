const express = require('express');
const userController = require('../controllers/userController');

const { getAllUsers, getUser, updateUser, addUser, deleteUser } =
  userController;

const router = express.Router();

router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
