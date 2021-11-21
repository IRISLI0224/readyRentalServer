const express = require('express');
const cors = require('cors');
const apiRouter = require('../../src/routes/api/v1');
const config = require('../../src/config/app');
module.exports = async (app) => {
  // app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, apiRouter);
  return app;
};
