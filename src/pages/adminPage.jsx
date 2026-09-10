import { useState } from "react";
import { getCart } from "../utils/cartUtils";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // ==========================================
    // BUY NOW PRODUCT
    // ==========================================
    const buyNowProduct = location.state?.buyNowProduct;

    // ==========================================
    // CHECKOUT ITEMS
    // ==========================================
    const [cart] = useState(
        buyNowProduct
            ? [{ ...buyNowProduct, quantity: 1 }]
            : getCart()
    );

    // ==========================================
    // CUSTOMER INFORMATION
    // ==========================================
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
    });

    // ==========================================
    // LOADING STATE
    // ==========================================
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // ==========================================
    // FORM CHANGE
    // ==========================================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // ==========================================
    // PRICE CALCULATIONS
    // ==========================================
    const subtotal = cart.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
                Number(item.quantity || 0),
        0
    );

    const deliveryFee = 300;
    const total = subtotal + deliveryFee;

    // ==========================================
    // PLACE ORDER
    // ==========================================
    const handlePlaceOrder = async () => {
        // Prevent double click
        if (isPlacingOrder) {
            return;
        }

        // Check cart
        if (!cart || cart.length === 0) {
            alert("Your cart is empty.");
            navigate("/products");
            return;
        }

        // ==========================================
        // VALIDATE CUSTOMER INFORMATION
        // ==========================================
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "phone",
            "address",
            "city",
            "postalCode",
        ];

        for (const field of requiredFields) {
            if (!formData[field].trim()) {
                alert("Please fill in all customer information.");
                return;
            }
        }

        // ==========================================
        // EMAIL VALIDATION
        // ==========================================
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // ==========================================
        // PHONE VALIDATION
        // ==========================================
        const phoneDigits = formData.phone.replace(
            /\D/g,
            ""
        );

        if (phoneDigits.length < 9) {
            alert("Please enter a valid phone number.");
            return;
        }

        try {
            setIsPlacingOrder(true);

            // ==========================================
            // CONVERT CART TO ORDER ITEMS
            // ==========================================
            const orderItems = cart.map((item) => ({
                productId: item._id,
                name: item.name,
                price: Number(item.price),
                quantity: Number(item.quantity),
                image: item.image,
            }));

            // ==========================================
            // CREATE ORDER
            // ==========================================
            const order = {
                customer: {
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    address: formData.address.trim(),
                    city: formData.city.trim(),
                    postalCode: formData.postalCode.trim(),
                },

                items: orderItems,

                // Backend will calculate the final
                // price again for security.
                subtotal,
                deliveryFee,
                total,

                paymentMethod: "Cash on Delivery",
            };

            // ==========================================
            // SEND TO BACKEND
            // ==========================================
            const response = await fetch(
                `${API_URL}/orders`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(order),
                }
            );

            const data = await response.json();

            // ==========================================
            // BACKEND ERROR
            // ==========================================
            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to create order."
                );
            }

            // ==========================================
            // SAVE LAST ORDER
            // ==========================================
            if (data.order) {
                localStorage.setItem(
                    "nakasaLastOrder",
                    JSON.stringify(data.order)
                );
            }

            // ==========================================
            // CLEAR CART
            // ==========================================
            if (!buyNowProduct) {
                localStorage.removeItem("nakasaCart");

                window.dispatchEvent(
                    new Event("cartUpdated")
                );
            }

            // ==========================================
            // SUCCESS
            // ==========================================
            alert(
                "Order placed successfully! 🎉"
            );

            navigate("/order-confirmation");

        } catch (error) {
            console.error(
                "Order error:",
                error
            );

            alert(
                error.message ||
                    "Something went wrong while placing your order."
            );
        } finally {
            setIsPlacingOrder(false);
        }
    };

    // ==========================================
    // EMPTY CART
    // ==========================================
    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-16">
                <div className="mx-auto max-w-xl text-center">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Checkout
                    </h1>

                    <p className="mt-4 text-gray-500">
                        Your cart is empty.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                        className="mt-8 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        Continue Shopping
                    </button>

                </div>
            </div>
        );
    }

    // ==========================================
    // PAGE
    // ==========================================
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">

            <div className="mx-auto max-w-7xl">

                {/* ==================================
                    PAGE HEADER
                ================================== */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Checkout
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Complete your order
                    </p>
                </div>

                {/* ==================================
                    MAIN GRID
                ================================== */}
                <div className="mt-8 grid gap-8 lg:grid-cols-3">

                    {/* ==================================
                        LEFT SIDE
                    ================================== */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* ==================================
                            CUSTOMER INFORMATION
                        ================================== */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-semibold text-gray-900">
                                Customer Information
                            </h2>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">

                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={
                                        formData.firstName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        isPlacingOrder
                                    }
                                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
                                />

                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={
                                        formData.lastName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        isPlacingOrder
                                    }
                                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
                                />

                            </div>

                            <div className="mt-4 grid gap-4 md:grid-cols-2">

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        isPlacingOrder
                                    }
                                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        isPlacingOrder
                                    }
                                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
                                />

                            </div>

                        </div>

                        {/* ==================================
                            DELIVERY ADDRESS
                        ================================== */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-semibold text-gray-900">
                                Delivery Address
                            </h2>

                            <div className="mt-6 space-y-4">

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Street Address"
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        isPlacingOrder
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
                                />

                                <div className="grid gap-4 md:grid-cols-2">

                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={
                                            formData.city
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        disabled={
                                            isPlacingOrder
                                        }
                                        className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
                                    />

                                    <input
                                        type="text"
                                        name="postalCode"
                                        placeholder="Postal Code"
                                        value={
                                            formData.postalCode
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        disabled={
                                            isPlacingOrder
                                        }
                                        className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* ==================================
                            PAYMENT METHOD
                        ================================== */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-semibold text-gray-900">
                                Payment Method
                            </h2>

                            <div className="mt-6">

                                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4">

                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        defaultChecked
                                        disabled={
                                            isPlacingOrder
                                        }
                                        className="h-4 w-4"
                                    />

                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Cash on Delivery
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Pay when your order is delivered.
                                        </p>
                                    </div>

                                </label>

                            </div>

                        </div>

                    </div>

                    {/* ==================================
                        ORDER SUMMARY
                    ================================== */}
                    <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

                        <h2 className="text-xl font-semibold text-gray-900">
                            Your Order
                        </h2>

                        {/* PRODUCTS */}
                        <div className="mt-6 space-y-5">

                            {cart.map((item) => (

                                <div
                                    key={item._id}
                                    className="flex gap-4"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-14 rounded-lg bg-gray-100 object-cover"
                                    />

                                    <div className="min-w-0 flex-1">

                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {item.name}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Qty:{" "}
                                            {item.quantity}
                                        </p>

                                    </div>

                                    <p className="text-sm font-semibold text-gray-900">
                                        Rs.{" "}
                                        {(
                                            Number(
                                                item.price
                                            ) *
                                            Number(
                                                item.quantity
                                            )
                                        ).toLocaleString()}
                                    </p>

                                </div>

                            ))}

                        </div>

                        <div className="my-6 border-t border-gray-200" />

                        {/* SUBTOTAL */}
                        <div className="flex justify-between text-sm">

                            <span className="text-gray-500">
                                Subtotal
                            </span>

                            <span className="font-medium text-gray-900">
                                Rs.{" "}
                                {subtotal.toLocaleString()}
                            </span>

                        </div>

                        {/* DELIVERY */}
                        <div className="mt-4 flex justify-between text-sm">

                            <span className="text-gray-500">
                                Delivery
                            </span>

                            <span className="font-medium text-gray-900">
                                Rs.{" "}
                                {deliveryFee.toLocaleString()}
                            </span>

                        </div>

                        <div className="my-6 border-t border-gray-200" />

                        {/* TOTAL */}
                        <div className="flex items-center justify-between">

                            <span className="font-semibold text-gray-900">
                                Total
                            </span>

                            <span className="text-xl font-bold text-gray-900">
                                Rs.{" "}
                                {total.toLocaleString()}
                            </span>

                        </div>

                        {/* ==================================
                            PLACE ORDER
                        ================================== */}
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            disabled={isPlacingOrder}
                            className="mt-6 flex w-full items-center justify-center rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            {isPlacingOrder
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/cart")
                            }
                            disabled={isPlacingOrder}
                            className="mt-3 w-full rounded-full border border-gray-300 py-3.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Back to Cart
                        </button>

                        <p className="mt-4 text-center text-xs text-gray-400">
                            By placing your order, you agree
                            to our terms and conditions.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}