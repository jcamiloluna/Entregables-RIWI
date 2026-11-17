const ventas = require("./datos.js");
const {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
} = require("./analitica.js");

const unaVenta = [ventas[0]];
const sinVentas = [];

console.log("=== Arreglo completo ===");
console.log("valorVenta (primera venta):", valorVenta(ventas[0]));
console.log("totalVendido:", totalVendido(ventas));
console.log("unidadesVendidas:", unidadesVendidas(ventas));
console.log("ventaMayor:", ventaMayor(ventas));
console.log("ticketPromedio:", ticketPromedio(ventas));
console.log("ventasPorCiudad Medellín:", ventasPorCiudad(ventas, "Medellín"));

console.log("=== Una venta ===");
console.log("valorVenta:", valorVenta(unaVenta[0]));
console.log("totalVendido:", totalVendido(unaVenta));
console.log("unidadesVendidas:", unidadesVendidas(unaVenta));
console.log("ventaMayor:", ventaMayor(unaVenta));
console.log("ticketPromedio:", ticketPromedio(unaVenta));
console.log("ventasPorCiudad Medellín:", ventasPorCiudad(unaVenta, "Medellín"));

console.log("=== Arreglo vacío ===");
console.log("totalVendido:", totalVendido(sinVentas));
console.log("unidadesVendidas:", unidadesVendidas(sinVentas));
console.log("ventaMayor:", ventaMayor(sinVentas));
console.log("ticketPromedio:", ticketPromedio(sinVentas));
console.log("ventasPorCiudad Medellín:", ventasPorCiudad(sinVentas, "Medellín"));