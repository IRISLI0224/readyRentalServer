const express = require('express');

const router = new express.Router();
const userController = require('../../../controller/users');
const propertyController = require('../../../controller/properties');

router.get('/users', userController.index);
router.post('/users', userController.store);
router.delete('/users', userController.destroy);
router.put('/users', userController.update);
router.get('/users/:id', userController.show);

router.get('/properties', propertyController.index);
router.get('/properties/:id', propertyController.show);

module.exports = router;
