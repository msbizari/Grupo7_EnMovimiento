const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/administrador', mainController.administrador);

module.exports = router;
