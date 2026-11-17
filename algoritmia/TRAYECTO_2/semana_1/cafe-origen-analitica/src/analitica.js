function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}

function unidadesVendidas(ventas) {
    let totalUnidades = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            totalUnidades += venta.cantidad;
        }
    }

    return totalUnidades;
}

function ventaMayor(ventas) {
    let mayor = null;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
                mayor = venta;
            }
        }
    }

    return mayor;
}

function ticketPromedio(ventas) {
    let total = 0;
    let cantidadVentasValidas = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
            cantidadVentasValidas++;
        }
    }

    if (cantidadVentasValidas === 0) {
        return 0;
    }

    return total / cantidadVentasValidas;
}

function ventasPorCiudad(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();
    let total = 0;

    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (ciudadVenta === ciudadBuscada && venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}

module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
};