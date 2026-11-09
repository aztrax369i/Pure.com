document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll("[data-card]");

    cards.forEach((card) => {

        card.addEventListener("click", (event) => {

            /*
             * Evita que al presionar LinkedIn o GitHub
             * se active también la animación de la tarjeta.
             */
            if (
                event.target.closest(".social-link")
            ) {
                return;
            }

            /*
             * Evita que el botón genere comportamientos
             * adicionales al evento de la tarjeta.
             */
            if (
                event.target.closest(".flip-button")
            ) {
                card.classList.toggle("is-flipped");
                return;
            }

            card.classList.toggle("is-flipped");
        });

    });

});