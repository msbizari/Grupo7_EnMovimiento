const express = require('express');
const path = require('path')
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController= {
    index: (req,res) => {
        let novedades = listaProductos.filter(product => product.category == 'novedad');
        let enOferta = listaProductos.filter(product => product.category == 'en-oferta');
        res.render('index',{novedades:novedades , enOferta:enOferta})},
    login: (req,res) => res.render('login'),
    register: (req,res) => res.render('register'),
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
    }, 

        destroy : (req, res) => {
            let id = req.params.id;
            let finalProducts = products.filter(product => product.id != id);
            fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
            res.redirect('/');
        }
    };
    

module.exports = mainController;
