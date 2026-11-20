let array_num = [];
array_num.push(3, 2, 7, 1, 0);

console.log(array_num[array_num.length - 1]);

//const numeros = [3, 2, 7, 1, 0];

const ultimo = numeros.pop();

console.log(ultimo);
console.log(numeros);

//const numeros = [3, 2, 7, 1, 0];
const sinsiete = numeros.filter(numero => numero !== 7);
console.log(sinsiete)

Valor: 3, 2, 7, 1, 0
Índice: 0, 1, 2, 3, 4

//borbuja
let numeros = [3, 2, 7, 1, 0];
for (let j = 0; j < numeros.length - 1; j++) {
    for (let i = 0; i < numeros.length - 1 - j; i++) {
        if (numeros[i] > numeros[i + 1]) {
            let temporal = numeros[i];
            numeros[i] = numeros[i + 1];
            numeros[i + 1] = temporal;
        }
    }
}

console.log(numeros);




