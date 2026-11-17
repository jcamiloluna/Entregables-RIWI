# Entregable Algoritmia semana 3

En esta sesión se desarrollaron 5 ejercicios de algoritmia utilizando PSeInt. El objetivo fue practicar el uso de ciclos, contadores, acumuladores, condiciones y funciones para resolver diferentes situaciones mediante pasos ordenados.

---

## 1. Cajero de Parqueadero (`cajeroParqueadero.psc`)

**Objetivo:** Crear un programa que permita registrar el dinero recibido por cada carro que ingresa al parqueadero y mostrar el total recaudado cuando se cierre la caja.

**¿Cómo funciona?**

1. Se crean dos variables: `total` para guardar el dinero recaudado y `carros` para contar los vehículos atendidos.
2. Ambas variables comienzan en cero.
3. El programa solicita el valor cobrado por un vehículo.
4. Mientras el valor ingresado sea diferente de cero, se suma al total y se aumenta el contador de carros.
5. Después de cada cobro, vuelve a pedir otro valor.
6. Cuando se ingresa `0`, el ciclo termina y se muestran los resultados.

**Prueba de escritorio**

| Entrada (valor) | Total acumulado | Carros atendidos |
| :--- | :--- | :--- |
| 5000 | 5000 | 1 |
| 7000 | 12000 | 2 |
| 4000 | 16000 | 3 |
| 0 | 16000 | 3 |

**Resultado final:**
- Carros atendidos: 3
- Total recaudado: $16000

**Lo aprendido:** Aprendí a utilizar el ciclo `Mientras` para repetir una operación hasta que el usuario ingrese un valor que indique que debe terminar. También practiqué el uso de acumuladores y contadores.

---

## 2. Calificaciones (`Calificaciones.psc`)

**Objetivo:** Crear un programa que permita ingresar las notas de 5 estudiantes y mostrar el promedio, cuántos aprobaron, cuál fue la nota más alta y cuál fue la más baja.

**¿Cómo funciona?**

1. Se crean las variables necesarias para guardar las notas, la suma, el promedio y la cantidad de estudiantes aprobados.
2. Se inicializa la suma y el contador de aprobados en cero.
3. Se utiliza un ciclo `Para` que se repite 5 veces, una por cada estudiante.
4. En cada repetición se solicita una nota y se suma al acumulado.
5. Si la nota es mayor o igual a 3, se cuenta como aprobado. De lo contrario, se indica que alguien perdió.
6. También se compara cada nota para encontrar la más alta y la más baja.
7. Al terminar el ciclo, se muestran todos los resultados.

**Reglas del ejercicio**

| Condición | Resultado |
| :--- | :--- |
| `nota >= 3` | El estudiante aprueba |
| `nota < 3` | El estudiante pierde |
| `nota > mayor` | Se actualiza la nota más alta |
| `nota < menor` | Se actualiza la nota más baja |

**Prueba de escritorio**

| Estudiante | Nota | Suma acumulada | Aprobados |
| :--- | :--- | :--- | :--- |
| 1 | 4.0 | 4.0 | 1 |
| 2 | 2.5 | 6.5 | 1 |
| 3 | 3.5 | 10.0 | 2 |
| 4 | 5.0 | 15.0 | 3 |
| 5 | 2.0 | 17.0 | 3 |

**Resultado final:**
- Promedio: 3.4
- Aprobados: 3
- Nota más alta: 5.0
- Nota más baja: 2.0
- Mensaje: Hay estudiantes en refuerzo.

**Lo aprendido:** Aprendí a utilizar el ciclo `Para` cuando ya conocemos cuántas veces se debe repetir una acción. También practiqué cómo sumar valores, contar resultados y comparar números para encontrar el mayor y el menor.

---

## 3. Factura de Restaurante (`FacturaRestaurante.psc`)

**Objetivo:** Crear un programa que permita calcular el valor de una factura de restaurante, teniendo en cuenta el subtotal, el impuesto y la propina.

**¿Cómo funciona?**

1. Primero se obtiene el subtotal del pedido utilizando la función `LeerPedido()`.
2. Después se utiliza la función `CalcularPorcentaje()` para calcular el impuesto del 8%.
3. Se vuelve a utilizar esa misma función para calcular la propina del 10%.
4. Finalmente, se llama a `ImprimirFactura()` para mostrar la información de la factura.

**Reglas del ejercicio**

| Concepto | Porcentaje | Operación |
| :--- | :--- | :--- |
| Subtotal | 100% | Valor del pedido |
| Impuesto | 8% | Subtotal * 0.08 |
| Propina | 10% | Subtotal * 0.10 |

**Ejemplo de prueba**

Si el subtotal del pedido es de $100000:

| Concepto | Valor |
| :--- | :--- |
| Subtotal | $100000 |
| Impuesto (8%) | $8000 |
| Propina (10%) | $10000 |
| Total | $118000 |

**Lo aprendido:** Aprendí que las funciones sirven para dividir un programa en partes más pequeñas. Así podemos realizar diferentes tareas sin tener que escribir todas las operaciones dentro del algoritmo principal. También entendí cómo calcular porcentajes.

---

## 4. Pirámide (`Piramide.psc`)

**Objetivo:** Crear un programa que dibuje una pirámide utilizando asteriscos (`*`) según la altura que ingrese el usuario.

**¿Cómo funciona?**

1. Se solicita al usuario la altura que tendrá la pirámide.
2. Se utiliza un ciclo `Para` para recorrer cada fila.
3. Dentro del primer ciclo se utiliza otro ciclo `Para` para imprimir los espacios que van antes de los asteriscos.
4. Después se utiliza otro ciclo para imprimir los asteriscos de cada fila.
5. Al terminar cada fila, se realiza un salto de línea para continuar con la siguiente.

**Reglas del ejercicio**

| Elemento | Cantidad |
| :--- | :--- |
| Espacios por fila | `n - fila` |
| Asteriscos por fila | `2 * fila - 1` |
| Número de filas | Depende de la altura ingresada |

**Prueba de escritorio**

Entrada: `n = 4`

```text
   *
  ***
 *****
*******
```

**Lo aprendido:** Aprendí a utilizar ciclos dentro de otros ciclos, también llamados ciclos anidados. Entendí que podemos controlar la cantidad de espacios y caracteres que se muestran en cada fila para formar diferentes figuras.

---

## 5. Validar PIN (`ValidarPIN.psc`)

**Objetivo:** Crear un programa que permita ingresar un PIN para acceder al sistema, dando máximo 3 oportunidades antes de bloquear la tarjeta.

**¿Cómo funciona?**

1. Se crean las variables `pin` e `intentos` y una variable lógica llamada `acceso`.
2. Los intentos comienzan en cero y el acceso comienza en `Falso`.
3. Se utiliza el ciclo `Repetir` para solicitar el PIN al usuario.
4. Cada vez que se ingresa un PIN, el contador de intentos aumenta en uno.
5. Si el PIN ingresado es `2580`, la variable `acceso` cambia a `Verdadero`.
6. El ciclo termina cuando el PIN es correcto o cuando se completan los 3 intentos.
7. Si el acceso es verdadero, muestra "Bienvenido". Si no, muestra "Tarjeta bloqueada".

**Reglas del ejercicio**

| Condición | Resultado |
| :--- | :--- |
| `pin = 2580` | Acceso permitido |
| `intentos < 3` | Todavía puede intentar |
| `acceso = Verdadero` | Muestra "Bienvenido" |
| `intentos = 3` y acceso falso | Muestra "Tarjeta bloqueada" |

**Pruebas ejecutadas**

| Caso | Intento 1 | Intento 2 | Intento 3 | Resultado |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 2580 | - | - | Bienvenido |
| 2 | 1234 | 2580 | - | Bienvenido |
| 3 | 1111 | 2222 | 3333 | Tarjeta bloqueada |
| 4 | 1234 | 4567 | 2580 | Bienvenido |

**Lo aprendido:** Aprendí a utilizar el ciclo `Repetir`, que permite ejecutar instrucciones al menos una vez. También practiqué el uso de variables lógicas para guardar si una condición se cumple o no, y cómo limitar la cantidad de intentos de un usuario.

---

## Conclusión

En esta sesión aprendí a trabajar con diferentes tipos de ciclos en PSeInt, como `Mientras`, `Para` y `Repetir`. También practiqué el uso de contadores, acumuladores, condiciones y funciones.

Los ejercicios me ayudaron a entender cómo organizar mejor un algoritmo y cómo resolver problemas paso a paso. Además, aprendí que los ciclos permiten repetir instrucciones sin tener que escribirlas muchas veces y que las funciones ayudan a dividir el trabajo en partes más organizadas.