const ventas = require("./datos.js");

const {
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventasPorCiudad,
    ventasPorCiudadM,
} = require("./analitica.js");

function verificar(nombre, resultadoCiclo, resultadoMetodo) {
    const estado = resultadoCiclo === resultadoMetodo ? "OK" : "DIFERENTE";
    console.log(`${nombre}: ${estado}`);
    console.log(`  Ciclo: ${resultadoCiclo}`);
    console.log(`  Método: ${resultadoMetodo}`);
}

verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Unidades vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

verificar(
    "Ventas en Medellín",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);