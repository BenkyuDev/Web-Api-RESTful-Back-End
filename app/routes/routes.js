module.exports = function(app, db, request) {

    app.get('/cotizacion/:moneda', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.responseType = 'json';
        const moduleMoneda = require('../model/moneda');
        let moneda = req.params.moneda;

        let dolar = new moduleMoneda.Dolar();
        let euro = new moduleMoneda.Euro();
        let real = new moduleMoneda.Real();

        let cotizacion = new moduleMoneda.cotizacion();
        switch (moneda.toUpperCase()) {
            case "DOLAR":
                cotizacion.setStrategy(dolar);
                cotizacion.calculate(request, res);
                break;
            case "EURO":
                cotizacion.setStrategy(euro);
                cotizacion.calculate(request, res);
                break;
            case "REAL":
                cotizacion.setStrategy(real);
                cotizacion.calculate(request, res);

                break;

            default:
                res.send('No se encontro la moneda.');
                break;
        }

    });
};