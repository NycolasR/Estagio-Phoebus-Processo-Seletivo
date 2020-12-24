const a = [17, 26, 30];
var classificacaoMaria = a;

const b = [17, 27, 30];
var classificacaoJoao = b;

try{
    let pontuacao = compareElements(classificacaoMaria, classificacaoJoao);
    console.log(pontuacao);
} catch(err) {
    console.log(err);
}

function compareElements(a, b) {
    // Lança exceção caso as classificações não possuam a mesma quantidade de valores
    if(a.length != b.length) {
        throw "[ERRO] Não é possível comparar estas classificações de desafios," +
        " pois não possuem a mesma quantidade de valores."
    }

    let pontosA = 0; // Pontuação de Maria
    let pontosB = 0; // Pontuação de João

    for (let i = 0; i < a.length; i++) {
        if(a[i] > b[i]) {
            pontosA++;
        } else if (a[i] < b[i]) {
            pontosB++;
        }
        // Para classificações iguais, não há pontuação
    }

    return [pontosA, pontosB];
}