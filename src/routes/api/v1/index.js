const express = require('express');
const router = new express.Router();
const userController = require('../../../controller/users');
const propertyController = require('../../../controller/properties');
const authController = require('../../../controller/authController');
const inspectionController = require('../../../controller/inspections');
const tokenAuth = require('../../../middleware/tokenAuth');

//user routes
router.get('/users', tokenAuth, userController.index);
router.put('/users/:id', tokenAuth, userController.update);
router.get('/users/:id', userController.show);
router.delete('/users/:id', tokenAuth, userController.destroy);

//auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

//properties routes
router.get('/properties', propertyController.searchProperties);
router.get('/properties/:id', propertyController.show);
router.post('/properties', tokenAuth, propertyController.store);
router.delete('/properties/:id', tokenAuth, propertyController.destroy);
router.put('/properties/:id', tokenAuth, propertyController.update);

//inspection routes
router.get('/inspections', tokenAuth, inspectionController.index);
router.get('/inspections/:id', tokenAuth, inspectionController.show);
router.post('/inspections', inspectionController.store);
router.delete('/inspections/:id', tokenAuth, inspectionController.destroy);
router.put('/inspections/:id', tokenAuth, inspectionController.update);

module.exports = router;
