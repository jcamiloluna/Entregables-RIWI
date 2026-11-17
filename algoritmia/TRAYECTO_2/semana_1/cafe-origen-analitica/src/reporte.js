const ventas = require("./datos.js");

const {
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
} = require("./analitica.js");

function pesos(valor) {
    return `$ ${valor.toLocaleString("es-CO")}`;
}

function indicador(etiqueta, valor) {
    console.log(`${etiqueta.padEnd(24)} ${valor}`);
}

console.log("==================================================");
console.log("                 REPORTE CAFÉ ORIGEN");
console.log("==================================================");

console.log("\nRESUMEN GENERAL");
console.log("--------------------------------------------------");
indicador("Total vendido:", pesos(totalVendido(ventas)));
indicador(
    "Unidades vendidas:",
    unidadesVendidas(ventas).toLocaleString("es-CO")
);
indicador("Ticket promedio:", pesos(ticketPromedio(ventas)));

const mayor = ventaMayor(ventas);

if (mayor === null) {
    indicador("Venta más grande:", "No hay ventas válidas");
} else {
    indicador(
        "Venta más grande:",
        `${mayor.producto} — ${pesos(mayor.cantidad * mayor.precio)}`
    );
}

console.log("\nVENTAS POR CIUDAD");
console.log("--------------------------------------------------");

const ciudades = totalPorCiudad(ventas);
console.table(
    Object.entries(ciudades).map(([ciudad, total]) => ({
        Ciudad: ciudad,
        "Total vendido": pesos(total),
    }))
);

console.log("\nUNIDADES POR PRODUCTO");
console.log("--------------------------------------------------");

const unidades = unidadesPorProducto(ventas);
console.table(
    Object.entries(unidades).map(([producto, cantidad]) => ({
        Producto: producto,
        Unidades: cantidad.toLocaleString("es-CO"),
    }))
);

console.log("\nTOP 3 PRODUCTOS POR VALOR");
console.log("--------------------------------------------------");

const top3 = topProductosPorValor(ventas, 3);
console.table(
    top3.map(({ producto, total }, indice) => ({
        Puesto: indice + 1,
        Producto: producto,
        "Total vendido": pesos(total),
    }))
);

console.log("\nRESUMEN POR DÍA");
console.log("--------------------------------------------------");

function mostrarResumenDia(fecha) {
    const ventasDelDiaSeleccionado = ventasDelDia(ventas, fecha);
    const ventasValidas = ventasDelDiaSeleccionado.filter(
        (venta) => venta.cantidad > 0
    );

    console.log(`\nFecha: ${fecha}`);

    if (ventasValidas.length === 0) {
        console.log("Sin ventas válidas para esta fecha.");
    }

    indicador("Registros del día:", ventasDelDiaSeleccionado.length);
    indicador(
        "Unidades vendidas:",
        unidadesVendidas(ventasDelDiaSeleccionado)
    );
    indicador(
        "Total vendido:",
        pesos(totalVendido(ventasDelDiaSeleccionado))
    );
    indicador(
        "Ticket promedio:",
        pesos(ticketPromedio(ventasDelDiaSeleccionado))
    );
}

mostrarResumenDia("2026-09-01");
mostrarResumenDia("2026-08-31");

console.log("==================================================");