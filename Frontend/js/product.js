import { catalogo } from "./catalog.js";

const STORAGE_KEY = "catalogo_pure";

// Guardar en localStorage si aún no existe (o actualizarlo) y recuperarlo
function obtenerCatalogoLocal() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogo));
    }
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// Generar las cards de Bootstrap en el div #Products
function renderizarProductos() {
    const contenedor = document.getElementById("Products");
    if (!contenedor) return;

    const productos = obtenerCatalogoLocal();
    contenedor.innerHTML = ""; // Limpiar contenido previo

    productos.forEach((producto) => {
        // Manejar si material es string o array (ej. Chamarra)
        const textoMaterial = Array.isArray(producto.material) ?
            producto.material.join(" / ") :
            producto.material;

        // Generar opciones para el selector de variantes (Color y Material si aplica)
        const opcionesVariantes = producto.variantes
            .map((variante, index) => {
                const etiqueta = variante.material ?
                    `${variante.color} (${variante.material})` :
                    variante.color;
                return `<option value="${index}" data-precio="${variante.precio}">${etiqueta} - $${variante.precio}</option>`;
            })
            .join("");

        // Estructura de Card Bootstrap 5 (Grid responsivo)
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

        col.innerHTML = `
            <div class="card h-100 shadow-sm" data-id="${producto.id}">
                <img src="${producto.img}"
                     class="card-img-top object-fit-cover" 
                     alt="${producto.tipoPrenda} ${producto.modelo}">
                
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-secondary">${producto.genero}</span>
                        <small class="text-muted">${producto.tipoPrenda}</small>
                    </div>

                    <h5 class="card-title mb-1">${producto.modelo}</h5>
                    <p class="card-text text-muted small mb-3">Material: ${textoMaterial}</p>

                    <!-- Selectores de variante y talla -->
                    <div class="mb-2">
                        <label class="form-label small mb-1 fw-semibold">Color / Variante:</label>
                        <select class="form-select form-select-sm select-variante">
                            ${opcionesVariantes}
                        </select>
                    </div>
                </div>
            </div>
        `;

        // Evento para actualizar el precio visualmente al cambiar de color/material
        const selectVariante = col.querySelector(".select-variante");
        const precioDisplay = col.querySelector(".precio-display");

        selectVariante.addEventListener("change", (e) => {
            const opcionSeleccionada = e.target.selectedOptions[0];
            const nuevoPrecio = opcionSeleccionada.dataset.precio;
            precioDisplay.textContent = `$${nuevoPrecio}`;
        });

        contenedor.appendChild(col);
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", renderizarProductos);