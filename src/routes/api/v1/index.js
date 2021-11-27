const express = require("express");
const router = new express.Router();
const userController = require('../../../controller/users');
const propertyController = require('../../../controller/properties');
const authController = require('../../../controller/authController');
const auth = require('../../../controller/auth');
const newUserController = require('../../../controller/newUsers');

router.get('/users', userController.index);
router.post('/users', userController.store);
router.delete('/users', userController.destroy);
router.put('/users', userController.update);
router.get('/users/:id', userController.show);

router.get('/properties', propertyController.index);
router.get('/properties/:id', propertyController.show);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/users/:id', auth, authController.destroy);

router.get('/register', auth, newuserController.register);
router.get('/login', auth, userController.login);
const userController = require("../../../controller/newUsers");

router.get("/users", newUserController.index);
router.post("/users", newUserController.store);
router.delete("/users", newUserController.destroy);
router.put("/users", newUserController.update);
router.get("/users/:id", newUserController.show);

module.exports = router;
