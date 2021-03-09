const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();
const path = require('path')
const multer = require('multer');

router.get('/carrito', mainController.carrito);


/*** GET ALL PRODUCTS ***/ 
router.get('/', mainController.listadoProductos); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', mainController.administrador); 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images')
    }, 
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' +  Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage : storage });
router.post('/', upload.single('myfile'), mainController.store);


/*** GET ONE PRODUCT ***/ 
router.get('/:id/detalleDeproducto', mainController.detalleDeproducto); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', mainController.edicionProductos); 
router.patch('/:id', upload.single('image'), mainController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', mainController.destroy); 



module.exports = router;