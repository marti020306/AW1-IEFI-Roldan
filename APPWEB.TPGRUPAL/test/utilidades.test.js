import { test } from "node:test";
import assert from "node:assert/strict";
import { formatearPrecio, calcularTotales, normalizar, validarTelefono, urlWhatsApp, COSTO_ENVIO, ENVIO_GRATIS_DESDE } from "../src/recursos/js/utilidades.js";

test("formatearPrecio usa separador de miles es-AR", () => {
    assert.equal(formatearPrecio(9500), "$9.500");
});

test("calcularTotales suma el envío cuando no alcanza el mínimo", () => {
    assert.deepEqual(calcularTotales(10000), { subtotal: 10000, envio: COSTO_ENVIO, total: 10000 + COSTO_ENVIO });
});

test("calcularTotales ofrece envío gratis desde el monto mínimo", () => {
    assert.equal(calcularTotales(ENVIO_GRATIS_DESDE).envio, 0);
});

test("calcularTotales con carrito vacío no cobra envío", () => {
    assert.equal(calcularTotales(0).total, 0);
});

test("normalizar quita tildes y pasa a minúsculas", () => {
    assert.equal(normalizar("Café Pastelería"), "cafe pasteleria");
});

test("validarTelefono acepta formatos comunes y rechaza inválidos", () => {
    assert.equal(validarTelefono("+54 9 351 123-4567"), true);
    assert.equal(validarTelefono("abc"), false);
    assert.equal(validarTelefono("123"), false);
});

test("urlWhatsApp arma el enlace wa.me con el pedido codificado", () => {
    const pedido = { numero: "MC-1", items: [{ cantidad: 1, nombre: "Café", subtotal: 100 }], envio: 0, total: 100, cliente: { nombre: "Ana", direccion: "X 1", pago: "Efectivo" } };
    const url = urlWhatsApp(pedido);
    assert.ok(url.startsWith("https://wa.me/"));
    assert.ok(url.includes("MC-1"));
});
