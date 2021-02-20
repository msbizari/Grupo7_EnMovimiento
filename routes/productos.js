const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get('/detalleDeproducto', mainController.detalleDeproducto);
router.get('/carrito', mainController.carrito);

module.exports = router;