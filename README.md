# Tablero Evento vs VS

Panel estático en HTML, CSS y JavaScript que alinea los siete días del Evento con los seis días del VS para resaltar:

- Bloques de 4 horas del Evento.
- El mejor duelo (mayor puntaje) de cada día del VS.
- El rango horario activo en función de la hora local del navegador.
- El estado actual ("Hoy" y "Mañana") según el contexto entregado.

## Características

- **Datos embebidos**: El cronograma completo del Evento y las tareas del VS se modelan en `app.js`.
- **Coincidencias por día**: Cada día del Evento agrupa todas sus franjas de 4 horas junto con el día del VS que le genera más sinergia.
- **Columna de duelos premium**: La última columna resume el objetivo con mayor puntaje disponible para ese día del VS.
- **Resumen de temas**: Cada tema del Evento muestra una descripción corta basada en guías comunitarias de *Last War Survival* para que sepas qué acciones ejecutar.
- **Resaltado dinámico**: Cada minuto se recalcula el bloque activo. Ejemplo: a las 11:00 se ilumina la franja 09:00–13:00.
- **Etiquetas contextuales**: "Hoy" y "Mañana" se aplican tanto al Evento como al VS siguiendo la descripción proporcionada (día 4 / día 5 hoy, día 5 / día 6 mañana).
- **Vista previa del siguiente VS**: El día 7 del Evento muestra el mejor duelo del próximo Día 1 del VS para preparar recursos con antelación.

## Uso

1. Abre `index.html` en tu navegador preferido (JavaScript debe estar habilitado).
2. Observa los paneles superiores para identificar la coincidencia del día actual y del siguiente.
3. Usa la tabla para cruzar:
   - Tema del Evento según la franja vigente.
   - Día del VS asociado.
   - Duelo recomendado para puntuar más alto.
4. La celda del rango horario en curso mostrará una sombra suave y la etiqueta "Ahora".

> Las descripciones de cada tema se sintetizan a partir de guías y videos comunitarios de *Last War Survival* (ej. compilaciones tipo playlist mencionada por el usuario); ajusta el texto en `themeDetails` si tu servidor usa otras denominaciones.

> Nota: Si el contexto del servidor cambia (por ejemplo, cuando se avance al día 6 del Evento), ajusta los valores `timelineContext` en `app.js` para reflejar los nuevos días de "Hoy" y "Mañana".

## Estructura

```
├── index.html      # Maquetado principal del tablero
├── styles.css      # Estilos con paleta suave y responsiva
├── app.js          # Datos del Evento/VS y lógica dinámica
└── .github/
    └── copilot-instructions.md
```

## Personalización

- **Cambio de colores**: modifica las variables CSS en `styles.css`.
- **Duración de franjas**: si el evento usa otro tamaño de bloque, ajusta `SLOT_DURATION_HOURS` en `app.js`.
- **Duelo prioritario**: los valores se calculan automáticamente tomando la tarea con más puntos por día del VS; agrega nuevas tareas al arreglo correspondiente si se actualiza la tabla.

## Requisitos

- Navegador moderno capaz de ejecutar ES6 (Chrome, Edge Chromium, Firefox, Safari recientes).
- JavaScript habilitado (se muestra un mensaje si está desactivado).
- No se necesita compilación ni dependencias externas; basta con abrir el archivo HTML directamente.
