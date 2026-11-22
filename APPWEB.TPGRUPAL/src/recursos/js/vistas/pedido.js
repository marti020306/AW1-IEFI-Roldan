// Vista: datos de entrega y pago (paso 2 del proceso de compra).
import { guardarPedido, obtenerItemsDetallados, vaciarCarrito, calcularSubtotal } from "../almacen.js";
import { calcularTotales, crearElemento, formatearPrecio, urlWhatsApp, validarTelefono } from "../utilidades.js";
import { actualizarResumen } from "./resumen.js";

function renderizarProductos(lista, items) {
    lista.replaceChildren(
        ...items.map(({ producto, cantidad, subtotal }) =>
            crearElemento(
                "li",
                "resumen__producto",
                `${cantidad} × ${producto.nombre} — ${formatearPrecio(subtotal)}`
            )
        )
    );
}

export function iniciarPedido() {
    const items = obtenerItemsDetallados();

    // Sin productos no tiene sentido continuar: se vuelve al carrito.
    if (items.length === 0) {
        window.location.replace("./carrito.html");
        return;
    }

    renderizarProductos(document.querySelector("#resumen-productos"), items);
    actualizarResumen();

    const form = document.querySelector("#form-pedido");
    const telefono = form.querySelector("#id-telefono");
    telefono.addEventListener("input", () => {
        telefono.setCustomValidity(validarTelefono(telefono.value) ? "" : "Ingresá un teléfono válido (8 a 13 dígitos).");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        const datos = Object.fromEntries(new FormData(form));
        const totales = calcularTotales(calcularSubtotal());

        const pedido = {
            numero: "MC-" + Date.now().toString().slice(-6),
            cliente: datos,
            items: items.map(({ producto, cantidad, subtotal }) => ({
                nombre: producto.nombre,
                cantidad,
                subtotal,
            })),
            ...totales,
        };
        guardarPedido(pedido);
        // Envío del pedido por WhatsApp (se abre en una pestaña nueva).
        try {
            window.open(urlWhatsApp(pedido), "_blank", "noopener");
        } catch (error) {
            console.error("No se pudo abrir WhatsApp:", error);
        }
        vaciarCarrito();
        window.location.href = "./confirmacion.html";
    });
}