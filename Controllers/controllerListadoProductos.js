const express = require('express');
const path = require('path')

const controllerListadoProductos = {
    listadoProductos: (req,res) => 
    res.render("listadoProductos", {  
        listaProductos = [ 
    {
        producto: 1, 
        img: 'bolso.jpg', 
        titulo: 'Bolso Unisex Sports',
        especificacionesDeProducto: "Dimensiones: Largo: 62 cm. x Ancho: 29 cm. x Alto: 36 cm. / Amplio compartimiento principal / Bolsillo lateral izquierdo con pequeño bolsillo interno de red con cierre. / Correas acolchadas para trasportar como mochila / Tira desmontable con ajuste regulable", 
        precio: "$ 6.770",
        formaDePago: "Tarjeta de Credito 3 y 6 cuotas sin interes", 
        colores: "Negro"
        
    },
    { 
        producto:2, 
        img: 'camisetaargentina.jpg', 
        titulo:"Camiseta Argentina Oficial",
        especificacionesDeProducto: "Material: 100% poliéster / Incluye firma Diego Maradona / Tecnología ClimaChill", 
        precio: "$ 230.000",
        formaDePago: "Promo Mundial: 12 cuotas sin interes / Tarjeta de todos los bancos",
        medidas: "Talles: XS - S - L - M - XL", 
        colores: "Color: Blanco/Celeste/Azul/Dorado"


    }, 
    {   producto:3, 
        img: 'pesas.jpg', 
        titulo: 'Kit de 2 Mancuernas',
        especificacionesDeProducto: "Material: metal / Peso Máximo: 10 kg.", 
        precio: "$ 70.500",
        formaDePago: "Efectivo o Tarjeta de Credito en un pago", 
        colores: "Color: Blanco/Celeste/Azul/Dorado"

    }, 

    {   producto:4, 
        img: 'zapatillas.jpg', 
        titulo: 'Zapatillas Air Pegasus 47',
        especificacionesDeProducto: "Beneficios: Amortiguación, Composición: Capellada: Malla y Sintético / Suela: Goma, Caña: Baja / Ajuste: Con Cordones /Tecnología: Flywire",
        precio: "$ 23.200",
        formaDePago: " 3 y 6 cuotas sin interes", 
        tallesZapatillas: "36 - 38 - 40 - 44", 
        colores: "Verde / Azul", 

    }
], 
}), 



}

module.exports = controllerListadoProductos; 