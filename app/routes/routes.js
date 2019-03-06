const moduleHelper = require('../helper/helper');
// CON LIBRERIA
const rp = require('request-promise');


module.exports = function(app, db, request) {

    app.get("/", async function(req, res) {
        // CON LIBRERIA ASYNC y AWAIT
        let finalData = [];
        await rp("https://api.valuta.money/v1/quotes/EUR/ARS/json?quantity=1&key=1776|ROQWAVhhdbvZYz9kVBz6QzLeo8ooNjM~").then(result => {
            finalData.push(moduleHelper.procesarRespuesta(result));

        }).catch(err => {
            console.log(err);
            finalData.push(moduleHelper.procesarError(err.error));

        });
        await rp("https://api.valuta.money/v1/quotes/USD/ARS/json?quantity=1&key=1776|ROQWAVhhdbvZYz9kVBz6QzLeo8ooNjM~").then(result => {

            finalData.push(moduleHelper.procesarRespuesta(result));

        }).catch(err => {
            finalData.push(moduleHelper.procesarError(err.error));

        });

        await rp({ uri: "https://api.valuta.money/v1/quotes/BRL/ARS/json?quantity=1&key=1776|ROQWAVhhdbvZYz9kVBz6QzLeo8ooNjM~", resolveWithFullResponse: true }).then(response => {
            finalData.push(moduleHelper.procesarRespuesta(response.body));

        }).catch(err => {
            finalData.push(moduleHelper.procesarError(err.error));
        });

        res.send(finalData);

    });



    //FORMA SIN LIBRERIA CON PROMESAS, ASYNC Y AWAIT
    //PATRON DE DISEÑO STRATEGY
    app.get('/cotizaciones/todas', async(req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.responseType = 'json';
        const moduleMoneda = require('../model/moneda');
        let moneda = req.params.monedas;
        let finalData = [];

        let dolar = new moduleMoneda.Dolar();
        let euro = new moduleMoneda.Euro();
        let real = new moduleMoneda.Real();

        let cotizacion = new moduleMoneda.cotizacion();

        cotizacion.setStrategy(dolar);
        await cotizacion.calculate(request, res, finalData);

        cotizacion.setStrategy(euro);
        await cotizacion.calculate(request, res, finalData);

        cotizacion.setStrategy(real);
        await cotizacion.calculate(request, res, finalData);
        res.send(finalData);
    });


    app.get('/cotizacion/:moneda', async(req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.responseType = 'json';
        const moduleMoneda = require('../model/moneda');
        let moneda = req.params.moneda;
        let finalData = [];

        let dolar = new moduleMoneda.Dolar();
        let euro = new moduleMoneda.Euro();
        let real = new moduleMoneda.Real();

        let cotizacion = new moduleMoneda.cotizacion();
        switch (moneda.toUpperCase()) {
            case "DOLAR":
                cotizacion.setStrategy(dolar);
                await cotizacion.calculate(request, res, finalData);
                res.send(finalData);
                break;
            case "EURO":
                cotizacion.setStrategy(euro);
                await cotizacion.calculate(request, res, finalData);
                res.send(finalData);
                break;
            case "REAL":
                cotizacion.setStrategy(real);
                await cotizacion.calculate(request, res, finalData);
                res.send(finalData);

                break;

            default:
                res.send('No se encontro la moneda.');
                break;
        }

    });
};