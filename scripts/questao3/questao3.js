var array = [2, 1, 3, 5, 3, 2];

console.log(locateDuplicate(array));

removeDuplicate(array);

console.log(`Array sem valores duplicados: ${removeDuplicate(array)}`);

function removeDuplicate(array) {
    var novoArray = [];

    for (let i = 0; i < array.length; i++) {
        // - Se o indexOf não resultar em -1, quer dizer que o valor já existe no novo array.
        // - Se isto ocorrer, o valor não deve ser inserido,
        // pois este novo array não deve possuir valores duplicados.
        if(novoArray.indexOf(array[i]) == -1) {
            novoArray.push(array[i]);
        }
    }
    return novoArray;    
}

function locateDuplicate(array) {
    let duplicados = identificarDuplicados(array);

    if(duplicados.length == 0) { // Se não houverem elementos duplicados..
        return -1; // .. a função retornará -1
    }
    /*
     - A iteração ocorrerá sobre o array do final ao início.
     - Conforme forem sendo encontrados valores que sejam duplicados,
     serão removidos de duplicados.
     - Os valores serão removidos até só restar um, 
     que será o duplicado de menor índice.
    */
    for(let i = array.length - 1; duplicados.length > 1; i--) {

        let indexDuplicado = duplicados.indexOf(array[i])
        if(indexDuplicado != -1) {
            duplicados.splice(indexDuplicado, 1);
        }
    }

    return duplicados[0];
}

// Método usado para gerar um array com os valores 
// duplicados com base no array passado por parâmetro
function identificarDuplicados(array) {
    duplicados = [];
    for (let i = 0; i < array.length; i++) {
        // Verifica se o valor é duplicado e se ele já não está no array de duplicados
        if((array.indexOf(array[i]) != array.lastIndexOf(array[i]))
        && (duplicados.indexOf(array[i]) == -1)) {
            duplicados.push(array[i]);
        }
    }
    console.log(`Valores duplicados no array: ${duplicados}`);
    return duplicados;
}