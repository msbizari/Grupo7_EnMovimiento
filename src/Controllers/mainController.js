const express = require('express');
const path = require('path')
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController= {
    index: (req,res) => {
        let novedades = listaProductos.filter(product => product.category == 'novedad');
        let enOferta = listaProductos.filter(product => product.category == 'en-oferta');
        res.render('index',{novedades:novedades , enOferta:enOferta})},
    login: (req,res) => res.render('login'),
    register: (req,res) => res.render('register'),
    
    /* detalleDeproducto: (req,res) => res.render(path.resolve("./views/detalleDeproducto.ejs")), */
    carrito: (req,res) => {res.render('carrito')},
    administrador: (req,res) => {res.render('administrador')},
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
    
    edicionProductos: (req,res) => res.render('edicionProductos'),
    update: (req,res) => res.send('Falta hacer el código'),
    destroy: (req,res) => res.send('Falta hacer el código'),
    listadoProductos: (req,res) => 
    res.render('listadoProductos' , {listaProductos: listaProductos}),
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