# Akira Motors — AKR 1390 | El camino lo defines tú

Restauración y despliegue del proyecto Akira Motors a partir del archivo comprimido adjuntado por el usuario, integrando la plataforma completa de exhibición de motocicletas, catálogo de modelos de alto rendimiento, simulador acústico de motor y flujo interactivo de reserva y compra.

### User Review & Critical Decisions

> [!IMPORTANT]
> El usuario especificó abrir y continuar la construcción sobre el archivo comprimido disponible en el entorno (`akira-motors-_-akr-1390-_-el-camino-lo-defines-t__590bfd5a.zip`). Procederemos a descomprimir el código fuente, enlazar los activos visuales y de audio, instalar las dependencias complementarias necesarias y asegurar que el entorno compile y se visualice sin errores.

- **Decisión confirmada**: Se utilizará el código fuente y catálogo de Akira Motors contenido en el archivo zip.
- **Dependencias adicionales**: Se instalarán `clsx`, `gsap` y `tailwind-merge` para soportar las animaciones cinemáticas y la utilidad de clases CSS.
- **Soporte de tema dual**: Se mantendrá la compatibilidad Dark/Light mode con `@custom-variant dark` para Tailwind v4.

---

### 1. Overview & Core Concept

- **Qué hace**: Akira Motors es una experiencia web inmersiva para una marca premium de motocicletas de alto rendimiento. Incluye la presentación estelar del buque insignia AKR 1390, un catálogo interactivo categorizado (Sport, Naked, Adventure, Urban), vista técnica detallada con telemetría de especificaciones, simulador de sonido de motor interactivo por Web Audio API y flujo de reserva/compra guiado.
- **Público objetivo**: Entusiastas del motociclismo de alto cilindraje, compradores potenciales y aficionados a la ingeniería automotriz que buscan una experiencia digital vanguardista y sensorial.
- **Valor diferencial**: Estética cinematográfica inspirada en el diseño de motos de competición, microinteracciones con GSAP y Motion, retroalimentación acústica del acelerador y flujo fluido entre la landing y la pasarela de compra.

---

### 2. User Experience & Visual Design

- **Flujos clave de usuario**:
  1. **Hero & Landing**: Recepción con tipografía de impacto, renderizado visual de la AKR 1390, botón de llamada a la acción primario ("Descubrir AKR 1390" / "Configurar") y control del sonido del motor en tiempo real.
  2. **Catálogo y Modelos**: Explorador horizontal/cuadrícula filtrable por categorías con especificaciones dinámicas (potencia, cilindrada, torque y precio).
  3. **Vista de Detalle de Moto**: Ficha técnica interactiva con puntos clave (hotspots), selector de acabados/colores y ficha de rendimiento.
  4. **Proceso de Compra / Test Drive**: Modal o vista dedicada con cálculo de opciones de financiamiento, selección de concesionario y formulario de confirmación con validación.

- **Identidad visual y estilo**:
  - *Dirección estética*: Minimalismo industrial automotriz con estética nocturna (Dark Slate/Obsidian `#0A0A0A`) combinada con acentos naranja/ámbar y rojo deportivo característicos de las superbikes.
  - *Paleta de colores*: Fondo oscuro (`#090A0F`), superficies estructurales con bordes ultra-finos (`rgba(255,255,255,0.08)`), tipografía en blanco óptico y acentos en naranja neón/ámbar vibrante.
  - *Tipografía*: Display deportivo y contemporáneo para encabezados con `text-wrap: balance` y cifras tabulares (`font-mono tabular-nums`) para especificaciones técnicas y precios.

- **Movimiento y retroalimentación interactiva**:
  - Transiciones suaves entre estados de navegación (`NavigationContext`).
  - Animaciones de revelado con GSAP y Framer Motion con curvas de desaceleración fluidas ($\le 200\text{ms}$ para micro-interacciones).
  - Audio sintetizado con osciladores y moduladores de frecuencia para emular el ralentí y aceleración del motor bicilíndrico.

---

### 3. Key Product Decisions & Trade-Offs

- **Descompresión limpia y conservación de activos**:
  - *Enfoque*: Extraer los archivos del zip preservando la estructura limpia en `src/components/akira/`, `src/lib/`, `public/assets/` y actualizar `metadata.json` e `index.html`.
  - *Por qué*: Mantiene el 100% de la lógica ya programada por el usuario (componentes, pruebas, hooks de navegación y utilidades de render).
- **Web Audio API en lugar de archivos de audio pesados**:
  - *Enfoque*: Uso de síntesis procedural con AudioContext en `engineSound.ts` con fallback silencioso si el usuario no interactúa primero.
  - *Por qué*: Cero latencia, respuesta inmediata al slider de revoluciones (RPM) y sin dependencias de red externas frágiles.
- **Gestión de estado modular con React Context**:
  - *Enfoque*: `NavigationContext.tsx` coordina la vista activa (`home`, `detail`, `comprar`, `specs`), evitando complejidad innecesaria de librerías de enrutamiento externas.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                          App.tsx                            │
│                 (ThemeProvider & Context)                   │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌─────────────────────────┐               ┌─────────────────────────┐
│         Nav.tsx         │               │     Audio Engine        │
│  (Top Bar & Audio CTA)  │               │     (Web Audio API)     │
└──────────────┬──────────┘               └─────────────────────────┘
               │
    ┌──────────┴───────────────────────────────────────┐
    ▼                                                  ▼
┌─────────────────────────┐               ┌─────────────────────────┐
│     Sections.tsx        │               │   BikeDetailPage.tsx    │
│ (Hero, Specs, Hotspots, │◄──navigate───►│ (Deep Specs & Gallery)  │
│  Horizontal Catalog)    │               └────────────┬────────────┘
└──────────────┬──────────┘                            │
               │                                       │
               └───────────────────┬───────────────────┘
                                   ▼
                      ┌─────────────────────────┐
                      │    ComprarPage.tsx      │
                      │  (Checkout / Test Drive │
                      │   Validation & Success) │
                      └─────────────────────────┘
```

- **Estructura de datos**:
  - Modelos y especificaciones centralizadas en `src/components/akira/data.ts`.
  - Estados de vista y motocicleta seleccionada gestionados en `NavigationContext.tsx`.
- **Validación técnica**:
  - Co-ejecución de compilación (`compile_applet`) y verificación de tipos (`lint_applet`).
  - Verificación de que todos los recursos gráficos y assets existen en `public/assets/`.
