# Rendimiento del motor de analítica

Medí las funciones con un arreglo de 10.000 ventas creado por `generarVentas(10000)`. Los tiempos son la mediana de cinco ejecuciones, después de dos ejecuciones de calentamiento, en el mismo proceso de Node.js. Son orientativos: dependen del computador y de los datos aleatorios.

Para las tres funciones instrumentadas, reporto operaciones (visitas + comparaciones) en lugar de tiempo. Todas las ventas generadas tienen cantidad entre 1 y 5. `p` representa la cantidad de productos distintos y `m` la cantidad de ventas que pasa el filtro.

| Función | Qué hace | Complejidad temporal | Complejidad espacial | Justificación | Operaciones o tiempo con 10.000 ventas |
|---|---|---|---|---|---:|
| `valorVenta` | Calcula cantidad por precio de una venta. | O(1) | O(1) | Hace una multiplicación y devuelve un número. | 0,002 ms (una venta) |
| `totalVendido` | Suma el valor de las ventas válidas. | O(n) | O(1) | Un ciclo recorre las ventas y mantiene un acumulador. | 0,286 ms |
| `unidadesVendidas` | Suma las unidades de las ventas válidas. | O(n) | O(1) | Un ciclo y un acumulador numérico. | 0,089 ms |
| `ventaMayor` | Devuelve el registro válido de mayor valor. | O(n) | O(1) | Recorre una vez y conserva una referencia al mayor. | 0,114 ms |
| `ticketPromedio` | Divide el total entre las ventas válidas. | O(n) | O(1) | Un recorrido con acumulador y contador. | 0,100 ms |
| `ventasPorCiudad` | Suma el valor válido de una ciudad. | O(n) | O(1) | Recorre las ventas, normaliza una ciudad a la vez y acumula. | 0,277 ms |
| `totalVendidoM` | Suma el valor de las ventas válidas con métodos. | O(n) | O(n) | `filter` crea un arreglo de hasta n elementos; `reduce` lo recorre. | 0,175 ms |
| `unidadesVendidasM` | Suma unidades con métodos. | O(n) | O(n) | Crea un arreglo filtrado y luego lo reduce. | 0,169 ms |
| `ventasPorCiudadM` | Suma ventas válidas de una ciudad con métodos. | O(n) | O(n) | `filter` crea un arreglo temporal y `reduce` lo recorre. | 0,260 ms |
| `totalPorCiudad` | Agrupa el dinero vendido por ciudad. | O(n) | O(n) | Filtra ventas y crea un objeto con los totales por ciudad. | 0,686 ms |
| `unidadesPorProducto` | Agrupa las unidades por producto. | O(n) | O(n) | Filtra ventas y acumula en un objeto de productos. | 0,381 ms |
| `topProductosPorValor` | Agrupa el valor por producto, ordena y devuelve los k primeros. | O(n + p log p), peor caso O(n log n) | O(n) | Filtra y agrupa las ventas; después ordena los p productos. | 0,366 ms (p = 5) |
| `ventasDelDia` | Devuelve las ventas de una fecha. | O(n) | O(n) | `filter` revisa n ventas y crea otro arreglo. | 0,110 ms |
| `totalVendidoInstrumentado` | Suma ventas y cuenta visitas y comparaciones. | O(n) | O(1) | Un ciclo; actualiza el contador recibido. | 20.000 operaciones |
| `ventaMayorInstrumentada` | Busca la venta mayor y cuenta visitas y comparaciones. | O(n) | O(1) | Un ciclo; actualiza el máximo y el contador recibido. | 39.999 operaciones |
| `totalPorCiudadInstrumentado` | Agrupa ventas por ciudad y cuenta visitas y comparaciones. | O(n) | O(n) | Un ciclo y un objeto con hasta n ciudades. | 30.000 operaciones |
| `primeraVenta` | Devuelve el elemento en la posición cero. | O(1) | O(1) | Accede a un índice, sin recorrer ni copiar el arreglo. | 0,001 ms |
| `clientesRecurrentes` | Encuentra clientes que aparecen en más de una venta. | O(n³) peor caso | O(n) | Compara pares y, al coincidir, `includes` recorre la lista de recurrentes. | 325,318 ms |
| `totalCiudadCadena` | Normaliza, filtra, calcula y suma el total de una ciudad. | O(n) | O(n) | Encadena mapas, filtro y reducción; crea tres arreglos intermedios. | 0,865 ms |
| `totalCiudadUnaPasada` | Suma el total de una ciudad en un solo ciclo. | O(n) | O(1) | Recorre las ventas una vez y guarda solo el total y la ciudad buscada. | 0,545 ms |

`clientesRecurrentes` se midió con datos aleatorios generados; el tiempo depende de cómo se repartan los clientes. La complejidad indicada es el peor caso, donde las búsquedas de `includes` pueden recorrer una lista larga muchas veces. Los tiempos de funciones muy rápidas son especialmente sensibles al equipo y al ruido de medición.

## Proyección a 1.000.000 de ventas

Tomé los tiempos de la tabla de 10.000 ventas y proyecté con estas reglas: O(1) conserva aproximadamente el mismo tiempo; O(n) multiplica el tiempo por 100; O(n log n) multiplica por cerca de 150 si el número de productos también crece con n. En la medición, `generarVentas` usa un catálogo fijo de cinco productos y cuatro ciudades. Los tiempos son orientativos y no suman el tiempo de crear el millón de registros.

| Función | Tiempo estimado para 1.000.000 | Base de la proyección |
|---|---:|---|
| `valorVenta` | 0,002 ms por llamada | O(1); recibe una venta, no recorre la lista. |
| `totalVendido` | 28,6 ms | O(n); 0,286 ms × 100. |
| `unidadesVendidas` | 8,9 ms | O(n); 0,089 ms × 100. |
| `ventaMayor` | 11,4 ms | O(n); 0,114 ms × 100. |
| `ticketPromedio` | 10,0 ms | O(n); 0,100 ms × 100. |
| `ventasPorCiudad` | 27,7 ms | O(n); 0,277 ms × 100. |
| `totalVendidoM` | 17,5 ms | O(n); 0,175 ms × 100. |
| `unidadesVendidasM` | 16,9 ms | O(n); 0,169 ms × 100. |
| `ventasPorCiudadM` | 26,0 ms | O(n); 0,260 ms × 100. |
| `totalPorCiudad` | 68,6 ms | O(n); 0,686 ms × 100. |
| `unidadesPorProducto` | 38,1 ms | O(n); 0,381 ms × 100. |
| `topProductosPorValor` | 36,6 ms con 5 productos; hasta ~54,9 ms si p crece con n | Con el catálogo fijo, la ordenación es sobre 5 productos. Para p proporcional a n, usé el factor O(n log n) de ~150. |
| `ventasDelDia` | 11,0 ms | O(n); 0,110 ms × 100. |
| `totalVendidoInstrumentado` | 26,9 ms | O(n); 0,269 ms × 100. |
| `ventaMayorInstrumentada` | 12,4 ms | O(n); 0,124 ms × 100. |
| `totalPorCiudadInstrumentado` | 85,8 ms | O(n); 0,858 ms × 100. |
| `primeraVenta` | 0,001 ms por llamada | O(1); un acceso al índice cero. |
| `clientesRecurrentes` | ~54 min por extrapolación de 10.000; ~65 min usando la medición de 100.000 | Los datos generados sugieren crecimiento cercano a O(n²), pero varía con el reparto aleatorio de clientes. El peor caso puede ser O(n³), por lo que esta proyección no es una garantía. |
| `totalCiudadCadena` | 86,5 ms | O(n); 0,865 ms × 100. |
| `totalCiudadUnaPasada` | 54,5 ms | O(n); 0,545 ms × 100. |

Las proyecciones de milisegundos son extrapolaciones de una medición pequeña y pueden variar mucho en otro equipo. La estimación de `clientesRecurrentes` es especialmente incierta: en 100.000 ventas se midieron 39,314 s, lo que proyecta unos 65 min 31 s al multiplicar otra vez el volumen por diez bajo el supuesto cuadrático.

## Riesgos al crecer los datos

Ordené las funciones por el riesgo de que el tiempo o la memoria se disparen:

1. **`clientesRecurrentes` — riesgo más alto.** En el peor caso, además de comparar pares de ventas, `includes` puede recorrer una lista larga de clientes recurrentes. Su tiempo puede llegar a O(n³). En los datos aleatorios medidos se comportó cerca de O(n²), pero no confiaría en ese reparto para un historial real.
2. **`topProductosPorValor` — riesgo alto si aparecen muchos productos distintos.** Ordena los totales por producto; con p productos distintos puede costar O(p log p), y los arreglos y el objeto ocupan O(n) espacio. Con el catálogo actual de cinco productos, el ordenamiento es pequeño.
3. **Funciones lineales que crean arreglos u objetos — riesgo de memoria.** `totalVendidoM`, `unidadesVendidasM`, `ventasPorCiudadM`, `ventasDelDia` y `totalCiudadCadena` guardan resultados intermedios. `totalPorCiudad`, `totalPorCiudadInstrumentado` y `unidadesPorProducto` acumulan grupos. Su tiempo es O(n), pero su memoria adicional puede crecer hasta O(n).
4. **Funciones lineales de una pasada y espacio constante — riesgo menor.** `totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`, las tres funciones instrumentadas y `totalCiudadUnaPasada` recorren los datos en O(n) y usan O(1) memoria adicional, salvo el objeto acumulador de `totalPorCiudadInstrumentado`, clasificado arriba.
5. **Funciones constantes — riesgo más bajo.** `valorVenta` y `primeraVenta` hacen trabajo fijo, O(1), independientemente del tamaño de la lista.

El criterio fue priorizar primero el crecimiento del tiempo en el peor caso, luego la memoria adicional y, por último, si el trabajo por venta es fijo o requiere crear resultados intermedios.

## Plan de optimización

La función de mayor riesgo es `clientesRecurrentes`. En los ciclos anidados se comparan ventas por pares; cuando dos clientes coinciden, `recurrentes.includes(...)` vuelve a recorrer la lista de clientes recurrentes para revisar si ya se guardó ese cliente. Ese trabajo de búsqueda se repite.

La mejora que propongo es guardar los clientes ya vistos en un `Set` y guardar aparte los recurrentes en otro `Set`. Al visitar cada venta, se consulta si su cliente ya apareció: si sí, se agrega al conjunto de recurrentes; si no, se marca como visto. Así no se comparan todos los pares ni se vuelve a buscar en una lista. La idea sería recorrer las ventas una vez, con memoria proporcional a la cantidad de clientes. Por ahora solo documento el plan; no cambio la función.
