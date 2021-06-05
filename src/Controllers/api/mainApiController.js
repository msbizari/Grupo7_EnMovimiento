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
    
}

module.exports = mainApiController;