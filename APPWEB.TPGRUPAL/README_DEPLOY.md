# Despliegue y CI/CD
1. Subir el repo a GitHub (rama `main`).
2. Importar el repo en Vercel (carpeta de salida `src`, ver `vercel.json`).
3. En GitHub > Settings > Secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
4. Cada push a `main` corre `node --test` y, si pasa, despliega.
5. Cambiar `WHATSAPP_NEGOCIO` en `src/recursos/js/utilidades.js`.
