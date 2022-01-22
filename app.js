const cors = require('cors');
const express = require('express');
require('express-async-errors');
const loader = require('./src/loaders');

const app = express();
loader.init(app);

module.exports = app;
