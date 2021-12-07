const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation/validation');
const { generateAccessToken } = require('./token');
const User = require('../model/user');

// register-post
exports.register = async (req, res) => {
  const { email, password } = req.body;

  const { error } = registerValidation(req.body); // validate the input
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send('Email already exists');

  try {
    const user = await User.create({ email, password });

    //generate jwt token
    const token = generateAccessToken({ user });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

// login-post// add password test
exports.login = async (req, res) => {
  // routes validation -
  const { error } = loginValidation(req.body); // validate the input
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(401).send('Email does not exist');
  }
  // 变成函数
  const validPass = await bcrypt.compare(password, existingUser.password);
  if (!validPass) return res.status(401).send('Invalid password');

  const token = generateAccessToken({ existingUser });

  res.status(201).json({ existingUser, token });
};

//logout
exports.logout = () => {};

// delete one user
exports.destroy = (req, res) => {
  //id mongodb
  if (users.id === req.params.id) {
    res.status(204).json('user has been deleted');
  } else {
    res.status(404).json('You are not allowed to delete this user!');
  }
};
