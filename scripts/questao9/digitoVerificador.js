console.log(digitoVerificador("1111"));

/**
* @prop {string} clientId:
* @return {number} The check digit.
*/
function digitoVerificador(clientId) {
    // Enquanto a string do clientId não for igual a 1 (um dígito)
    while(clientId.length > 1) {
        // Digito de verificação deve ser reinicializado sempre que clientId tiver mais de um dígito
        var digitoVerificacao = 0;

        // Cada dígito em clientId será convertido em número e somado ao dígito de verificação
        for (let i = 0; i < clientId.length; i++) {
            digitoVerificacao += Number(clientId[i]);
        }

        // A próxima string com dígitos a serem somados
        clientId = String(digitoVerificacao);
    }

    return digitoVerificacao;
}
