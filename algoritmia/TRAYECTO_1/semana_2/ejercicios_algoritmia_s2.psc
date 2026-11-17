##Algoritmo Bisiesto
    Definir anio Como Entero
    Escribir "Ingresa un año:"
    Leer anio
    Si (anio MOD 4 = 0 Y anio MOD 100 <> 0) O anio MOD 400 = 0 Entonces
        Escribir anio, " es bisiesto"
    SiNo
        Escribir anio, " no es bisiesto"
    FinSi
FinAlgoritmo



##Algoritmo Parqueadero
    Definir tipo, minutos, horas Como Entero
    Definir tarifa, valor Como Real
    Definir factura Como Caracter
    Escribir "Tipo de vehículo (1 = carro, 2 = moto):"
    Leer tipo
    Escribir "Minutos de permanencia:"
    Leer minutos
    Escribir "¿Tiene factura de compra? (S/N)"
    Leer factura
    factura <- Mayusculas(factura)
    Si minutos < 0 Entonces
        Escribir "Los minutos no pueden ser negativos"
    SiNo
        Segun tipo Hacer
            1:
                tarifa <- 4000
            2:
                tarifa <- 2000
            De Otro Modo:
                tarifa <- 0
        FinSegun
        Si tarifa = 0 Entonces
            Escribir "Tipo de vehículo no válido"
        SiNo
            Si minutos <= 15 Entonces
                valor <- 0
            SiNo
                horas <- trunc((minutos + 59) / 60)
                valor <- horas * tarifa
                Si valor > 30000 Entonces
                    valor <- 30000
                FinSi
                Si factura = "S" Entonces
                    valor <- valor / 2
                FinSi
            FinSi
            Escribir "Valor a pagar: $", valor
        FinSi
    FinSi
FinAlgoritmo



##Algoritmo Semaforo
    Definir unidades Como Entero
    Escribir "Ingresa la cantidad de unidades en inventario:"
    Leer unidades
    Si unidades < 0 Entonces
        Escribir "Error: las unidades no pueden ser negativas"
    SiNo
        Si unidades = 0 Entonces
            Escribir "Rojo: agotado"
        SiNo
            Si unidades <= 10 Entonces
                Escribir "Amarillo: hay que pedir"
            SiNo
                Escribir "Verde: todo bien"
            FinSi
        FinSi
    FinSi
FinAlgoritmo



##Algoritmo ValidarEdad
    Definir edad Como Entero
    Escribir "Ingresa tu edad:"
    Leer edad
    Si edad < 0 O edad > 120 Entonces
        Escribir "Edad inválida"
    SiNo
        Escribir "Edad válida"
    FinSi
FinAlgoritmo



##Algoritmo ValidarRegistro
    Definir edad Como Entero
    Definir respuesta Como Caracter
    Escribir "¿Cuántos años tienes?"
    Leer edad
    Escribir "¿Aceptas los términos? (S/N)"
    Leer respuesta
    respuesta <- Mayusculas(respuesta)
    Si edad >= 14 Y respuesta = "S" Entonces
        Escribir "Registro exitoso"
    SiNo
        Escribir "No puedes registrarte"
    FinSi
FinAlgoritmo