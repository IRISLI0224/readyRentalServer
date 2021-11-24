const jwt = require('jsonwebtoken');
/* eslint-disable implicit-arrow-linebreak */

exports.signup_get = (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json([
    {
      id: 1,
      Username: 'Jessie',
      Email: 'jessie@gmail.com',
      Password: 'abc1223',
    },
  ]);

exports.signup_post = (req, res) => {
  // mock a user
  const user = {
    id: 1,
    Username: 'Jessie',
    Email: 'jessie@gmail.com',
    Password: 'abc1223',
  };
  jwt.sign({ user }, 'secretkey', (error, token) => {
    res.json({
      token,
    });
  });
};

exports.login_get = (req, res) =>
  res.status(200).json([
    {
      id: 1,
      Username: 'Jessie',
      Email: 'jessie@gmail.com',
      Password: 'abc1223',
    },
  ]);

exports.login_post = (req, res) => {
  const user = {
    id: 1,
    Username: 'Jessie',
    Email: 'jessie@gmail.com',
    Password: 'abc1223',
  };
  const token = jwt.sign(user, 'secretkey', { expiresIn: 60 * 60 });
  res.status(200).send({ token, user });
};

// delete one user
exports.destroy = (req, res) => res.status(204);
