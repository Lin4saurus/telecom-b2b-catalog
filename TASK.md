# TASK.md — Seguimiento de milestones

> Este archivo es la FUENTE DE VERDAD del avance. Al abrirlo, lee primero la BITÁCORA (lo último está arriba).
> Marcadores: [ ] no empezado · [>] en progreso / parcial · [x] completo y verificado

## 🕒 Bitácora (lo último primero)
- 2026-09-11 — M6 en progreso, con un hallazgo importante: se construyó la página `/contact` (`app/contact/page.tsx`) con el componente `ContactForm` (`app/components/ContactForm.tsx`), que valida nombre/email/mensaje obligatorios (empresa opcional), formato de email con regex, muestra errores en español por campo, deshabilita el formulario y cambia el texto del botón durante el envío, y muestra mensajes de éxito (con reseteo del formulario) o de error genérico (sin detalles técnicos) según la respuesta de Supabase. `npm run build` compila sin errores (`/contact` se generó como página estática). Para probar el guardado real hice una prueba directa contra el proyecto de Supabase real de la usuaria (mismo endpoint REST que usa el SDK, con la misma anon key de `.env.local`, sin imprimir sus valores en ningún momento): el INSERT de una fila de prueba en `contacts` fue **rechazado por Postgres con el error de RLS 42501 "new row violates row-level security policy for table contacts"**. Esto contradice el supuesto de que el INSERT público ya estaba permitido: la tabla existe, pero la política de INSERT no está funcionando (falta, está mal definida, o no quedó asociada al rol correcto). No se creó ninguna fila de prueba (el insert falló), así que no hay nada que limpiar en la base. El script usado para la prueba fue temporal y ya se borró del proyecto. **Esto bloquea el criterio "Guarda en Supabase" del M6**: el código está listo y hace exactamente lo esperado, pero hasta que la política de RLS de `contacts` permita el INSERT público de verdad, un envío real del formulario fallará y mostrará el mensaje de error genérico. Se le pidió a la usuaria que revise la política en Supabase (query de diagnóstico y SQL de corrección sugeridos en la respuesta de este turno) y avise cuando esté corregida para repetir la prueba real.
- 2026-09-10 — M5 en progreso: se instaló `@supabase/supabase-js` (única dependencia nueva, autorizada explícitamente) y se creó el cliente reutilizable en `lib/supabase.ts`, que lee `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` desde `.env.local` y lanza un error claro si falta alguna. Verificado sin exponer valores: confirmé por nombre (no por valor) que ambas variables existen en `.env.local`; con una ruta temporal de prueba (creada y luego eliminada) comprobé que quitando `.env.local` la app responde 500 con exactamente nuestro mensaje de error, y restaurando el archivo responde 200 con el cliente creado correctamente. `npm run build` compila sin errores tanto antes como después de esa prueba (se limpió `.next` para descartar tipos en caché de la ruta temporal). Se entregó a la usuaria el SQL de las tablas `contacts` y `quotes` con políticas RLS para que lo ejecute ella misma en el editor SQL de Supabase — no tengo acceso a su cuenta y no pude verificar que las tablas existan ni que acepten inserts reales; eso queda pendiente de que ella lo ejecute y confirme.
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
- [x] Proyecto creado en Supabase, claves en .env.local (hecho en M5: variables presentes y leídas correctamente por la app)
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

### M5 — Base de datos  [>]
- [x] Proyecto Supabase creado y conectado (.env.local) — confirmado: el cliente lee las variables y se conecta de verdad al proyecto real (ver prueba en M6).
- [ ] Tabla de cotizaciones — no tengo confirmación de que ya exista (en el contexto de este milestone la usuaria solo mencionó `contacts`); se revisará puntualmente antes del M7.
- [>] Tabla de contactos — la tabla existe, pero la política de INSERT público **no está funcionando** todavía (ver detalle y hallazgo en la bitácora de hoy). No se puede marcar [x] hasta confirmar que el insert público funciona.
Verificación: las tablas existen y aceptan un insert de prueba. `contacts` existe pero el insert de prueba real (hecho hoy contra el proyecto real de la usuaria) fue rechazado por RLS — ver bitácora. `quotes` todavía no está creada.

### M6 — Formulario de contacto  [>]
- [x] Formulario con validación — página `/contact` con `ContactForm`, valida nombre/email/mensaje obligatorios y formato de email, con mensajes en español y estados enviando/éxito/error.
- [ ] Guarda en Supabase — el código está listo y hace exactamente el `insert` esperado, pero la prueba real contra el proyecto de Supabase de la usuaria falló por una política de RLS que está bloqueando el insert público (ver bitácora). No se puede marcar [x] hasta resolver eso y volver a probar.
Verificación: enviar el formulario crea una fila real en la tabla. **Bloqueado**: ver hallazgo de RLS en la bitácora de hoy; falta que la usuaria revise/corrija la política de INSERT en `contacts` para poder confirmar el guardado real.

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
