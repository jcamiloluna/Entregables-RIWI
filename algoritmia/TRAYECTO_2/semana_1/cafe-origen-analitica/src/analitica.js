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

function totalVendidoM(ventas) {
    return ventas
        .filter((venta) => venta.cantidad > 0)
        .reduce((total, venta) => total + valorVenta(venta), 0);
}

function unidadesVendidasM(ventas) {
    return ventas
        .filter((venta) => venta.cantidad > 0)
        .reduce((total, venta) => total + venta.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter((venta) => {
            const ciudadVenta = venta.ciudad.trim().toLowerCase();
            return ciudadVenta === ciudadBuscada && venta.cantidad > 0;
        })
        .reduce((total, venta) => total + valorVenta(venta), 0);
}

function totalPorCiudad(ventas) {
    return ventas
        .filter((venta) => venta.cantidad > 0)
        .reduce((totales, venta) => {
            const ciudad = venta.ciudad.trim().toLowerCase();
            totales[ciudad] = (totales[ciudad] || 0) + valorVenta(venta);
            return totales;
        }, {});
}

function unidadesPorProducto(ventas) {
    return ventas
        .filter((venta) => venta.cantidad > 0)
        .reduce((unidades, venta) => {
            const producto = venta.producto;
            unidades[producto] = (unidades[producto] || 0) + venta.cantidad;
            return unidades;
        }, {});
}

function topProductosPorValor(ventas, k) {
    const totalesPorProducto = ventas
        .filter((venta) => venta.cantidad > 0)
        .reduce((totales, venta) => {
            const producto = venta.producto;
            totales[producto] =
                (totales[producto] || 0) + valorVenta(venta);

            return totales;
        }, {});

    return Object.entries(totalesPorProducto)
        .map(([producto, total]) => ({ producto, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, k);
}

function ventasDelDia(ventas, fecha) {
    return ventas.filter((venta) => venta.fecha === fecha);
}

module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
};