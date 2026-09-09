// ==========================================
// GET CART ITEMS
// ==========================================
export function getCart() {
    const cart = localStorage.getItem("nakasaCart");

    return cart ? JSON.parse(cart) : [];
}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================
export function addToCart(product) {
    const cart = getCart();

    // Check if product already exists
    const existingProduct = cart.find(
        (item) => item._id === product._id
    );

    if (existingProduct) {
        // Product already exists
        // Increase quantity
        existingProduct.quantity += 1;
    } else {
        // New product
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Save cart
    localStorage.setItem(
        "nakasaCart",
        JSON.stringify(cart)
    );

    // Tell Header that cart changed
    window.dispatchEvent(
        new Event("cartUpdated")
    );
}


// ==========================================
// UPDATE CART QUANTITY
// ==========================================
export function updateCartQuantity(productId, quantity) {
    const cart = getCart();

    const updatedCart = cart.map((item) => {
        if (item._id === productId) {
            return {
                ...item,
                quantity: quantity
            };
        }

        return item;
    });

    localStorage.setItem(
        "nakasaCart",
        JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
        new Event("cartUpdated")
    );

    return updatedCart;
}


// ==========================================
// REMOVE PRODUCT FROM CART
// ==========================================
export function removeFromCart(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(
        (item) => item._id !== productId
    );

    localStorage.setItem(
        "nakasaCart",
        JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
        new Event("cartUpdated")
    );

    return updatedCart;
}