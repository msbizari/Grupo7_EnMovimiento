const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {body} = require('express-validator')

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
const validations = [
    body('lastName').notEmpty().withMessage('Debe escribir un apellido'),
    body('email').notEmpty().withMessage('Debe escribir un email'),
    body('password').notEmpty().withMessage('Debe escribir un password'),
]
router.post('/', upload.single('myfile'), validations, mainController.storeUser);

router.get('/administrador', mainController.administrador);
router.get('/edicionProductos', mainController.edicionProductos);

//PARA HACER LOGINPROCESS DE LOS USARIOS//
router.post('/login', mainController.loginProcess);


module.exports = router;
