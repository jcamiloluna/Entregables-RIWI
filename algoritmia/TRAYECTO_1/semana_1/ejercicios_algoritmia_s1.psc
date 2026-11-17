##Algoritmo EdadEnDias
    Definir edad, dias Como Entero
    Escribir "¿Cuántos años tienes?"
    Leer edad
    dias <- edad * 365
    Escribir "Has vivido ", dias, " días"
FinAlgoritmo



##Algoritmo Saludo
    Definir nombre Como Caracter
    Escribir "¿Cómo te llamas?"
    Leer nombre
    Escribir "Hola, ", nombre, ". Bienvenido a Algoritmia"
FinAlgoritmo



##Algoritmo Propinas
    Definir cuenta, porcentaje, personas, propina, total, porPersona Como Real
    Escribir "Ingresa el valor de la cuenta:"
    Leer cuenta
    Escribir "Ingresa el porcentaje de propina:"
    Leer porcentaje
    Escribir "Ingresa el número de personas:"
    Leer personas
    propina <- cuenta * porcentaje / 100
    total <- cuenta + propina
    porPersona <- total / personas
    Escribir "La propina es: $", propina
    Escribir "El total es: $", total
    Escribir "Cada uno paga: $", porPersona
FinAlgoritmo