const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => jwt.sign(user, 'secretkey', { expiresIn: 60 * 60 });

module.exports = {
  generateAccessToken,
};
