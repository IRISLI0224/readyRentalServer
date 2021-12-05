const mongoose = require('mongoose');

exports.connectToDB = () => {
  const connectionString = 'mongodb://localhost:27017/buggodie_database';
  return mongoose.connect(connectionString, {});
};
