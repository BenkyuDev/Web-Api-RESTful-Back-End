const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
// var cors = require('cors');

// // use it before all route definitions
// app.use(cors({ origin: 'http://localhost:4200' }));
const port = 8001;
require('./app/routes')(app, {}, request);
app.listen(port, () => {
    console.log('Estamos activos en' + port);
});