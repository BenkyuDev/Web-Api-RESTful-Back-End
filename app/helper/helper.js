module.exports.procesarRespuesta = procesarRespuesta;

function procesarRespuesta(resp) {
    let objResponse = JSON.parse(resp);
    let moneda = objResponse.result.source;
    let precio = objResponse.result.amount.toString();
    let obj = { "moneda": moneda, "precio": precio };
    return obj;
}
module.exports.procesarError = procesarError;

function procesarError(err) {
    let objResponse = err;
    let error = objResponse;
    let objErr = { "error": error.code };
    return objErr;

}