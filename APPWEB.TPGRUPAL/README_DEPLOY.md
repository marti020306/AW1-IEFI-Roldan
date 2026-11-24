# Despliegue
1. El repo de GitHub tiene como raíz la carpeta que contiene `APPWEB.TPGRUPAL/` y `.github/`.
2. En Vercel: Settings > General > Root Directory = `APPWEB.TPGRUPAL`. Framework: Other.
3. Cada push a `main` despliega solo (integración Git de Vercel). GitHub Actions corre los tests.
4. Cambiar `WHATSAPP_NEGOCIO` en `src/recursos/js/utilidades.js`.
