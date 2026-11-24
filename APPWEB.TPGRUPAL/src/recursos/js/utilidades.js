// Funciones auxiliares reutilizables (sin acceso al DOM de una página en particular).
 
export const COSTO_ENVIO = 3000;
export const ENVIO_GRATIS_DESDE = 50000;
 
export function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-AR");
}
 
export function calcularTotales(subtotal) {
    const envio = subtotal === 0 || subtotal >= ENVIO_GRATIS_DESDE ? 0 : COSTO_ENVIO;
    return { subtotal, envio, total: subtotal + envio };
}
 
// Crea un elemento con clase y texto. Evita repetir createElement en cada vista.
export function crearElemento(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
}
 
export function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Acepta teléfonos argentinos con o sin prefijos (+54, 9, 0, 15), espacios o guiones.
export function validarTelefono(texto) {
    const digitos = String(texto).replace(/[\s\-()+]/g, "");
    return /^\d{8,13}$/.test(digitos);
}

export const WHATSAPP_NEGOCIO = "5493510000000"; // REEMPLAZAR por el número real del negocio

export function armarMensajeWhatsApp(pedido) {
    const lineas = pedido.items.map((i) => `• ${i.cantidad} × ${i.nombre} — ${formatearPrecio(i.subtotal)}`);
    return [
        `Hola Molido Café! Quiero confirmar el pedido ${pedido.numero}:`,
        ...lineas,
        `Envío: ${formatearPrecio(pedido.envio)}`,
        `Total: ${formatearPrecio(pedido.total)}`,
        `Nombre: ${pedido.cliente.nombre}`,
        `Dirección: ${pedido.cliente.direccion}`,
        `Pago: ${pedido.cliente.pago}`,
    ].join("\n");
}

export function urlWhatsApp(pedido) {
    return `https://wa.me/${WHATSAPP_NEGOCIO}?text=${encodeURIComponent(armarMensajeWhatsApp(pedido))}`;
}
