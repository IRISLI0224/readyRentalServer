const express = require("express");
const router = new express.Router();
const userController = require('../../../controller/users');
const propertyController = require('../../../controller/properties');
const authController = require('../../../controller/authController');
const inspectionController = require('../../../controller/inspections');
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

router.get('/register', auth, newUserController.register);
router.get('/login', auth, newUserController.login);



router.get('/properties', inspectionController.index);
router.get('/properties/:id', inspectionController.show);

module.exports = router;
