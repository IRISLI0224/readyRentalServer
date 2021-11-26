<<<<<<< HEAD
const dotenv = require('dotenv');
=======
/* eslint-disable global-require */
// const dotenv = require('dotenv');
>>>>>>> 9c4f85bd26b12230b5cab5d922ae9f7999119628

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();
module.exports = {
  port: process.env.PORT || 8000,
  api: { prefix: process.env.API_PREFIX || '/api/v1' },
};
