const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  return res.status(200).send("Failed");
});

module.exports = router;
