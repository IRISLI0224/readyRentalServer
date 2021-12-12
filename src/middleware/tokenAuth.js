/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) res.status(401).send('no token found');
  const token = authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, 'secretkey', (err, user) => {
      if (err) {
        res.status(401).send('Wrong Token');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send('Please login in first');
  }
};

module.exports = verifyToken;

//move to user.js
