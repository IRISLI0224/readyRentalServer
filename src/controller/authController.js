const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation/validation');
const { generateAccessToken } = require('./token');
const User = require('../model/user');
const crypto = require('crypto');

require('dotenv').config();

// register-post
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const { error } = registerValidation(req.body); // validate the input
  if (error) {
    return res.status(400).json(error.details[0].message);
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
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send('Email does not exist');
  }
  // 变成函数
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(401).send('Invalid password');

  const token = generateAccessToken({ user });

  res.status(201).json({ user, token });
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

// forgotPassword -> send a link
exports.forgotPassword = async (req, res) => {
  const nodemailer = require('nodemailer');
  if (req.body.email === '') {
    res.status(400).json('email required');
  }
  console.error(req.body.email);
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user === null) {
      console.error('email not in database');
      res.status(403).send('email not in db');
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      });

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });
      const mailOptions = {
        from: '"Ready Rental" <buggodie123@gmail.com>',
        to: `${user.email}`,
        subject: 'Link To Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
          `http://localhost:3000/reset/${token}\n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  });
};

//reset password
exports.reset = async (req, res) => {
  User.findOne({
    where: {
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: Date.now() + 3600000,
    },
  }).then((user) => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send('password reset link is invalid or has expired');
    } else {
      res.status(200).send({
        email: user.email,
        message: 'password reset link a-ok',
      });
    }
  });
};

//update password
exports.updatePasswordViaEmail = async (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: Date.now() + 3600000,
    },
  }).then((user) => {
    if (user == null) {
      console.log(user);
      console.log(req.body.email);
      console.error('password reset link is invalid or has expired');
      res.status(403).send('password reset link is invalid or has expired');
    } else if (user != null) {
      console.log('user exists in db');
      console.log(user);
      console.log(req.body.email);
      user.password = req.body.password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      user.save();
      console.log('password updated');
      res.status(200).send({ message: 'password updated' });
    } else {
      console.error('no user exists in db to update');
      res.status(401).json('no user exists in db to update');
    }
  });
};
