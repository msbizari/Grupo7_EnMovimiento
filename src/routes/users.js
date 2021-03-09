const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();
const path = require('path');


router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/administrador', mainController.administrador);
router.get('/edicionProductos', mainController.edicionProductos);


module.exports = router;
