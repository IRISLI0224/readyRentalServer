const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation/validation');
const { generateAccessToken } = require('./token');
const nodemailer = require('nodemailer');
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
  if (existingUser) return res.status(403).send('Email already exists');

  try {
    const user = await User.create({ email, password });

    //generate jwt token
    const token = generateAccessToken({ user },{expiresIn:'5m'});

    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(400).send(err);
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

  const token = generateAccessToken({ user },{expiresIn:'1m'});

  return res.status(201).json({ user, token });
};

//logout
exports.logout = () => {};

// delete one user
exports.destroy = (req, res) => {
  //id mongodb
  if (users.id === req.params.id) {
    return res.status(204).json('user has been deleted');
  } else {
    return res.status(404).json('You are not allowed to delete this user!');
  }
};

// forgotPassword -> send a link
exports.forgotPassword = async (req, res) => {
  if (req.body.email === '') {
    return res.status(400).json('email required');
  }
  console.error(req.body.email);
  const token = crypto.randomBytes(20).toString('hex');
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user === null) {
      console.error('email not in database');
      return res.status(403).send('email not in db');
    } else {
      console.log(user);
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      user.save();
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });
    const mailOptions = {
      from: '"Ready Rental" <buggodie@gmail.com>',
      to: `${user.email}`,
      subject: 'Link To Reset Password',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
        `http://localhost:3000/reset/${user.resetPasswordToken}\n\n` +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    };

    console.log('sending mail');

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err);
        return res.status(404).json('there was an error: ', err);
      } else {
        console.log('here is the res: ', response);
        return res.status(200).json('recovery email sent');
      }
    });
  });
};

//reset password
exports.reset = async (req, res) => {
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken,
  }).then((user) => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      return res.status(403).send('password reset link is invalid or has expired');
    } else {
      console.log(user);
      return res.status(200).json({
        email: user.email,
        message: 'password reset link a-ok',
      });
    }
  });
};

//update password
exports.updatePasswordViaEmail = async (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    { resetPasswordToken: req.body.resetPasswordToken },
  ).then((user) => {
    if (user == null) {
      console.log(user);
      console.log(req.body.email);
      console.error('password reset link is invalid or has expired');
      return res.status(403).json('password reset link is invalid or has expired');
    } else if (user != null) {
      console.log('user exists in db');
      console.log(user);
      console.log(req.body.email);
      user.password = req.body.password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      user.save();
      console.log('password updated');
      return res.status(200).json({ message: 'password updated' });
    } else {
      console.error('no user exists in db to update');
      return res.status(401).json('no user exists in db to update');
    }
  });
};
