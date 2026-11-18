//entender lo que queremos construir - playlist con canciones y buscaremos una canción - Let: crear una lita
let canciones = [
    "Hotel California",
    "Bohemia",
    "Gasolina",
    "Un Cafecito",
    "Thriller"
];

//revisar canción por canción. Debemos saber en que canción vamos - comenzamos primera cancion, vamos a segunda
let i = 0;

//decirle que continue buscando (canciones.length indica cuantas canciones hay)
while (i < canciones.length) {
}

//muestra la posición actual
console.log(canciones[i])

//decirle que avance a la siguiente 
i++;

//poner condición de busqueda, lea si no es, siga a la siguiente y cuando la encuentre se detenga
let buscada = "Un Cafecito";

//break detiene un while inmediatamente
while (i < canciones.length) {
    if (canciones[i] == buscada) {
        console.log("canción encontrada", "la cancion encontrada es ", canciones[i]);
        break;
    }
    i++;
}

//break. detiene el while, == comparador logico, if si se cumple algo



