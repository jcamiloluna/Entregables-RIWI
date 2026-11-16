### 1. Diferencia entre seguir reglas y aprender de ejemplos

Para mí, la diferencia es que seguir reglas es como tener un manual que te dice exactamente qué hacer en cada situación. El problema es que, si aparece algo diferente a lo que dice el manual, puede que no sepas cómo solucionarlo.

Por otro lado, aprender mediante ejemplos es más parecido a aprender con la práctica. Es decir, observar diferentes situaciones, cometer errores y poco a poco entender cómo funcionan las cosas. Así puedes reconocer situaciones parecidas y encontrar soluciones incluso cuando no tienes una regla exacta que te diga qué hacer.

### 2. Ordenar tres tarjetas

1. Compara la tarjeta A con la tarjeta B.
2. **SI** A es mayor que B, **ENTONCES** intercambia sus posiciones.
3. Compara la tarjeta B con la tarjeta C.
4. **SI** B es mayor que C, **ENTONCES** intercambia sus posiciones.
5. Vuelve a comparar la tarjeta A con la tarjeta B.
6. **SI** A es mayor que B, **ENTONCES** intercambia sus posiciones.

### 3. Cómo identificar mensajes no deseados

**Características que pueden ayudar a reconocerlos:**

- **Mensajes que generan urgencia:** Intentan asustarte diciendo que tienes poco tiempo para hacer algo o que tu cuenta será bloqueada.
- **Premios u ofertas sospechosas:** Te dicen que ganaste algo o que recibirás un beneficio demasiado bueno para ser cierto.
- **Enlaces extraños:** Te piden entrar rápidamente a un enlace para confirmar tus datos, pagar algo o reclamar un supuesto premio.

**Pruebas realizadas**

**Mensaje 1:** «⚠️ Alerta: Tu paquete está retenido. Haz clic aquí para pagar el envío y liberarlo».

**Resultado:** 🚫 Mensaje no deseado.

**Explicación:** Lo considero sospechoso porque intenta generar preocupación diciendo que el paquete está retenido y además pide entrar a un enlace para realizar un pago.

**Mensaje 2:** «Hola, te comparto los apuntes de la clase de hoy en el archivo adjunto».

**Resultado:** ✅ Mensaje deseado.

**Explicación:** Parece un mensaje normal porque comparte información relacionada con una clase. No intenta presionar a la persona ni ofrece premios o beneficios sospechosos.

### 4. Diseño del asistente para resolver dudas

```text
+------------------------------------------------------+
|                  TUTOR EXPRESS                       |
+------------------------------------------------------+
|                                                      |
|  Escribe tu duda o el tema que no entiendes:         |
|  [______________________________________________]    |
|                                                      |
|  [Adjuntar imagen o apunte]       [Enviar]           |
|                                                      |
+------------------------------------------------------+
|                 RESPUESTA DEL ASISTENTE              |
|                                                      |
|  Aquí aparecerá una explicación sencilla del tema,  |
|  acompañada de un ejemplo para entenderlo mejor.     |
|                                                      |
|  ¿Te sirvió la explicación?                          |
|             [Sí]       [No, necesito ayuda]          |
|                                                      |
+------------------------------------------------------+
| IMPORTANTE: Este asistente solo responde preguntas   |
| relacionadas con los temas del curso. No reemplaza   |
| las explicaciones ni las revisiones del docente.     |
+------------------------------------------------------+
```

### 5. Prueba del asistente de otro equipo

**Pregunta fuera del tema:**

«¿Cómo se prepara una lasaña casera?»

**Pregunta que el asistente no puede saber con seguridad:**

«¿Qué preguntas exactas van a salir en el examen final?»

**Propuesta de mejora**

Creo que sería bueno agregar un filtro que revise las preguntas antes de enviarlas al asistente. De esta manera, si alguien pregunta algo que no tiene relación con el curso, el sistema puede mostrar un mensaje indicando que solo responde dudas de la materia.

También considero importante que, cuando alguien pregunte algo que el asistente no puede saber con seguridad, como las preguntas exactas de un examen, no intente inventar una respuesta. En esos casos debería recomendar consultar directamente con un tutor o docente.

### 6. Flujo de funcionamiento del asistente

**Paso 1 (R):** El estudiante escribe su pregunta y presiona el botón de enviar. El sistema revisa que el campo no esté vacío.

**Paso 2 (R):** Se revisa si la pregunta tiene relación con los temas del curso mediante unas reglas y palabras clave.

**Paso 3 (M):** La inteligencia artificial recibe la pregunta y genera una respuesta con una explicación sencilla y un ejemplo.

**Paso 4 (R):** El sistema organiza la respuesta y muestra las advertencias correspondientes, junto con los botones para calificar si fue útil.

**Paso 5 (H):** Si el estudiante considera que la respuesta está equivocada o no le ayudó, un tutor humano puede revisar el caso y brindar apoyo.

### 7. Resultados del ordenamiento

- Con los números 7, 2 y 5, el resultado es: **2, 5, 7**.
- Con los números 2, 2 y 9, el resultado es: **2, 2, 9**.
