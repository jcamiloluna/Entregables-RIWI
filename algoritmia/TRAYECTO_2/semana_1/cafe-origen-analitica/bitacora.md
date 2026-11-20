## Diccionario de datos

| Propiedad | Tipo | Significado |
|---|---|---|
| `id` | Número | Identificador único de la venta. |
| `fecha` | Texto | Fecha en que se realizó la venta, con formato `AAAA-MM-DD`. |
| `cliente` | Texto | Código que identifica al cliente. |
| `producto` | Texto | Nombre del producto vendido. |
| `ciudad` | Texto | Ciudad asociada a la venta. |
| `cantidad` | Número | Unidades del producto registradas en la venta. |
| `precio` | Número | Precio por unidad del producto, expresado en pesos. |

## Casos borde detectados

| Caso | Problema de calidad | Decisión |
|---|---|---|
| Ciudad con mayúsculas inconsistentes | En una venta aparece `medellín` y en otras `Medellín`. Podrían contarse como ciudades distintas al agruparlas. | Antes de agrupar por ciudad, normalizaré el texto: quitar espacios al inicio y al final, y usar un mismo formato de mayúsculas y minúsculas. |
| Cantidad igual a cero | La venta con id `8` tiene `cantidad: 0`, así que no representa unidades vendidas. | Conservaré el registro original, pero lo excluiré de los cálculos de ventas. También lo señalaré para revisión. |
| Cliente repetido | Los códigos `C01`, `C02` y `C03` aparecen en más de una venta. Eso no necesariamente es un error, pero no debo contar cada aparición como un cliente distinto. | Trataré cada fila como una venta y contaré clientes únicos por código cuando necesite saber cuántos clientes hay. |

## Parte 2: plan en pseudocódigo

### Total vendido
- Iniciar el total en 0.
- Recorrer cada venta.
- Si la cantidad es mayor que 0, sumar `cantidad * precio` al total.
- Al terminar, mostrar el total.

### Unidades vendidas
- Iniciar las unidades en 0.
- Recorrer cada venta.
- Si la cantidad es mayor que 0, sumar `cantidad` a las unidades.
- Al terminar, mostrar las unidades.

### Venta más grande
- Iniciar la venta más grande en 0.
- Recorrer cada venta.
- Si la cantidad es mayor que 0, calcular `cantidad * precio`.
- Si ese valor supera la venta más grande actual, actualizarla.
- Al terminar, mostrar la venta más grande.

### Ticket promedio por compra
- Iniciar el total vendido en 0 y el contador de compras válidas en 0.
- Recorrer cada venta.
- Si la cantidad es mayor que 0, sumar `cantidad * precio` al total y aumentar el contador en 1.
- Si el contador es mayor que 0, dividir el total entre el contador.
- Si no, informar que no hay compras válidas para calcular el promedio.ok


## Verificación manual con tablas de traza

Para los indicadores, considero válida una venta cuando `cantidad > 0`. La venta con id `8` se conserva, pero aporta `0` al total y no se considera para el máximo.

### Traza de `totalVendido(ventas)`

En cada fila sumo `cantidad × precio` al acumulado:

| id | Cálculo de la venta | Acumulado |
|---:|---:|---:|
| 1 | 2 × 42.000 = 84.000 | 84.000 |
| 2 | 1 × 26.000 = 26.000 | 110.000 |
| 3 | 1 × 95.000 = 95.000 | 205.000 |
| 4 | 1 × 42.000 = 42.000 | 247.000 |
| 5 | 3 × 45.000 = 135.000 | 382.000 |
| 6 | 2 × 26.000 = 52.000 | 434.000 |
| 7 | 1 × 120.000 = 120.000 | 554.000 |
| 8 | cantidad 0: aporta 0 | 554.000 |
| 9 | 2 × 45.000 = 90.000 | 644.000 |
| 10 | 4 × 42.000 = 168.000 | 812.000 |
| 11 | 1 × 95.000 = 95.000 | 907.000 |
| 12 | 3 × 26.000 = 78.000 | 985.000 |

Resultado manual: **$985.000**. Resultado del programa (`totalVendido`): **985000**. Coinciden.

### Traza de `ventaMayor(ventas)`

Recorro las ventas válidas y guardo el registro con mayor valor (`cantidad × precio`):

| id | Valor de la venta | Mayor hasta ese momento |
|---:|---:|---:|
| 1 | 84.000 | 84.000 (id 1) |
| 2 | 26.000 | 84.000 (id 1) |
| 3 | 95.000 | 95.000 (id 3) |
| 4 | 42.000 | 95.000 (id 3) |
| 5 | 135.000 | 135.000 (id 5) |
| 6 | 52.000 | 135.000 (id 5) |
| 7 | 120.000 | 135.000 (id 5) |
| 8 | 0, se omite por cantidad 0 | 135.000 (id 5) |
| 9 | 90.000 | 135.000 (id 5) |
| 10 | 168.000 | 168.000 (id 10) |
| 11 | 95.000 | 168.000 (id 10) |
| 12 | 78.000 | 168.000 (id 10) |

Resultado manual: el registro con **id 10**, cuyo valor es **$168.000**. Resultado del programa (`ventaMayor`): registro con id `10`, `cantidad: 4` y `precio: 42000`. Coinciden.


## Cómo responden las funciones a las preguntas de la sesión

### `totalVendidoM(ventas)`
- **¿Qué recorro?** Las ventas.
- **¿Qué filtro?** Las que tienen `cantidad > 0`.
- **¿Qué transformo?** No transformo cada venta; calculo su valor con `valorVenta(venta)`.
- **¿Qué acumulo?** El valor de todas las ventas válidas.
- **¿Cómo agrupo?** No agrupo; obtengo un único total.

### `unidadesVendidasM(ventas)`
- **¿Qué recorro?** Las ventas.
- **¿Qué filtro?** Las que tienen `cantidad > 0`.
- **¿Qué transformo?** No transformo los registros.
- **¿Qué acumulo?** La cantidad de unidades de cada venta válida.
- **¿Cómo agrupo?** No agrupo; obtengo un único total de unidades.

### `ventasPorCiudadM(ventas, ciudad)`
- **¿Qué recorro?** Las ventas.
- **¿Qué filtro?** Las ventas válidas cuya ciudad coincide con la ciudad indicada, ignorando mayúsculas y espacios sobrantes.
- **¿Qué transformo?** Normalizo los nombres de ciudad para compararlos.
- **¿Qué acumulo?** El valor de las ventas que coinciden.
- **¿Cómo agrupo?** No agrupo todas las ciudades; calculo el total de una ciudad solicitada.

### `totalPorCiudad(ventas)`
- **¿Qué recorro?** Las ventas.
- **¿Qué filtro?** Las que tienen `cantidad > 0`.
- **¿Qué transformo?** Normalizo cada ciudad con `trim()` y `toLowerCase()`.
- **¿Qué acumulo?** El valor de cada venta.
- **¿Cómo agrupo?** En un objeto cuyas claves son las ciudades normalizadas y cuyos valores son los totales vendidos allí.

### `unidadesPorProducto(ventas)`
- **¿Qué recorro?** Las ventas.
- **¿Qué filtro?** Las que tienen `cantidad > 0`.
- **¿Qué transformo?** No transformo los registros; uso el nombre del producto como clave.
- **¿Qué acumulo?** Las unidades vendidas.
- **¿Cómo agrupo?** En un objeto con un total de unidades para cada producto.

### `topProductosPorValor(ventas, k)`
- **¿Qué recorro?** Las ventas.
- **¿Qué filtro?** Las que tienen `cantidad > 0`.
- **¿Qué transformo?** Calculo el valor de cada venta y convierto los totales agrupados en un arreglo de productos y totales.
- **¿Qué acumulo?** El valor vendido por producto.
- **¿Cómo agrupo?** En un objeto por producto; luego ordeno el arreglo resultante de mayor a menor y tomo los primeros `k`.


### NOV 17 - Aprendí el uso del while
Por medio de un ejemplo practico sobre el ordenamiento de encontrar una canción en una playlist. Entendí que el while se usa cuando no se sabe cuantas veces se va a repetir un proceso, a diferencia del for que se usa cuando se sabe cuantas veces se va a repetir un proceso.

---

## NOV 18 - Práctica de JavaScript: Búsqueda con While, Manipulación de Arreglos y Algoritmo Burbuja

Durante esta jornada reforcé conceptos fundamentales de lógica y estructuras de datos en JavaScript mediante dos ejercicios prácticos:

### 1. Búsqueda y control de flujo con `while` (`exercice_while.js`)
* **Simulación de Playlist:** Creación de un arreglo con nombres de canciones (`canciones`) para simular una búsqueda lineal.
* **Manejo de punteros/índices:** Uso de una variable contadora (`i = 0`) e incremento manual (`i++`) para avanzar posición por posición mientras `i < canciones.length`.
* **Condición y detención temprana (`break`):**
  * Comparación lógica (`canciones[i] == buscada`) para identificar el elemento objetivo.
  * Uso de la instrucción `break` para detener el ciclo `while` inmediatamente al encontrar la coincidencia, optimizando la ejecución al no seguir recorriendo la lista innecesariamente.

### 2. Métodos de arreglos y ordenamiento burbuja (`practice.js`)
* **Operaciones básicas con arreglos:**
  * `.push()`: Agregar elementos al final del arreglo.
  * Acceso dinámico al último elemento: `array_num[array_num.length - 1]`.
  * `.pop()`: Extraer y retornar el último elemento.
  * `.filter()`: Filtrado inmutable de elementos según una condición lógica (ej. excluir el número `7`).
* **Comprensión de Índices vs. Valores:** Análisis de la relación entre la posición en memoria (`0, 1, 2...`) y el dato almacenado.
* **Algoritmo de Ordenamiento Burbuja (*Bubble Sort*):**
  * **Estructura de doble ciclo (`for` anidados):**
    * **Bucle externo (`j`):** Cuenta las rondas o pasadas necesarias (`numeros.length - 1`). Con $N - 1$ pasadas se garantiza el ordenamiento de los $N$ elementos.
    * **Bucle interno (`i`):** Recorre la lista comparando parejas adyacentes (`numeros[i] > numeros[i + 1]`). Utiliza el límite optimizado `numeros.length - 1 - j` para evitar re-inspeccionar los números que ya quedaron fijados al final en rondas previas y evitar salirse del rango del arreglo.
  * **Intercambio de valores (*Swap*):** Uso de la técnica de la variable auxiliar (`let temporal`) para intercambiar de posición dos valores adyacentes de forma segura sin sobreescribir datos.

---

## NOV 18 - Práctica de JavaScript: Búsqueda con While, Manipulación de Arreglos y Algoritmo Burbuja

Durante esta jornada reforcé conceptos fundamentales de lógica y estructuras de datos en JavaScript mediante dos ejercicios prácticos:

### 1. Búsqueda y control de flujo con `while` (`exercice_while.js`)
* **Simulación de Playlist:** Creación de un arreglo con nombres de canciones (`canciones`) para simular una búsqueda lineal.
* **Manejo de punteros/índices:** Uso de una variable contadora (`i = 0`) e incremento manual (`i++`) para avanzar posición por posición mientras `i < canciones.length`.
* **Condición y detención temprana (`break`):**
  * Comparación lógica (`canciones[i] == buscada`) para identificar el elemento objetivo.
  * Uso de la instrucción `break` para detener el ciclo `while` inmediatamente al encontrar la coincidencia, optimizando la ejecución al no seguir recorriendo la lista innecesariamente.

### 2. Métodos de arreglos y ordenamiento burbuja (`practice.js`)
* **Operaciones básicas con arreglos:**
  * `.push()`: Agregar elementos al final del arreglo.
  * Acceso dinámico al último elemento: `array_num[array_num.length - 1]`.
  * `.pop()`: Extraer y retornar el último elemento.
  * `.filter()`: Filtrado inmutable de elementos según una condición lógica (ej. excluir el número `7`).
* **Comprensión de Índices vs. Valores:** Análisis de la relación entre la posición en memoria (`0, 1, 2...`) y el dato almacenado.
* **Algoritmo de Ordenamiento Burbuja (*Bubble Sort*):**
  * **Estructura de doble ciclo (`for` anidados):**
    * **Bucle externo (`j`):** Cuenta las rondas o pasadas necesarias (`numeros.length - 1`). Con $N - 1$ pasadas se garantiza el ordenamiento de los $N$ elementos.
    * **Bucle interno (`i`):** Recorre la lista comparando parejas adyacentes (`numeros[i] > numeros[i + 1]`). Utiliza el límite optimizado `numeros.length - 1 - j` para evitar re-inspeccionar los números que ya quedaron fijados al final en rondas previas y evitar salirse del rango del arreglo.
  * **Intercambio de valores (*Swap*):** Uso de la técnica de la variable auxiliar (`let temporal`) para intercambiar de posición dos valores adyacentes de forma segura sin sobreescribir datos.


## Depuración de errores reportados por la gerente

La versión preliminar con los errores originales no está disponible en este proyecto. Para reproducir sus condiciones, preparé entradas mínimas para cada caso y verifiqué que la versión actual las maneja correctamente con `node src/verificarErrores.js`.

### Caso 1: Bogotá aparece dos veces

- **Síntoma:** Bogotá puede aparecer como dos grupos cuando uno de los nombres tiene espacios sobrantes o distinta capitalización.
- **Entrada que lo produce:** dos ventas: `{ ciudad: "Bogotá", cantidad: 1, precio: 100 }` y `{ ciudad: "Bogotá ", cantidad: 2, precio: 50 }`.
- **Hipótesis:** agrupar directamente con el texto original crea claves distintas para `"Bogotá"` y `"Bogotá "`.
- **Prueba realizada:** ejecuté `totalPorCiudad` con esas dos ventas y comprobé con `assert.deepEqual` que el resultado es `{ "bogotá": 200 }`, con una sola clave.
- **Causa:** los nombres de ciudad necesitan normalización antes de usarse como claves.
- **Corrección:** `totalPorCiudad` aplica `trim().toLowerCase()` antes de agrupar. Así elimina espacios al inicio o al final y unifica mayúsculas y minúsculas.

### Caso 2: ticket promedio `NaN` en un día sin ventas

- **Síntoma:** el ticket promedio resulta `NaN` al calcularlo para una fecha sin ventas.
- **Entrada que lo produce:** el arreglo vacío obtenido con `ventasDelDia(ventas, "1900-01-01")`.
- **Hipótesis:** una implementación que divide el total entre el número de ventas válidas sin revisar si el contador es cero hace una división `0 / 0`.
- **Prueba realizada:** ejecuté `ticketPromedio` con el arreglo vacío; comprobé que devuelve `0` y que `Number.isNaN(...)` es `false`.
- **Causa:** no hay compras válidas con las cuales calcular un promedio, por lo que el divisor es cero.
- **Corrección:** `ticketPromedio` revisa `cantidadVentasValidas === 0` y devuelve `0` antes de dividir.


## Predicción antes de medir

Contaré como operaciones las visitas a ventas y las comparaciones registradas en el objeto contador. Predigo que las tres funciones tienen crecimiento lineal: si `n` se multiplica por 10, las operaciones crecerán aproximadamente 10 veces, siempre que la proporción de ventas válidas se mantenga similar.

| Función | Predicción |
|---|---|
| `totalVendidoInstrumentado` | Hace una visita y una comparación por venta: `2n` operaciones. Al multiplicar `n` por 10, las operaciones se multiplican exactamente por 10. |
| `ventaMayorInstrumentada` | Hace una visita y al menos una comparación por venta. Para las ventas válidas, también compara si ya hay una venta mayor y, cuando corresponde, compara los valores. Espero aproximadamente 10 veces más operaciones al multiplicar `n` por 10. |
| `totalPorCiudadInstrumentado` | Hace una visita y comprueba la cantidad por venta; además, revisa si ya existe el grupo de ciudad para cada venta válida. Espero aproximadamente 10 veces más operaciones si se conserva la proporción de ventas válidas. |

La cantidad exacta puede variar según cuántas ventas tengan `cantidad > 0`, porque esas ventas activan comparaciones adicionales. La predicción es lineal (`O(n)`); el contador mide visitas y comparaciones, no todos los pasos internos de JavaScript.


## Comparación de predicciones y resultados

En la medición conté las visitas y comparaciones registradas. `primeraVenta` cuenta un acceso directo a `ventas[0]`.

| n | `primeraVenta` | `totalVendido` | `ventaMayor` | `totalPorCiudad` |
|---:|---:|---:|---:|---:|
| 100 | 1 | 200 | 399 | 300 |
| 1.000 | 1 | 2.000 | 3.999 | 3.000 |
| 10.000 | 1 | 20.000 | 39.999 | 30.000 |
| 100.000 | 1 | 200.000 | 399.999 | 300.000 |

### Clasificación

- **`primeraVenta`: O(1).** Accede directamente a `ventas[0]`; el número de operaciones no cambia al aumentar el arreglo.
- **`totalVendidoInstrumentado`: O(n).** Tiene un solo ciclo: visita cada venta y comprueba `cantidad > 0`. Sus operaciones son `2n`, por eso se multiplican por 10 cuando `n` se multiplica por 10.
- **`ventaMayorInstrumentada`: O(n).** Tiene un solo ciclo. Por cada venta comprueba la cantidad y actualiza el máximo; el resultado es `4n - 1` con estos datos. Al crecer `n` diez veces, el conteo queda cerca de diez veces el anterior.
- **`totalPorCiudadInstrumentado`: O(n).** Tiene un solo ciclo y hace una cantidad constante de comprobaciones por venta; en esta medición son `3n` operaciones.

Los resultados confirman la predicción de crecimiento constante para `primeraVenta` y lineal para las otras tres. Ninguna función tiene dos ciclos anidados que recorran las ventas, así que ninguna es **O(n²)**.

## Traza de `clientesRecurrentes` con 5 ventas

Uso estos clientes en orden: `C01`, `C02`, `C01`, `C03`, `C02`.

| `i` | Comparaciones de cliente (`j`) | Cantidad |
|---:|---|---:|
| 0 | C01-C02, C01-C01, C01-C03, C01-C02 | 4 |
| 1 | C02-C01, C02-C03, C02-C02 | 3 |
| 2 | C01-C03, C01-C02 | 2 |
| 3 | C03-C02 | 1 |
| | **Total de comparaciones entre pares** | **10** |

La función detecta como recurrentes a `C01` y `C02`.

Con `n` ventas, el ciclo externo compara la venta `i` con todas las que vienen después. El total de comparaciones entre pares es:

`(n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2`

Para 5 ventas: `5 × 4 / 2 = 10` comparaciones. Este conteo incluye las comparaciones entre pares de clientes; `recurrentes.includes(...)` puede hacer comparaciones adicionales, según los clientes encontrados.

## Análisis del tiempo de `clientesRecurrentes`

Al duplicar la cantidad de ventas, comparé el tiempo de cada fila con el de la siguiente. El tiempo tiende a crecer aproximadamente 4 veces, aunque hay variaciones por la máquina, los datos aleatorios y la precisión de las mediciones.

Esto concuerda con O(n²): los ciclos anidados comparan cada venta con las que vienen después. El número de comparaciones entre pares es `n(n - 1) / 2`; al duplicar `n`, ese número se acerca a cuatro veces el anterior.

## Estimación de medición en cuánto tardaría la función con 100.000 y con 1.000.000 de ventas
El calculo que me sugirió la ia fue la siguiente: 
  // Con 16.000 ventas, el tiempo medido fue 0,915 s. La estimación cuadrática para 100.000 fue 35,7 s, menor a dos minutos, asi que en una prueba podría tardar 39,314 s. Con ese resultado, se estima que 1.000.000 de ventas tardaría cerca de 65 min 31 s. Esta última cifra es una extrapolación, no una medición.

## Costo oculto de `recurrentes.includes`

`recurrentes.includes(cliente)` también recorre el arreglo `recurrentes` hasta encontrar el cliente o llegar al final. En cada coincidencia de clientes dentro de los dos ciclos puede hacer una búsqueda adicional que cuesta hasta O(n). En el peor caso, esas búsquedas, sumadas al recorrido de pares O(n²), pueden llevar la función a O(n³). La fórmula `n(n - 1) / 2` cuenta las comparaciones entre pares de ventas, pero no las comparaciones internas de `includes`.

## Conclusión para la gerente

El reporte se demora porque, para encontrar quién volvió a comprar, compara muchas parejas de ventas y, al encontrar un cliente repetido, vuelve a buscarlo en una lista de clientes. A medida que crece el historial, estas revisiones se multiplican y el reporte tarda mucho más.

## Memoria que usa cada función

No cuento el arreglo `ventas` que recibe cada función; cuento la memoria adicional que necesita para trabajar.

Usan memoria adicional constante, O(1): `valorVenta`, `totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`, `totalVendidoM`, `unidadesVendidasM`, `ventasPorCiudadM`, `ventasDelDia` no: esta última usa `filter`, así que crea otro arreglo. También son O(1) `totalVendidoInstrumentado`, `ventaMayorInstrumentada` y `primeraVenta`. Las funciones instrumentadas actualizan el contador que reciben.

Usan memoria que crece con los datos, O(n): `totalVendidoM`, `unidadesVendidasM`, `ventasPorCiudadM` y `ventasDelDia`, porque `filter` crea un arreglo nuevo. `totalPorCiudad` y `totalPorCiudadInstrumentado` crean un objeto que puede tener una clave por ciudad. `unidadesPorProducto` y `topProductosPorValor` crean resultados agrupados por producto. `clientesRecurrentes` guarda una lista de clientes. `totalCiudadCadena` crea varios arreglos intermedios. `generarVentas(n)` también usa O(n), porque construye un arreglo de n ventas.

Aunque `topProductosPorValor` solo devuelve los primeros k productos, antes crea arreglos y un objeto que pueden crecer con todos los productos. Por eso su espacio es O(n), no O(k).

## Qué versión de `totalCiudad` dejo

Voy a dejar `totalCiudadUnaPasada`. La cadena de métodos me parece más fácil de leer, pero crea arreglos intermedios y recorre los datos varias veces. La versión de una pasada necesita menos memoria y va directa al total. Las dos son O(n) en tiempo; para este reporte prefiero ahorrar memoria y trabajo extra.

## Revisión del informe
- **Observación:** Los tiempos pueden cambiar según el computador; sería bueno aclarar que son aproximados.
- **Respuesta:** De acuerdo. En el informe indiqué que las mediciones son orientativas y pueden variar en otro equipo.
