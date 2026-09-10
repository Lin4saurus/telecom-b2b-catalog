# TASK.md — Seguimiento de milestones

> Este archivo es la FUENTE DE VERDAD del avance. Al abrirlo, lee primero la BITÁCORA (lo último está arriba).
> Marcadores: [ ] no empezado · [>] en progreso / parcial · [x] completo y verificado

## 🕒 Bitácora (lo último primero)
- 2026-09-09 — Proyecto Next.js creado, subido a GitHub y desplegado en Vercel. Sistema de milestones configurado.

## 🔄 Protocolo de actualización (para el agente)
Cada vez que avances:
1. Actualiza los marcadores de los criterios y del milestone ([ ] → [>] → [x]).
2. Agrega UNA línea nueva ARRIBA en la Bitácora: fecha, qué hiciste y cómo lo verificaste.
3. Nunca pongas [x] sin verificación real. Si quedó a medias: [>] + nota de qué falta.
4. Cuando termines un milestone, di cuál sigue y detente para que yo revise.

## 🎯 Milestones

### M1 — Setup y despliegue  [x]
- [x] Proyecto Next.js + TypeScript + Tailwind creado
- [x] Repositorio en GitHub
- [x] Deploy funcionando en Vercel
- [ ] Proyecto creado en Supabase, claves en .env.local (pendiente, se hará en M5)
Verificación: la URL de Vercel abre sin errores.

### M2 — Layout e identidad  [ ]
- [ ] Header y footer
- [ ] Hero de la home
- [ ] Identidad de Telesev Group (logo/nombre, colores)
Verificación: la home se ve completa y responsive.

### M3 — Catálogo de productos  [ ]
- [ ] Tarjetas de producto/servicio con navegación
- [ ] Marcas integradas (Kontron, Iskratel, C-Data)
- [ ] Tecnologías mostradas (GPON, redes ópticas, fibra óptica)
Verificación: el catálogo lista los productos y se puede navegar.

### M4 — Páginas de detalle  [ ]
- [ ] Rutas dinámicas por producto/servicio
- [ ] Contenido técnico y comercial por ítem
Verificación: entrar a un producto muestra su detalle correcto.

### M5 — Base de datos  [ ]
- [ ] Proyecto Supabase creado y conectado (.env.local)
- [ ] Tabla de cotizaciones
- [ ] Tabla de contactos
Verificación: las tablas existen y aceptan un insert de prueba.

### M6 — Formulario de contacto  [ ]
- [ ] Formulario con validación
- [ ] Guarda en Supabase
Verificación: enviar el formulario crea una fila real en la tabla.

### M7 — Formulario dinámico de cotización  [ ]
- [ ] Formulario que se adapta según el producto/servicio elegido
- [ ] Guarda en Supabase
Verificación: una cotización de prueba queda registrada correctamente.

### M8 — Panel admin con login  [ ]
- [ ] Login con Supabase Auth
- [ ] Vista que lista cotizaciones y contactos recibidos
Verificación: entrar con usuario válido muestra los registros; sin login, no.

### M9 — Pulido  [ ]
- [ ] Responsive en móvil
- [ ] SEO (metaetiquetas)
- [ ] Estados de carga y manejo de errores
Verificación: la app se ve y responde bien en móvil y desktop.

### M10 — Cierre  [ ]
- [ ] Deploy final
- [ ] README tipo caso de estudio
- [ ] Demo grabado (2 min)
Verificación: la app en producción funciona de punta a punta.
