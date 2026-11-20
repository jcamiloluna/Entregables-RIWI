const assert = require("node:assert/strict");
const ventas = require("./datos.js");
const { totalPorCiudad, ventasDelDia, ticketPromedio } = require("./analitica.js");

// Caso 1: espacios y mayúsculas distintas no deben crear dos grupos.
const ventasBogota = [
  { ciudad: "Bogotá", cantidad: 1, precio: 100 },
  { ciudad: "Bogotá ", cantidad: 2, precio: 50 },
];
const resumenCiudades = totalPorCiudad(ventasBogota);
assert.deepEqual(resumenCiudades, { "bogotá": 200 });
console.log("OK: Bogotá y Bogotá con espacio quedan en un solo grupo.");

// Caso 2: una fecha sin ventas debe producir ticket promedio 0, nunca NaN.
const ventasFechaVacia = ventasDelDia(ventas, "1900-01-01");
assert.equal(ventasFechaVacia.length, 0);
assert.equal(ticketPromedio(ventasFechaVacia), 0);
assert.equal(Number.isNaN(ticketPromedio(ventasFechaVacia)), false);
console.log("OK: un día sin ventas devuelve ticket promedio 0, no NaN.");
