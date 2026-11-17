const ventas = require("./datos.js");

// Cantidad de registros
console.log("Cantidad de registros:", ventas.length);

// Primer registro
console.log("Primer registro:", ventas[0]);

// Último registro
console.log("Último registro:", ventas[ventas.length - 1]);

// Producto del registro en la posición 4
console.log("Producto en la posición 4:", ventas[4].producto);

// Tabla completa
console.table(ventas);