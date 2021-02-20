const express = require('express');
const path = require('path')

const mainController= {
    index: (req,res) => res.render(path.resolve("./views/index.ejs")),
    login: (req,res) => res.render(path.resolve("./views/login.ejs")),
    register: (req,res) => res.render(path.resolve("./views/register.ejs")),
    detalleDeproducto: (req,res) => res.render(path.resolve("./views/detalleDeproducto.ejs")),
    carrito: (req,res) => res.render(path.resolve("./views/carrito.ejs")),
}

module.exports = mainController;