const express = require('express');
const mainController = require('../controllers/mainController');
const path = require('path');
const router = express.Router();

router.get('/', mainController.index);
router.get('/login', mainController.login);

module.exports = router;