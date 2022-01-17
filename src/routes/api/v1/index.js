const express = require('express');
const router = new express.Router();
const userController = require('../../../controller/users');
const propertyController = require('../../../controller/properties');
const authController = require('../../../controller/authController');
const inspectionController = require('../../../controller/inspections');
const imageUploadController = require('../../../controller/imageUpload');
const tokenAuth = require('../../../middleware/tokenAuth');
const contactEmailController = require('../../../controller/contactEmail');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//user routes
router.get('/users', tokenAuth, userController.index);
router.put('/users/:id', tokenAuth, userController.update);
router.get('/users/:id', userController.show);
router.delete('/users/:id', tokenAuth, userController.destroy);

//auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.get('/reset', authController.reset);
router.put('/updatePasswordViaEmail', authController.updatePasswordViaEmail);

//properties routes
router.get('/properties', propertyController.index);
router.get('/properties/:id', propertyController.show);
router.get('/propertiesads', propertyController.ads);
router.post('/properties', tokenAuth, propertyController.store);
router.delete('/properties/:id', tokenAuth, propertyController.destroy);
router.put('/properties/:id', tokenAuth, propertyController.update);

router.post('/images', upload.single('image'), imageUploadController.store);

//inspection routes
router.get('/inspections', tokenAuth, inspectionController.index);
router.get('/inspections/:id', tokenAuth, inspectionController.show);
router.post('/inspections', inspectionController.store);
router.delete('/inspections/:id', tokenAuth, inspectionController.destroy);
router.put('/inspections/:id', tokenAuth, inspectionController.update);

//contact email routes
router.post('/contact', contactEmailController.send);

module.exports = router;
