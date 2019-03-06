const moduleHelper = require('../helper/helper');
var cotizacion = function() {
    this.moneda;
};

cotizacion.prototype = {
    setStrategy: function(moneda) {
        this.moneda = moneda;
    },

    calculate: function(request, res, objetos) {
        return this.moneda.calculate(request, res, objetos);
    }
};
module.exports.cotizacion = cotizacion;
module.exports.Dolar = function() {
    this.calculate = async function(request, res, finalData) {
        function getBodyDolar(path) {
            return new Promise((resolve, reject) => {
                request.get(path, (err, resp, body) => {
                    if (err) {
                        return reject(moduleHelper.procesarError(err));
                    } else {
                        return resolve(moduleHelper.procesarRespuesta(resp.body));
                    }
                })
            })
        }

        await getBodyDolar('https://api.valuta.money/v1/quotes/USD/ARS/json?quantity=1&key=1776|ROQWAVhhdbvZYz9kVBz6QzLeo8ooNjM~').then(
            valorResolve => finalData.push(valorResolve)).catch(err => finalData.push(err));
    }
};

module.exports.Euro = function() {
    this.calculate = async function(request, res, finalData) {
        function getBodyEuro(path) {
            return new Promise((resolve, reject) => {
                request.get(path, (err, resp, body) => {
                    if (err) {
                        return reject(moduleHelper.procesarError(err));
                    } else {
                        return resolve(moduleHelper.procesarRespuesta(resp.body));
                    }
                })
            })
        }

        await getBodyEuro('https://api.valuta.money/v1/quotes/EUR/ARS/json?quantity=1&key=1776|ROQWAVhhdbvZYz9kVBz6QzLeo8ooNjM~').then(
            valorResolve => finalData.push(valorResolve)).catch(err => finalData.push(err));
    }
};

module.exports.Real = function() {
    this.calculate = async function(request, res, finalData) {
        function getBodyReal(path) {
            return new Promise((resolve, reject) => {
                request.get(path, (err, resp, body) => {
                    if (err) {
                        return reject(moduleHelper.procesarError(err));
                    } else {
                        return resolve(moduleHelper.procesarRespuesta(resp.body));
                    }
                })
            })
        }

        await getBodyReal('https://api.valuta.money/v1/quotes/BRL/ARS/json?quantity=1&key=1776|ROQWAVhhdbvZYz9kVBz6QzLeo8ooNjM~').then(
            valorResolve => finalData.push(valorResolve)).catch(err => finalData.push(err));
    }
};