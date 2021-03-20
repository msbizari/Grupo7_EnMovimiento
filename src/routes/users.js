const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();
const path = require('path');
const multer = require('multer');


router.get('/login', mainController.login);
router.get('/register', mainController.register);
//MULTER PARA USUARIOS:
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/usuarios')
    }, 
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' +  Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage : storage });
router.post('/', upload.single('myfile'), mainController.storeUser);

router.get('/administrador', mainController.administrador);
router.get('/edicionProductos', mainController.edicionProductos);


module.exports = router;
