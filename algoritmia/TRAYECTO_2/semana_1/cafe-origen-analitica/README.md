# Café Origen: analítica de ventas

## ¿Qué es este proyecto?

Es un ejercicio de JavaScript que analiza una muestra de ventas de Café Origen. Incluye cálculos con ciclos y métodos de arreglos, agrupaciones por ciudad y producto, rankings y un reporte legible en consola.

## Cómo ejecutarlo

Se requiere Node.js. Desde la carpeta raíz del proyecto ejecuta:

```bash
node src/reporte.js
```

Para comparar las versiones con ciclos y métodos:

```bash
node src/verificar.js
```

Para comprobar los casos de ciudad duplicada y fecha sin ventas:

```bash
node src/verificarErrores.js
```

## ¿Qué preguntas responde?

- ¿Cuál es el total vendido y cuántas unidades se vendieron?
- ¿Cuál fue la venta individual de mayor valor y cuál es el ticket promedio por compra?
- ¿Cuánto se vendió en cada ciudad?
- ¿Cuántas unidades se vendieron de cada producto?
- ¿Qué tres productos generaron más dinero?
- ¿Qué resultados se obtienen para un día con ventas y para un día sin ventas?

Los cálculos consideran válidos los registros con `cantidad > 0`. Las ciudades se normalizan para juntar diferencias de mayúsculas y espacios sobrantes.


## Tiempo, memoria y cadena de metodos
| Versión | Recorridos | Arreglos nuevos | Tiempo | Espacio adicional |
|---|---|---:|---|---|
| `totalCiudadCadena` | `map` y `filter` recorren las `n` ventas. El segundo `map` y `reduce` recorren las `m` ventas filtradas. Si todas coinciden, son cuatro recorridos de tamaño `n`. | 3 | **O(n)** | **O(n)** |
| `totalCiudadUnaPasada` | Un recorrido de las `n` ventas. | 0 | **O(n)** | **O(1)** |

Ambas funciones son O(n) en tiempo porque el número de operaciones crece proporcionalmente a la cantidad de ventas. `totalCiudadCadena` puede recorrer el arreglo hasta cuatro veces, por lo que su tiempo se puede representar como `4n`. `totalCiudadUnaPasada` lo recorre una vez, así que se representa como `n`. En notación Big O se eliminan las constantes: tanto `4n` como `n` se simplifican a **O(n)**. La versión de una pasada hace menos trabajo, pero las dos tienen el mismo orden de crecimiento.

