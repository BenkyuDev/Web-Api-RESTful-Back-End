const moduleHelper = require('../helper/helper');
var cotizacion = function() {
    this.moneda;
};

cotizacion.prototype = {
    setStrategy: function(moneda) {
        this.moneda = moneda;
    },

    calculate: function(request, res) {
        return this.moneda.calculate(request, res);
    }
};
module.exports.cotizacion = cotizacion;
module.exports.Dolar = function() {
    this.calculate = function(request, res) {
        request.get('https://api.valuta.money/v1/quotes/' + 'USD' + '/ARS/json?quantity=1&key=1776|ROQWAVhhdbvZYz9kVBz6QzLeo8ooNjM~', function(error, response, body) {
            res.send(moduleHelper.getMoney(error, response, body));
        })
    }
};

module.exports.Euro = function() {
    this.calculate = function(request, res) {
        request.get('https://api.valuta.money/v1/quotes/' + 'EUR' + '/ARS/json?quantity=1&key=1776|ROQWAVhhdbvZYz9kVBz6QzLeo8ooNjM~', function(error, response, body) {
            res.send(moduleHelper.getMoney(error, response, body));
        })
    }
};

module.exports.Real = function() {
    this.calculate = function(request, res) {
        request.get('https://api.valuta.money/v1/quotes/' + 'BRL' + '/ARS/json?quantity=1&key=1776|ROQWAVhhdbvZYz9kVBz6QzLeo8ooNjM~', function(error, response, body) {
            res.send(moduleHelper.getMoney(error, response, body));
        })
    }
};