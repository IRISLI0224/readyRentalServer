const mongoose = require('mongoose');

exports.connectToDB = () => {
  const {
    NODE_ENV,
    DB_HOST_LOCAL,
    DB_PORT,
    DB_DATABASE_LOCAL,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DATABASE,
  } = process.env;

  let connectionString;
  if (NODE_ENV === 'production') {
    connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  } else {
    connectionString = `mongodb://${DB_HOST_LOCAL}:${DB_PORT}/${DB_DATABASE_LOCAL}`;
  }

  return mongoose.connect(connectionString);
};
