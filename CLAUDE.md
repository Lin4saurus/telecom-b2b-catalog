# CLAUDE.md — Contexto del proyecto

## Qué es
Telesev Group: sitio web corporativo B2B para un mayorista de telecomunicaciones (empresa ficticia). Muestra soluciones del sector, un catálogo de productos y capta clientes potenciales mediante formularios de cotización y contacto.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth) — se integrará más adelante
- Despliegue en Vercel

## Enlaces
- Repo: https://github.com/Lin4saurus/telecom-b2b-catalog
- Producción: https://telecom-b2b-catalog.vercel.app/

## Catálogo
- Marcas: Kontron, Iskratel, C-Data
- Tecnologías/soluciones: GPON, redes ópticas, fibra óptica

## Cómo correr
- `npm install`
- `npm run dev` (local, http://localhost:3000)
- Deploy automático en Vercel con `git push`
- Variables de entorno en `.env.local` (se agregarán con Supabase)

## Reglas de trabajo (IMPORTANTE)
1. Antes de tocar código, lee CLAUDE.md y TASK.md completos.
2. Trabaja UN milestone a la vez, en orden, hasta dejarlo en [x].
3. No construyas nada que no esté pedido en el milestone actual. Si crees que algo extra ayuda, pregúntame primero; no lo agregues por tu cuenta.
4. Nunca marques un criterio o milestone como [x] sin haberlo verificado de verdad (correr la app, probar el formulario, revisar los datos en Supabase, etc.). Si quedó a medias, márcalo [>] y explica qué falta.
5. No sobre-declares: si algo no funciona o no lo probaste, dilo claramente.
6. Después de cada avance, actualiza TASK.md siguiendo el protocolo escrito en ese archivo.
7. Prioriza alcance pequeño y terminado antes que grande e incompleto.

## Convenciones de código
- Componentes reutilizables, nombres en inglés.
- No agregues dependencias nuevas salvo que sean necesarias; si agregas una, avísame por qué.
