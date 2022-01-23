const mongoose = require('mongoose');

exports.connectToDB = () => {
  const { DB_HOST } = process.env;
  const connectionString = `${DB_HOST}`;
  return mongoose.connect(connectionString);

  // Use different DB in different Env
  // const { NODE_ENV, DB_HOST_LOCAL, DB_PORT, DB_DATABASE_LOCAL, DB_HOST } = process.env;
  // if (NODE_ENV === 'development') {
  //   connectionString = `mongodb://${DB_HOST_LOCAL}:${DB_PORT}/${DB_DATABASE_LOCAL}`;
  // } else {
  //   connectionString = `${DB_HOST}`;
  // }
  // return mongoose.connect(connectionString);
};
