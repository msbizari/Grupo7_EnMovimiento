const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const session = require ('express-session');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const User = require('../database/models/User');

const usuariosFilePath = path.join(__dirname, '../data/users.json');
const listaUsuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const userController = {
    
    login: (req,res) => res.render('users/login'),
    
    register: (req,res) => res.render('users/register'),
    
    //METODO PARA CREAR USUARIO
    storeUser: (req, res) => {
        //VALIDACION ERRORES DE CARGA:
        const resultadoValidacion = validationResult(req)
        if (resultadoValidacion.errors.length >0) {
            return res.render('users/register', {
                errors: resultadoValidacion.mapped(),
                oldData: req.body
            })
        }
        
        // VALIDACION SI EXISTE USUARIO:
		db.User.findAll({
            where:{email: req.body.email}
        }).then(userFound => {
            if (userFound.length>0) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Ya existe un usuario con este email'
                    }
                },
                oldData: req.body
            })}
        else{
            //CARGA DE NUEVO USUARIO:
            let imagen;
            if (!req.file) {
                imagen = 'default-image.png'
            }else{
                imagen = req.file.filename
            }
                db.User.create({
                name: req.body.name,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                adress: req.body.address,
                email: req.body.email,
                image: imagen,
                password: bcryptjs.hashSync(req.body.password,10),
                passwordConfirme: req.body.passwordConfirm,
                newsletter: req.body.newsletter,
            }).then( function() {
                res.redirect('../')
            }) 

        }})
        
        
	},
    
    
    //INGRESO DE USUARIO Y REDIRECCIÓN A LA HOME
    loginProcess: async function(req, res) {
        
        let userToLogin = await db.User.findOne({where: {email:req.body.email}})
        
        if (userToLogin.email) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                req.session.userLogged = userToLogin;
                if(req.body.remember_me) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 * 24})
                }
            return res.redirect('/')
            }
            return res.render ('users/login', {
                errors: {
                    email: {
                        msg: 'El password no coincide con el usuario'
                    }
                }
            })
             
        }else{
            return res.render ('users/login', {
            errors: {
                email: {
                    msg: 'El email no existe'
                }
            }
        })
        }
    }, 

    logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
        
	}
}

module.exports = userController;
