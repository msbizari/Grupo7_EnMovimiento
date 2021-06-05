const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const session = require ('express-session');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const User = require('../../database/models/User');

const userApiController= {
    
}

module.exports = userApiController;