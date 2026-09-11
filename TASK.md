# TASK.md — Seguimiento de milestones

> Este archivo es la FUENTE DE VERDAD del avance. Al abrirlo, lee primero la BITÁCORA (lo último está arriba).
> Marcadores: [ ] no empezado · [>] en progreso / parcial · [x] completo y verificado

## 🕒 Bitácora (lo último primero)
- 2026-09-10 — M4 completado: ruta dinámica `/catalog/[id]` (`app/catalog/[id]/page.tsx`) que busca el producto por id en `data/products.ts` (sin duplicar datos) y muestra nombre, marca, tecnología, descripción corta y `technicalDescription` completa, con enlace "Volver al catálogo". Id inexistente dispara `notFound()` de Next. Se agregó `generateStaticParams` para pre-renderizar las 8 páginas de producto como estáticas. Verificado con `npm run build` (compila sin errores, el build listó las 8 rutas `/catalog/[id]` como SSG) y con `npm run dev`: petición HTTP a `/catalog/kontron-netbox-olt-8000` devuelve 200 con nombre/marca/tecnología/ficha técnica/enlace de vuelta, `/catalog/cdata-splitter-plc-1x16` también 200 con sus datos correctos, y `/catalog/producto-inexistente` devuelve 404. No hice clic manual desde una tarjeta del catálogo en un navegador real (solo verifiqué las URLs por HTTP directamente); dado que los `href` de `ProductCard` ya usaban `product.id` desde el M3, debería funcionar, pero recomiendo que la usuaria confirme el flujo de clic real.
- 2026-09-10 — M3 completado: datos tipados de 8 productos en `data/products.ts` (type Product, brand: Kontron/Iskratel/C-Data, technology: GPON/Redes ópticas/Fibra óptica, con descripción corta y técnica lista para M4). Página `/catalog` con `ProductCard` (tarjeta clickeable a `/catalog/[id]`) y `CatalogView` (filtro por marca y tecnología con botones, estado en cliente vía useState/useMemo, sin dependencias nuevas). Grilla responsive (1 columna en móvil, 2 en tablet, 3 en desktop). Verificado con `npm run build` (compila sin errores, `/catalog` se generó como página estática) y con `npm run dev` + petición HTTP a `/catalog` confirmando que el HTML inicial contiene las 3 marcas, las 3 tecnologías, los 8 enlaces a `/catalog/[id]` y las 8 tarjetas. No pude verificar la interacción de clic en los botones de filtro (requiere ejecutar JS en un navegador real); la lógica de filtrado es simple (useState + filter) y compila sin errores de tipos, pero recomiendo que la usuaria haga clic en los filtros para confirmar visualmente.
- 2026-09-10 — M2 completado: Header (logo tipográfico + SVG propio, nav Inicio/Catálogo/Contacto, menú móvil), Footer (nombre, rubro, año dinámico) y Hero (título/subtítulo/CTA a /catalog) aplicados en app/layout.tsx a todo el sitio. Paleta azul corporativo sobre fondo claro (se quitó el modo oscuro automático para mantener la identidad consistente). Verificado con `npm run build` (compila sin errores) y `npm run dev` + petición HTTP a localhost:3000 confirmando que el HTML renderizado contiene el logo, los 3 enlaces de navegación, el título del hero con "GPON"/"fibra" y el footer con el año actual.
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

### M2 — Layout e identidad  [x]
- [x] Header y footer
- [x] Hero de la home
- [x] Identidad de Telesev Group (logo/nombre, colores)
Verificación: build de producción sin errores (`npm run build`) y home renderizada en `npm run dev` contiene logo, nav completo, hero y footer con año dinámico. Revisado en el HTML servido; no se probó manualmente en distintos anchos de pantalla en un navegador real (recomiendo que la usuaria lo confirme visualmente en local: `npm run dev` → http://localhost:3000, redimensionando la ventana).

### M3 — Catálogo de productos  [x]
- [x] Tarjetas de producto/servicio con navegación
- [x] Marcas integradas (Kontron, Iskratel, C-Data)
- [x] Tecnologías mostradas (GPON, redes ópticas, fibra óptica)
Verificación: `npm run build` sin errores, `/catalog` renderiza 8 tarjetas con marca/tecnología/descripción y enlaces a `/catalog/[id]` (confirmado vía HTTP). Los botones de filtro se ven en el HTML inicial pero el clic (interacción JS en navegador) no se probó de forma automatizada; falta que la usuaria confirme visualmente que filtrar por marca/tecnología funciona.

### M4 — Páginas de detalle  [x]
- [x] Rutas dinámicas por producto/servicio
- [x] Contenido técnico y comercial por ítem
Verificación: `npm run build` sin errores (8 rutas `/catalog/[id]` generadas como estáticas). Por HTTP directo confirmé que `/catalog/kontron-netbox-olt-8000` y `/catalog/cdata-splitter-plc-1x16` devuelven 200 con el nombre, marca, tecnología y ficha técnica correctos, y que `/catalog/producto-inexistente` devuelve 404. No probé el clic desde una tarjeta en un navegador real; falta que la usuaria confirme ese flujo visualmente.

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
