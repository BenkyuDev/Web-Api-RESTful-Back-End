const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const port = 8002;
require('./app/routes')(app, {}, request);
app.listen(port, () => {
    console.log('Estamos activos en el puerto ' + port);
});