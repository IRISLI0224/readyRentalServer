// const cors = require("cors");
const express = require("express");
const loader = require("./src/loaders");
const app = express();
loader.init(app);
module.exports = app;
