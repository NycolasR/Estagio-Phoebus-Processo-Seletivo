var x;
var a = [1, 2, 3, x, 8, 9];
var b = [x, 6, 5, 4];

identificarValorDeX(x);

console.log("Arrays atualizados:")
console.log(a);
console.log(b);

function identificarValorDeX(valorX) {
    var somatoriaArrayA = somatoriaElementosDoArray(a, valorX); // == 23
    console.log(`somatoriaArrayA: ${somatoriaArrayA}`);
    var somatoriaArrayB = somatoriaElementosDoArray(b, valorX); // == 15
    console.log(`somatoriaArrayB: ${somatoriaArrayB}`);

    valorXarrayA = 30 - somatoriaArrayA; // == 7
    console.log(`Valor de X no array A: ${valorXarrayA}`);

    valorXarrayB = 22 - somatoriaArrayB; // == 7
    console.log(`Valor de X no array B: ${valorXarrayB}`);
    
    atualizarArrayComNovoValorDeX(a, valorXarrayA);
    atualizarArrayComNovoValorDeX(b, valorXarrayB);
}

// Para evitar a duplicação de código,
// abstraí a lógica que faz a atualização dos
// valores dos arrays com o novo valor de x para uma função.
function atualizarArrayComNovoValorDeX(array, valorX) {
    for (let i = 0; i < array.length; i++) {
        if(array[i] == undefined) {
            array[i] = valorX;
        }
    }
}

// Para evitar a duplicação de código,
// abstraí a lógica que faz a soma dos
// valores dos arrays para uma função.
function somatoriaElementosDoArray(array, valorX) {
  var somatoria = 0;

  array.forEach((valor) => {
    if(valor !== valorX) {
      somatoria += valor;
    }
  });

  return somatoria;
}