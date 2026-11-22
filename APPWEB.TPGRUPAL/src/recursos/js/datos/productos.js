// Carga del catálogo desde un archivo JSON mediante fetch.
// `productos` y `secciones` son arrays compartidos: se llenan al llamar a cargarCatalogo().
export const secciones = [];
export const productos = [];

const URL_CATALOGO = new URL("../../datos/catalogo.json", import.meta.url);

export async function cargarCatalogo() {
    try {
        const respuesta = await fetch(URL_CATALOGO);
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const datos = await respuesta.json();
        secciones.splice(0, secciones.length, ...datos.secciones);
        productos.splice(0, productos.length, ...datos.productos);
        return true;
    } catch (error) {
        console.error("No se pudo cargar el catálogo:", error);
        return false;
    }
}
