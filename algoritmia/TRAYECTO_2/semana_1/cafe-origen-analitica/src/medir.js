const { generarVentas } = require("./generador.js");

const {
    primeraVenta,
    totalVendidoInstrumentado,
    ventaMayorInstrumentada,
    totalPorCiudadInstrumentado,
} = require("./analitica.js");

const tamanos = [100, 1000, 10000, 100000];
const resultados = [];

for (const n of tamanos) {
    const ventas = generarVentas(n);

    const contadorTotal = { visitas: 0, comparaciones: 0 };
    const contadorMayor = { visitas: 0, comparaciones: 0 };
    const contadorCiudad = { visitas: 0, comparaciones: 0 };

    primeraVenta(ventas);
    totalVendidoInstrumentado(ventas, contadorTotal);
    ventaMayorInstrumentada(ventas, contadorMayor);
    totalPorCiudadInstrumentado(ventas, contadorCiudad);

    resultados.push({
        n,
        primeraVenta: 1,
        totalVendido:
            contadorTotal.visitas + contadorTotal.comparaciones,
        ventaMayor:
            contadorMayor.visitas + contadorMayor.comparaciones,
        totalPorCiudad:
            contadorCiudad.visitas + contadorCiudad.comparaciones,
    });
}

console.table(resultados);