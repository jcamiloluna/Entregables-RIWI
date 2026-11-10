# Entregable Algoritmia - Sesión 2: Lógica y Decisiones (Riwi)

Documentación de tablas de verdad, tablas de decisión, casos borde y pruebas de escritorio de los 5 programas de la Sesión 2 en PSeInt.

---

## 1. Validar Registro (`ValidarRegistro.psc`)

**Regla:** El usuario puede registrarse solo si tiene 14 años o más **Y** acepta los términos (`S` o `s`).

### Tabla de verdad (Conector Y)
| edad >= 14 | respuesta = "S" | ¿Se registra? (Y) | Salida en PSeInt |
| :--- | :--- | :--- | :--- |
| V | V | V | Registro exitoso |
| V | F | F | No puedes registrarte |
| F | V | F | No puedes registrarte |
| F | F | F | No puedes registrarte |

### Pruebas ejecutadas (Casos borde)
* **Caso 1:** `edad = 14`, `respuesta = "S"` -> Salida: `Registro exitoso`
* **Caso 2:** `edad = 13`, `respuesta = "S"` -> Salida: `No puedes registrarte`
* **Caso 3:** `edad = 30`, `respuesta = "N"` -> Salida: `No puedes registrarte`
* **Caso 4:** `edad = 14`, `respuesta = "s"` -> Salida: `Registro exitoso`

---

## 2. Validar Edad con Ley de De Morgan (`ValidarEdad.psc`)

**Regla:** Una edad válida está entre 0 y 120 (`edad >= 0 Y edad <= 120`). Aplicando la Ley de De Morgan, una edad es **inválida** cuando es menor que 0 **O** mayor que 120 (`edad < 0 O edad > 120`).

### Tabla de decisión y casos borde
| Edad ingresada | edad < 0 | edad > 120 | Condición (O) | Salida en PSeInt |
| :--- | :--- | :--- | :--- | :--- |
| -1 | V | F | V | Edad inválida |
| 0 | F | F | F | Edad válida |
| 22 | F | F | F | Edad válida |
| 120 | F | F | F | Edad válida |
| 121 | F | V | V | Edad inválida |

---

## 3. Cobro de Parqueadero (`Parqueadero.psc`)

### Tabla de decisión de reglas de negocio
| Regla | Condición | Acción / Resultado |
| :--- | :--- | :--- |
| 1. Minutos negativos | `minutos < 0` | Error: Los minutos no pueden ser negativos |
| 2. Tipo de vehículo | `1 = Carro`, `2 = Moto`, `Otro` | Tarifa: `$4000/h`, `$2000/h`, o `Tipo no válido` |
| 3. Periodo de gracia | `minutos <= 15` | Cobro gratis (`valor = $0`) |
| 4. Cobro por fracción | `minutos > 15` | `horas = trunc((minutos + 59) / 60)`, `valor = horas * tarifa` |
| 5. Tope máximo | `valor > 30000` | Se ajusta el cobro a `$30000` |
| 6. Descuento factura | `factura = "S"` | Se aplica 50% de descuento (`valor = valor / 2`) |

### Pruebas de los 9 casos borde
| Caso | Tipo | Minutos | Factura | Salida esperada en PSeInt |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1 (Carro) | 15 | N | Valor a pagar: $0 |
| 2 | 1 (Carro) | 16 | N | Valor a pagar: $4000 |
| 3 | 1 (Carro) | 60 | N | Valor a pagar: $4000 |
| 4 | 1 (Carro) | 61 | N | Valor a pagar: $8000 |
| 5 | 2 (Moto) | 61 | S | Valor a pagar: $2000 |
| 6 | 1 (Carro) | 600 | N | Valor a pagar: $30000 |
| 7 | 1 (Carro) | 600 | S | Valor a pagar: $15000 |
| 8 | 3 (Otro) | 30 | N | Tipo de vehículo no válido |
| 9 | 1 (Carro) | -5 | N | Los minutos no pueden ser negativos |

### Prueba de escritorio paso a paso (Caso 7: Carro, 600 min, con factura)
| Paso | Instrucción evaluada | tipo | minutos | factura | tarifa | horas | valor | Salida |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Lectura de datos y `Mayusculas` | 1 | 600 | "S" | - | - | - | - |
| 2 | `minutos < 0` (600 < 0 es Falso) | 1 | 600 | "S" | - | - | - | - |
| 3 | `Segun tipo Hacer` (Caso 1) | 1 | 600 | "S" | 4000 | - | - | - |
| 4 | `minutos <= 15` (600 <= 15 es Falso) | 1 | 600 | "S" | 4000 | - | - | - |
| 5 | `horas <- trunc((600 + 59) / 60)` | 1 | 600 | "S" | 4000 | 10 | - | - |
| 6 | `valor <- 10 * 4000` | 1 | 600 | "S" | 4000 | 10 | 40000 | - |
| 7 | `valor > 30000` (Verdadero, aplica tope) | 1 | 600 | "S" | 4000 | 10 | 30000 | - |
| 8 | `factura = "S"` (Verdadero, divide entre 2) | 1 | 600 | "S" | 4000 | 10 | 15000 | Valor a pagar: $15000 |

---

## 4. Reto 1: Semáforo de Inventario (`Semaforo.psc`)

### Tabla de decisión
| Condición | Estado | Salida en PSeInt |
| :--- | :--- | :--- |
| `unidades < 0` | Error | Error: las unidades no pueden ser negativas |
| `unidades = 0` | Rojo | Rojo: agotado |
| `unidades >= 1 Y unidades <= 10` | Amarillo | Amarillo: hay que pedir |
| `unidades > 10` | Verde | Verde: todo bien |

### Prueba de escritorio en casos borde
| Prueba | Entrada (`unidades`) | `< 0` | `= 0` | `<= 10` | Salida en PSeInt |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Borde 1 | -1 | V | - | - | Error: las unidades no pueden ser negativas |
| Borde 2 | 0 | F | V | - | Rojo: agotado |
| Borde 3 | 1 | F | F | V | Amarillo: hay que pedir |
| Borde 4 | 10 | F | F | V | Amarillo: hay que pedir |
| Borde 5 | 11 | F | F | F | Verde: todo bien |

---

## 5. Reto 2: Año Bisiesto (`Bisiesto.psc`)

**Regla:** Un año es bisiesto si es divisible entre 4 **Y NO** es divisible entre 100, **O** si es divisible entre 400:
`(anio MOD 4 = 0 Y anio MOD 100 <> 0) O anio MOD 400 = 0`

### Tabla de decisión y prueba de escritorio
| Año (`anio`) | `MOD 4 = 0` | `MOD 100 <> 0` | Paréntesis `(Y)` | `MOD 400 = 0` | Resultado final `(O)` | Salida en PSeInt |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2024 | V (residuo 0) | V (residuo 24) | V | F (residuo 24) | V | 2024 es bisiesto |
| 1900 | V (residuo 0) | F (residuo 0) | F | F (residuo 300) | F | 1900 no es bisiesto |
| 2000 | V (residuo 0) | F (residuo 0) | F | V (residuo 0) | V | 2000 es bisiesto |
| 2026 | F (residuo 2) | V (residuo 26) | F | F (residuo 26) | F | 2026 no es bisiesto |