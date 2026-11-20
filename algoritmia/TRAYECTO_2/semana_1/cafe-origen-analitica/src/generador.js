const productos = [
    { nombre: "Origen Huila 500 g", precio: 42000 },
    { nombre: "Origen Nariño 250 g", precio: 26000 },
    { nombre: "Prensa francesa", precio: 95000 },
    { nombre: "Origen Sierra 500 g", precio: 45000 },
    { nombre: "Molino manual", precio: 120000 },
];

const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];

function generarVentas(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("n debe ser un número entero igual o mayor que 0");
    }

    // Redondeo hacia arriba para que la n pequeño tambien tenga al menos un cliente
    const cantidadClientes = Math.max(1, Math.ceil(n / 3));
    const ventas = [];

    for (let i = 0; i < n; i++) {
        const producto =
            productos[Math.floor(Math.random() * productos.length)];
        const ciudad =
            ciudades[Math.floor(Math.random() * ciudades.length)];
        const numeroCliente =
            Math.floor(Math.random() * cantidadClientes) + 1;
        const cantidad = Math.floor(Math.random() * 5) + 1;

        ventas.push({
            id: i + 1,
            fecha: "2026-09-01",
            cliente: `C${String(numeroCliente).padStart(2, "0")}`,
            producto: producto.nombre,
            ciudad,
            cantidad,
            precio: producto.precio,
        });
    }

    return ventas;
}

module.exports = { generarVentas };