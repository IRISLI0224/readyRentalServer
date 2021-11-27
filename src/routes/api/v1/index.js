const express = require('express');

const router = new express.Router();
const userTController = require('../../../controller/usersTemplate');
const propertyController = require('../../../controller/properties');
const authController = require('../../../controller/authController');
const auth = require('../../../controller/auth');
const userController = require('../../../controller/users');

router.get('/users', userTController.index);
router.post('/users', userTController.store);
router.delete('/users', userTController.destroy);
router.put('/users', userTController.update);
router.get('/users/:id', userTController.show);

router.get('/properties', propertyController.index);
router.get('/properties/:id', propertyController.show);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/users/:id', auth, authController.destroy);

router.get('/register', auth, userController.register);
router.get('/login', auth, userController.login);

module.exports = router;
