const express = require('express');
const path = require('path')

const mainController= {
    index: (req,res) => res.sendFile(path.resolve("./views/index.html")),
    login: (req,res) => res.sendFile(path.resolve("./views/login.html"))
}

module.exports = mainController;