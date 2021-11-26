const express = require("express");
const router = new express.Router();

const userController = require('../../../controller/users');
const propertyController = require('../../../controller/properties');
const authController = require('../../../controller/authController');
const inspectionController = require('../../../controller/inspections');
const auth = require('../../../controller/auth');

router.get("/users", userController.index);
router.post("/users", userController.store);
router.delete("/users", userController.destroy);
router.put("/users", userController.update);
router.get("/users/:id", userController.show);

router.get('/properties', propertyController.index);
router.get('/properties/:id', propertyController.show);

router.get('/properties', inspectionController.index);
router.get('/properties/:id', inspectionController.show);

router.get('/signup', auth, authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', auth, authController.login_get);
router.post('/login', authController.login_post);
module.exports = router;
