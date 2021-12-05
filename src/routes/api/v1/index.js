const express = require('express');
const router = new express.Router();
const userController = require('../../../controller/users');
const propertyController = require('../../../controller/properties');
const authController = require('../../../controller/authController');
const inspectionController = require('../../../controller/inspections');
const tokenAuth = require('../../../middleware/tokenAuth');

//user routes
router.get('/users', tokenAuth, userController.index);
router.put('/users', tokenAuth, userController.update);
router.get('/users/:id', tokenAuth, userController.show);
router.delete('/users/:id', tokenAuth, authController.destroy);

//properties routes
router.get('/properties', propertyController.index);
router.get('/properties/:id', propertyController.show);
router.post('/properties', propertyController.store);
router.delete('/properties/:id', tokenAuth, propertyController.destroy);
router.put('/properties/:id', propertyController.update);

//inspection routes
router.get('/properties', inspectionController.index);
router.get('/properties/:id', inspectionController.show);

//auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
