let cart = []; // Array para almacenar los productos del carrito

// Función para agregar un producto al carrito
function addToCart(name, price) {
    const cantidad = parseInt(document.getElementById("cantidad").value) || 1;
    for (let i = 0; i < cantidad; i++) {
        cart.push({ name, price });
    }
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.querySelector(".cart-count");
    let payButton = document.getElementById("pay-button");

    // Limpiar los elementos previos del carrito
    cartItems.innerHTML = "";

    let total = 0;

    // Mostrar productos en el carrito
    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.textContent = `${item.name} - $${item.price} COP`;

        // Botón para eliminar
        let removeButton = document.createElement("button");
        removeButton.textContent = "Eliminar";
        removeButton.style.marginLeft = "10px";
        removeButton.onclick = () => removeItem(index);
        div.appendChild(removeButton);

        cartItems.appendChild(div);
        total += item.price;
    });

    // Mostrar total y cantidad de productos
    cartTotal.textContent = `Total: $${total} COP`;
    cartCount.textContent = cart.length;

    // Mostrar u ocultar el botón de pago según si el carrito tiene productos
    payButton.style.display = cart.length > 0 ? "block" : "none";
}

// Función para mostrar u ocultar el carrito
function toggleCart() {
    let cart = document.getElementById("cart");
    cart.style.display = cart.style.display === "block" ? "none" : "block";
}

// Función para cerrar el carrito
function closeCart() {
    let cart = document.getElementById("cart");
    cart.style.display = "none";
}

// Función para eliminar un producto del carrito
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Función para procesar el pago
function processPayment() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de pagar.");
        return;
    }

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    alert(`Redirigiendo al pago. Total: $${total} COP`);

    // Redirección a PayPal (puedes cambiar esto por otra integración de pago)
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=tu_correo@paypal.com&amount=${total}&currency_code=COP&item_name=Compra+en+DealerStore`;
    window.location.href = paypalUrl;
}

// Asignar evento al botón de añadir al carrito
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const productName = this.getAttribute("data-name");
        const productPrice = parseInt(this.getAttribute("data-price"));
        addToCart(productName, productPrice);
    });
});
