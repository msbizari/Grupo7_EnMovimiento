const express = require('express');
const path = require('path')
const fs = require('fs');
const bcryptjs = require('bcryptjs')
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Product = require('../../database/models/Product');
const Category = require('../../database/models/Category');
const Brand = require('../../database/models/Brand');

const mainApiController= {
    'list': async function(req, res) {
        let products = await db.Product.findAll({
            include: [{association:"category"},{association:"brand"}]
        })
        let brands = await db.Brand.findAll({
            include: [{association:"products"}]
        })
            countByCategory = brands;
            for (let i = 0 ; i < countByCategory.length ; i++) {
                countByCategory[i].dataValues.count = countByCategory[i].products.length;
                delete countByCategory[i].dataValues.products
                    }
                   
            for (let i = 0 ; i < products.length ; i++) {
                products[i].dataValues.url = "http://localhost:3000/productos/"+products[i].id+'/detalleDeproducto';
                delete products[i].dataValues.price
                delete products[i].dataValues.image
                delete products[i].dataValues.category_id
                delete products[i].dataValues.size
                delete products[i].dataValues.discount
                delete products[i].dataValues.brand_id
                delete products[i].dataValues.category
            }
            console.log(products)
            let respuesta = {
                meta: {
                    status : 200,
                    url: 'api/productos'
                },
                data: {
                    count: products.length,
                    countByCategory : countByCategory,
                    products : products
                }
            }
            res.json(respuesta);
    }
}
    

module.exports = mainApiController;