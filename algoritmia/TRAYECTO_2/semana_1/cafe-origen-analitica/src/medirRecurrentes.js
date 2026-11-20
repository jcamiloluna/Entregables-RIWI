const { performance } = require("node:perf_hooks");
const { generarVentas } = require("./generador.js");
const { clientesRecurrentes } = require("./analitica.js");

const tamanos = [1000, 2000, 4000, 8000, 16000];
const resultados = [];

for (const n of tamanos) {
    const ventas = generarVentas(n);
    const etiqueta = `clientesRecurrentes n=${n}`;

    console.time(etiqueta);
    const inicio = performance.now();

    const recurrentes = clientesRecurrentes(ventas);

    const fin = performance.now();
    console.timeEnd(etiqueta);

    resultados.push({
        n,
        clientesRecurrentes: recurrentes.length,
        tiempoMs: Number((fin - inicio).toFixed(3)),
    });
}

console.table(resultados);