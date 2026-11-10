##Algoritmo FacturaRestaurante
    Definir subtotal, impuesto, propina Como Real 
    subtotal <- LeerPedido()
    impuesto <- CalcularPorcentaje(subtotal, 8)
    propina <- CalcularPorcentaje(subtotal, 10)
    ImprimirFactura(subtotal, impuesto, propina)
FinAlgoritmo 