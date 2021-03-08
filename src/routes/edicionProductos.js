// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
// ************ Controller Require ************
const edicionProductosController = require('../controllers/edicionProductosController');


// Multer
const storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 
     cb(null, './public/images/edicionProductos'); 
  }, 
  filename: function (req, file, cb) { 
     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);  
  } 
})

/*** PROBANDO***/ 
var upload = multer({ storage: storage })

/*** GET ALL PRODUCTS ***/ 
router.get('/', edicionProductosController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', edicionProductosController.create); 
router.post('/', upload.single('image'), edicionProductosController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', edicionProductosController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edicionProductosController.edit); 
router.put('/:id', upload.single('image'), edicionProductosController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', edicionProductosController.destroy); 


module.exports = router;

