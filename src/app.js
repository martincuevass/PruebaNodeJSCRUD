const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json()); 

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'crudnodejs'
}, 'single'));


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));


const personaldataRoutes = require('./routes/data');
app.use('/', personaldataRoutes);


app.listen(port, 'localhost', (err) => {
    if (err) {
        console.error('Error al iniciar el servidor:', err);
        return;
    }
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
