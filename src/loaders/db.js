const mongoose = require('mongoose');

exports.connectToDB = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
  const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  return mongoose.connect(connectionString);
};
