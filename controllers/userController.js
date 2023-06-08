const UserModal = require('../model/user');

//  Method => GET
//  Route => /users
//  Description => Get a list of users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModal.find();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      data: err,
    });
  }
};

//  Method => POST
//  Route => /users/:userId
//  Description => Create a new user
exports.addUser = async (req, res) => {
  try {
    const newUser = await UserModal.create(req.body);
    res.status(200).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      data: err,
    });
  }
};

//  Method => GET
//  Route => /users
//  Description => Get a single user
exports.getUser = async (req, res) => {
  try {
    const user = await UserModal.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      data: err,
    });
  }
};

//  Method => PATCH
//  Route => /users/:userId
//  Description => Update user
exports.updateUser = async (req, res) => {
  const dataToUpdate = {
    ...req.body,
    updatedAt: Date.now(),
  };
  try {
    const user = await UserModal.findByIdAndUpdate(
      req.params.id,
      dataToUpdate,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      data: err,
    });
  }
};

//  Method => DELETE
//  Route => /users/:userId
//  Description => Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModal.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      data: err,
    });
  }
};
