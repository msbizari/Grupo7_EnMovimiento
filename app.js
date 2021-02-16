const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes/main');
const app = express();

const publicPath = path.resolve(__dirname , './public')

app.use(bodyParser.urlencoded({ extended: true }));
app.use( express.static (publicPath) );

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));

app.use('/', mainRoutes);
app.use('/login', mainRoutes);

/* app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
}) */

app.get('/detalleDeProducto', (req,res)=>{
    res.sendFile(path.resolve(__dirname + '/views/detalleDeproducto.html'));
});

app.get('/register', (req,res)=>{
    res.sendFile(path.resolve(__dirname + '/views/register.html'));
});

/* app.get('/login', (req,res)=>{
    res.sendFile(path.resolve(__dirname + '/views/login.html'));
}); */

app.get('/carrito', (req,res)=>{
    res.sendFile(path.resolve(__dirname + '/views/carrito.html'));
});
app.post('/register', (req,res) => {
    res.send(req.body);
})
app.post('/login', (req,res) => {
    res.send(req.body);
})
