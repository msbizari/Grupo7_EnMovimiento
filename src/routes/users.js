const express = require('express');
const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {body} = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Formulario de Login 
router.get('/login', guestMiddleware, userController.login);

//Formulario de Registro
router.get('/register', guestMiddleware, userController.register);

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

router.post('/', upload.single('myfile'), validations, userController.storeUser);

//solo para autorizados
router.get('/administrador', authMiddleware, mainController.administrador); //quedó ligado al mainController

//solo para autorizados - edicion de productos
//router.get('/edicionProductos', authMiddleware, mainController.edicionProductos);

//PARA HACER LOGINPROCESS DE LOS USARIOS//
router.post('/login', userController.loginProcess);

// Logout
router.get('/logout/', userController.logout);


module.exports = router;
