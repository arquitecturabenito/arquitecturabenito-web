# Plan de Implementación: Optimización de Capas y Experiencia Móvil

Optimización integral del sistema de capas y layout responsive en dispositivos móviles para eliminar solapamientos en la cabecera superior, unificar el acceso a categorías mediante un menú desplegable elegante y añadir controles de zoom manual e interactivo para la visualización de libretos fotográficos a doble página.

---

## 1. Diagnóstico de la Problemática Actual en Móvil

1. **Conflicto en la Cabecera Superior (Top Bar Conflict)**:
   - En viewports móviles (< 768px), `FilterControls` se posicionaba en `fixed top-0` con una fila flexible de 6 botones que a menudo envolvía en dos líneas.
   - `BrandLogo` se ubicaba a `top-[58px]` y `LanguageToggle` a `top-[56px]`, chocando directamente con las etiquetas o cubriendo el contenido superior de la galería y la constelación.
   - La galería contaba con un padding superior estático (`pt-32`) que en pantallas de distinta densidad provocaba que las tarjetas quedasen ocultas tras el bloque de filtros.

2. **Visualización de Libretos Fotográficos A5 en Teléfono**:
   - El pliego a doble página (`aspect-[296/210]`) en pantallas móviles de 360–414px de ancho resulta muy pequeño para apreciar detalles y textos analógicos si no dispone de zoom manual interactivo o ampliación táctil.

3. **Jerarquía y Ergonomía de Capas**:
   - Las capas flotantes (selector de modo inferior, botón de contacto, instrucciones de navegación de la constelación) competían espacialmente en pantallas pequeñas.

---

## 2. Decisiones de Diseño y Arquitectura Visual (Frontend Design Constitution)

- **Cabecera Móvil Unificada (Single-Row Bar)**:
  - En móvil, se crea una barra superior fija de altura única (`h-14` / 56px), con fondo translúcido desenfocado (`backdrop-blur-md bg-black/85` o `bg-[#faf8f4]/90` en fotografía).
  - **Zona Izquierda**: Wordmark editorial compacto de Benito G. Quiñones sin subtítulos rotos.
  - **Zona Central/Derecha**:
    - **Selector desplegable de categorías**: Botón táctil ergonómico ($\ge 44\text{px}$) que muestra la categoría activa con chevron indicador (`FOTOGRAFÍA ▾`).
    - **Selector de idioma compacto**: `ES | EN` integrado en el mismo nivel visual sin invadir el centro.
- **Menú Desplegable de Categorías (Dropdown Drawer / Modal)**:
  - Al pulsar sobre la categoría activa, se despliega suavemente un menú vertical accesible con fondo desenfocado y animado (`backdrop-blur-xl bg-black/90` o tono ocre en fotografía).
  - Cada categoría dispone de un área táctil amplia ($\ge 48\text{px}$ de altura), tipografía mono/serif nítida, indicador de categoría seleccionada y cierre automático al pulsar fuera o seleccionar una opción.
  - En pantallas de escritorio ($\ge 768\text{px}$), se mantiene intacta la barra flotante con botones segmentados.
- **Lector de Libretos con Zoom Manual e Interactivo en Móvil**:
  - Se mantiene el formato solicitado de **pliego a doble página**, pero se añade una barra de herramientas de zoom flotante (+ / − / 100% / Ajustar).
  - Soporte de arrastre táctil (pan) cuando el pliego está ampliado, permitiendo examinar el grano, la tipografía y los detalles fotográficos sin perder la sensación de libro abierto.

---

## 3. Plan Paso a Paso de Implementación

### Paso 1: Refactorización de la Cabecera Móvil y Menú Desplegable
- En `FilterControls` (o nuevo subcomponente `MobileHeader`):
  - Crear el estado `isMenuOpen` para controlar la apertura y cierre del menú desplegable de categorías.
  - Diseñar la barra superior compacta en una sola fila fija (`h-14`), coordinada con el tema actual (`dark`, `photography`, `design`, `light`).
  - Integrar el logo de marca a la izquierda y el toggle de idioma a la derecha en el mismo flujo horizontal, eliminando las posiciones absolutas desfasadas en móvil.
  - Renderizar el menú desplegable con animación de entrada (`fade-in` / `slide-down`), listando:
    - `TODOS`
    - `ARQUITECTURA`
    - `DISEÑO`
    - `FOTOGRAFÍA`
    - `ESCENOGRAFÍAS`
    - `CONTACTO`

### Paso 2: Ajuste de Altura y Espaciado de Contenidos
- Ajustar el padding superior (`pt-16 sm:pt-20 md:pt-32`) en:
  - `GalleryView`
  - `OrbitalPage`
  - `ProjectDetailPage`
  - `LibretoViewer`
- Garantizar que ningún elemento inicial quede oculto bajo la cabecera fija y que el scroll sea completamente fluido.

### Paso 3: Zoom Manual e Interactivo en `LibretoViewer`
- Añadir controles de zoom en `LibretoViewer`:
  - Nivel de zoom dinámico: `zoomLevel` (1x, 1.5x, 2x, 2.5x).
  - Botones flotantes compactos: `[ + ]`, `[ − ]`, `[ Restablecer ]`.
  - Capacidad de desplazamiento suave (pan) dentro del contenedor cuando el zoom está activo para explorar cada página del pliego a detalle en teléfonos.

### Paso 4: Pruebas y Verificación Automatizada
- Ejecutar pruebas con Puppeteer simulando viewports móviles (iPhone SE 375x667, Pixel 7 412x915, iPhone 14 Pro 393x852).
- Verificar que:
  - No existan colisiones entre logo, idioma y menú.
  - El menú desplegable abra y cierre sin bloquear la interfaz.
  - La selección de categorías funcione instantáneamente.
  - Los libretos A5 se abran con controles de zoom funcionales.
  - La constelación 3D mantenga su área táctil limpia.
- Compilar la aplicación con `compile_applet`.
