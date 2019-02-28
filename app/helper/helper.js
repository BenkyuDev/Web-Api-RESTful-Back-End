module.exports.getMoney = function(error, response, body) {
    if (!error && response.statusCode == 200) {
        let objResponse = JSON.parse(response.body);
        let moneda = objResponse.result.source;
        let precio = objResponse.result.amount.toString();
        let obj = { "moneda": moneda, "precio": precio };
        return JSON.stringify(obj);

    }
};