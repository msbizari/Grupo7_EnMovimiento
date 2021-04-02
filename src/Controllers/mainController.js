const express = require('express');
const path = require('path')
const fs = require('fs');
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const session = require ('express-session'); //es necesario requerirlo acá? o en el app.js es suficiente?

const productsFilePath = path.join(__dirname, '../data/products.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usuariosFilePath = path.join(__dirname, '../data/users.json');
const listaUsuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const User = {
	fileName: './database/users.json'}

const mainController= {
    index: (req,res) => {
        let novedades = listaProductos.filter(product => product.category == 'novedad');
        let enOferta = listaProductos.filter(product => product.category == 'en-oferta');
        res.render('index',{novedades:novedades , enOferta:enOferta})},
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
        //let userToLogin = listaUsuarios.findByField('email, req.body.email')
        let userToLogin = listaUsuarios.find(oneUser => oneUser.email === req.body.email)
        if (userToLogin) {
            return res.redirect('/')
        } else {
            return res.render ('/users/login', {
                errors: {
                    email: {
                        msg: 'El email no se encuentra registrado'
                    }
                }
            })
        }
        
    },
    carrito: (req, res) => { res.render ('carrito') },
    
    administrador: (req,res) => {res.render('users/administrador')},
    //METODO PARA CREAR PRODUCTO
    store: (req, res) => {
		let nuevoProducto = req.body;
		nuevoProducto.id = listaProductos.length + 1;
		let imagen;
		if (!req.file) {
			imagen = 'default-image.png'
		}else{
			imagen = req.file.filename
		}
		nuevoProducto.image = imagen;
		listaProductos.push(nuevoProducto);
		let nuevosProductos = JSON.stringify(listaProductos, null, " ");
		fs.writeFileSync(productsFilePath,nuevosProductos)
		
		res.redirect('/')
	},
    
    edicionProductos: (req,res) => 	{let productToEdit = listaProductos.find(producto => producto.id == req.params.id);
    res.render('edicionProductos', {productToEdit, toThousand})},
    update: (req,res) => {let id = req.params.id;
    let productToEdit = listaProductos.find(product => product.id == id)
    let image
    if(req.file != undefined){
        image = req.file.filename
    } else {
        image = productToEdit.image
    }

    productToEdit = {
        id: productToEdit.id,
        ...req.body,
        image: image,
    };
    
    let nuevosProductos = listaProductos.map(product => {
        if (product.id == productToEdit.id) {
            return product = {...productToEdit};
        }
        return product;
    })

    fs.writeFileSync(productsFilePath, JSON.stringify(nuevosProductos, null, ' '));
    res.redirect('/');
},

    destroy: (req,res) =>{
		let id = req.params.id;
		let finalProducts = listaProductos.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	},
    listadoProductos: (req,res) => 
    res.render('users/listadoProductos' , {listaProductos: listaProductos}),
    detalleDeproducto: (req,res) => {
        let productoid = Number(req.params.id);
        let productoBuscado = {};
        for (let i = 0; i < listaProductos.length; i++) {
            if (productoid == listaProductos[i].id) {
                productoBuscado = listaProductos[i];
            }
        }      
        res.render('detalleDeproducto', {producto:productoBuscado, listaProductos: listaProductos});
    }
}

module.exports = mainController;
