const express = require('express');
const path = require('path')
const fs = require('fs');
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Product = require('../database/models/Product');
const Category = require('../database/models/Category');
const Color = require('../database/models/Color');
const Brand = require('../database/models/Brand');

const Products = db.Product;
const Categorys = db.Category;
const Colors = db.Color
const Brands = db.Brand

const productsFilePath = path.join(__dirname, '../data/products.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const User = {
	fileName: './database/users.json'}

const mainController= {
    index: async function(req,res) {
        /* let novedades = listaProductos.filter(product => product.category == 'novedad');
        let enOferta = listaProductos.filter(product => product.category == 'en-oferta'); */
        
         let novedades = await db.Product.findAll({
            include:[{association:"category"},{association:"brand"},{association:"colors"}],
            /* nest : true, */
            where: {
            category_id: "1"
            }
            
        })
        let enOferta = await db.Product.findAll({
            include:[{association:"category"},{association:"brand"},{association:"colors"} ],
            where: {
            category_id: "2"
            }
        })
    
        res.render('index',{novedades:novedades , enOferta:enOferta})},
     
    carrito: (req, res) => { res.render ('carrito') },
    
    administrador: async (req,res) => {
        let allBrands = await db.Brand.findAll();
        let allCategories = await db.Category.findAll();
        console.log(allCategories)
        res.render('users/administrador', {allBrands, allCategories})},
        
    //METODO PARA CREAR PRODUCTO
    store: async function (req, res) {

		if (!req.file) {
			imagen = 'default-image.png'
		}else{
			imagen = req.file.filename
		}


            await db.Product.create({
                name:req.body.name,
                description: req.body.description,
                price: req.body.price,
                discount: req.body.discount,
                image:imagen,
                category_id: req.body.category_id,
                size:req.body.size,
                brand_id: req.body.brand_id,
            }); 
            res.redirect('/');
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
