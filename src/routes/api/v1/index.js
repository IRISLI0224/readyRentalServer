const express = require("express");
const router = new express.Router();
const userController = require('../../../controller/users');
const propertyController = require('../../../controller/properties');
const authController = require('../../../controller/authController');
const inspectionController = require('../../../controller/inspections');
const auth = require('../../../middleware/auth');


router.get('/users', auth, userController.index);
router.put('/users', auth, userController.update);
router.get('/users/:id',auth, userController.show);

router.get('/properties', propertyController.index);
router.get('/properties/:id', propertyController.show);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/users/:id', auth, authController.destroy);



router.get('/properties', inspectionController.index);
router.get('/properties/:id', inspectionController.show);

module.exports = router;
