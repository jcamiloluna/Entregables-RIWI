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
