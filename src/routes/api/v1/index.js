const express = require("express");
const router = new express.Router();
const userController = require("../../../controller/users");

router.get("/users", userController.index);
router.post("/users", userController.store);
router.delete("/users", userController.destroy);
router.put("/users", userController.update);
router.get("/users/:id", userController.show);

module.exports = router;
