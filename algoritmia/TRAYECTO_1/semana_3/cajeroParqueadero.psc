###Algoritmo cajeroParqueadero
    Definir valor, total Como Real
    Definir carros Como entero
    total <- 0
    carros -> 0 
    Escribir "Valor cobrado (0 para cerrar caja):"
    Leer valor
    Mientras valor <> 0 Hacer 
        total <- total + valor
        carros <- carros + 1
        Escribir "valor cobrado (0 para cerrar caja):"
        Leer valor
    FinMientras
    Escribir "Carros atendidos: ", carros
    Escribir "Total recaudado: $", total
FinAlgoritmo