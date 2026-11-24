# Despliegue
1. Subir el contenido de esta carpeta a la RAÍZ del repo de GitHub (rama `main`).
2. En Vercel: Add New > Project > importar el repo. Root Directory vacío (`./`). Framework: Other.
3. Cada push a `main` despliega solo (integración Git de Vercel). GitHub Actions corre los tests.
4. Cambiar `WHATSAPP_NEGOCIO` en `src/recursos/js/utilidades.js`.
