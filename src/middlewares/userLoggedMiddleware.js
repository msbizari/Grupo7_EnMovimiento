const path = require('path')
const fs = require('fs');
const usuariosFilePath = path.join(__dirname, '../data/users.json');
const listaUsuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	
    let userFromCookie = listaUsuarios.find(oneUser => oneUser.email === req.cookies.userEmail);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;