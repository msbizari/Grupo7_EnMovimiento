const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const session = require ('express-session');

const usuariosFilePath = path.join(__dirname, '../data/users.json');
const listaUsuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const userController = {
    
    login: (req,res) => res.render('users/login'),
    
    register: (req,res) => res.render('users/register'),
    
    //METODO PARA CREAR USUARIO
    storeUser:(req, res) => {
        //VALIDACION ERRORES DE CARGA:
        const resultadoValidacion = validationResult(req)
        if (resultadoValidacion.errors.length >0) {
            return res.render('users/register', {
                errors: resultadoValidacion.mapped(),
                oldData: req.body
            })
        }
        
        // VALIDACION SI EXISTE USUARIO:
        let userFound = listaUsuarios.find(oneUser => oneUser.email === req.body.email)
		if (userFound) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Ya existe un usuario con este email'
                    }
                },
                oldData: req.body
            });
        }
        
        //CARGA DE NUEVO USUARIO:
        let ultimoUsuario = listaUsuarios[listaUsuarios.length -1];
        let nuevoUsuario = {
            id: ultimoUsuario.id + 1,
            ...req.body,
            password: bcryptjs.hashSync(req.body.password,10)
        }
		let imagen;
		if (!req.file) {
			imagen = 'default-image.png'
		}else{
			imagen = req.file.filename
		}
		nuevoUsuario.image = imagen;
		listaUsuarios.push(nuevoUsuario);
		let nuevosUsuarios = JSON.stringify(listaUsuarios, null, " ");
		fs.writeFileSync(usuariosFilePath,nuevosUsuarios)
		
		res.redirect('../')
	},
    
    
    //INGRESO DE USUARIO - REDIRECCIÓN A LA HOME
    loginProcess: (req, res) => {
        console.log(listaUsuarios);
        let userToLogin = listaUsuarios.find(oneUser => oneUser.email === req.body.email)

        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                req.session.userLogged = userToLogin;
                if(req.body.remember_me) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 * 24})
                }
            return res.redirect('/')
            } else {
            return res.render ('users/login', {
                errors: {
                    email: {
                        msg: 'El email no se encuentra registrado'
                    }
                }
            })
            }
        }
    }, 

    logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
        
	}
}

module.exports = userController;
