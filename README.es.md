# Telesev Group — Sitio B2B para mayorista de telecomunicaciones

Telesev Group es un sitio corporativo pensado para un mayorista B2B de telecomunicaciones: una empresa que no le vende al consumidor final, sino a otros operadores e integradores que necesitan equipamiento de fibra óptica, redes GPON y redes ópticas en general.

El problema que resuelve es simple pero típico del rubro: un mayorista técnico necesita mostrar su catálogo de forma clara, transmitir seriedad frente a clientes corporativos, y sobre todo **convertir visitas en oportunidades de venta reales** — ya sea alguien que quiere que lo contacten, o alguien que ya sabe qué producto le interesa y quiere una cotización. El sitio está diseñado alrededor de ese embudo: catálogo → producto → cotización, con un canal de contacto general en paralelo, y un panel interno donde el equipo comercial revisa lo que va entrando.

**Sitio en producción:** https://telecom-b2b-catalog.vercel.app

## Funcionalidades principales

- **Catálogo con filtros** — los productos se pueden filtrar por marca (Kontron, Iskratel, C-Data) y por tecnología (GPON, redes ópticas, fibra óptica), para que un visitante técnico encuentre rápido lo que busca.
- **Páginas de detalle por producto** — cada producto tiene su propia página con ficha comercial y técnica, generada dinámicamente a partir de una única fuente de datos.
- **Formulario de contacto** — para consultas generales, con validación en español y confirmación clara de envío.
- **Formulario de cotización dinámico** — si el visitante pide cotización desde un producto puntual, el formulario ya sabe de qué producto se trata (no lo tiene que tipear); también admite una cotización general sin producto asociado.
- **Panel administrativo protegido** — el equipo de Telesev Group puede loguearse y ver las cotizaciones y contactos recibidos en un solo lugar, sin que esa información sea accesible para nadie más.

## Stack tecnológico

- **Next.js (App Router) + TypeScript** — rutas estáticas para el catálogo y las fichas de producto (rápidas y buenas para SEO), y rutas dinámicas donde hace falta interactividad real (formularios, panel admin).
- **Tailwind CSS** — para mantener una identidad visual consistente (azul corporativo, tipografía y espaciados uniformes) sin escribir CSS a mano en cada componente.
- **Supabase (Postgres + Auth)** — base de datos para guardar contactos y cotizaciones, y autenticación para proteger el panel admin, sin tener que mantener un backend propio.
- **Vercel** — despliegue continuo: cada cambio en la rama principal se publica automáticamente.

## Arquitectura y decisiones de diseño

- **Los datos del catálogo viven en el código (`data/products.ts`), no en la base de datos.** Es un catálogo curado y estable (marcas y tecnologías del mayorista), no contenido que cambie todo el tiempo ni que necesite un panel de edición — así que tenerlo tipado en TypeScript es más simple que sumarle una tabla y una pantalla de administración solo para eso.
- **Las tablas de `contacts` y `quotes` usan Row Level Security (RLS) de Postgres.** La clave pública del sitio (`anon key`) solo tiene permiso para *insertar* filas en esas tablas — nunca para leerlas. Esto es intencional: cualquiera puede enviar un formulario, pero nadie puede usar esa misma clave pública para husmear los contactos o cotizaciones de otros. La lectura está permitida únicamente a usuarios autenticados, que es exactamente lo que necesita el panel admin.
- **El panel admin (`/admin`) no está enlazado desde ningún menú público.** Se accede por URL directa, valida la sesión con Supabase Auth apenas carga y, si no hay sesión, redirige al login sin llegar a pedir ni mostrar ningún dato. Es una capa de seguridad simple pero efectiva para una zona que no necesita descubrirse desde la navegación pública.
- **Las páginas de producto se generan de forma estática** (`generateStaticParams`), porque el catálogo no cambia en tiempo real — así cargan rápido y no dependen de una consulta en cada visita.

## Cómo correr el proyecto localmente

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/Lin4saurus/telecom-b2b-catalog.git
   cd telecom-b2b-catalog
   ```

2. Instalá las dependencias:
   ```bash
   npm install
   ```

3. Creá un archivo `.env.local` en la raíz del proyecto con estas variables (los valores de Supabase se consiguen en tu propio proyecto, en *Project Settings → API*):
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=

   # Opcionales, solo si querés recibir un email por cada cotización nueva
   RESEND_API_KEY=
   QUOTE_NOTIFICATION_EMAIL=
   QUOTE_NOTIFICATION_FROM=
   QUOTE_WEBHOOK_SECRET=
   ```
   > Este archivo nunca se sube al repositorio (está en `.gitignore`) — cada quien usa sus propias claves.

4. Corré el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abrí [http://localhost:3000](http://localhost:3000).

Para que el sitio funcione de punta a punta hace falta además tener, del lado de Supabase: las tablas `contacts` y `quotes` creadas, las políticas de RLS descriptas arriba, y un usuario en Authentication para poder entrar al panel admin.

## Despliegue

El sitio se despliega automáticamente en Vercel con cada `git push` a la rama principal. Las mismas variables de entorno (`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`) están configuradas en el proyecto de Vercel.
