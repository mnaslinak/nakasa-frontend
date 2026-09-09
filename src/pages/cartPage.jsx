import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

import {
    getCart,
    updateCartQuantity,
    removeFromCart,
} from "../utils/cartUtils";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());

    // ==============================
    // SUBTOTAL
    // ==============================
    const subtotal = cart.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    // ==============================
    // INCREASE QUANTITY
    // ==============================
    const increaseQuantity = (id, currentQuantity) => {
        const updatedCart = updateCartQuantity(
            id,
            currentQuantity + 1
        );

        setCart(updatedCart);
    };

    // ==============================
    // DECREASE QUANTITY
    // ==============================
    const decreaseQuantity = (id, currentQuantity) => {
        if (currentQuantity <= 1) {
            return;
        }

        const updatedCart = updateCartQuantity(
            id,
            currentQuantity - 1
        );

        setCart(updatedCart);
    };

    // ==============================
    // REMOVE PRODUCT
    // ==============================
    const removeProduct = (id) => {
        const updatedCart = removeFromCart(id);

        setCart(updatedCart);
    };

    // ==============================
    // EMPTY CART
    // ==============================
    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-16">
                <div className="mx-auto max-w-3xl text-center">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Your Cart
                    </h1>

                    <p className="mt-4 text-gray-500">
                        Your shopping cart is empty.
                    </p>

                    <Link
                        to="/products"
                        className="mt-8 inline-block rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Continue Shopping
                    </Link>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">

            <div className="mx-auto max-w-6xl">

                {/* ==============================
                    PAGE TITLE
                ============================== */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Shopping Cart
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {cart.length}{" "}
                        {cart.length === 1 ? "item" : "items"} in your cart
                    </p>
                </div>


                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* ==============================
                        CART ITEMS
                    ============================== */}
                    <div className="lg:col-span-2">

                        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">

                            {cart.map((item) => (

                                <div
                                    key={item._id}
                                    className="flex gap-4 border-b border-gray-200 py-5 last:border-b-0"
                                >

                                    {/* PRODUCT IMAGE */}
                                    <Link
                                        to={`/product/${item._id}`}
                                        className="shrink-0"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-28 w-24 rounded-xl object-cover bg-gray-100"
                                        />
                                    </Link>


                                    {/* PRODUCT DETAILS */}
                                    <div className="flex min-w-0 flex-1 flex-col justify-between">

                                        <div>

                                            {/* CATEGORY */}
                                            <p className="text-xs uppercase tracking-wider text-gray-400">
                                                {item.category}
                                            </p>

                                            {/* NAME */}
                                            <Link
                                                to={`/product/${item._id}`}
                                            >
                                                <h2 className="mt-1 truncate text-sm font-semibold text-gray-900 hover:text-gray-600 sm:text-base">
                                                    {item.name}
                                                </h2>
                                            </Link>

                                            {/* PRICE */}
                                            <p className="mt-2 text-sm font-bold text-gray-900">
                                                Rs.{" "}
                                                {Number(
                                                    item.price
                                                ).toLocaleString()}
                                            </p>

                                        </div>


                                        {/* QUANTITY + DELETE */}
                                        <div className="mt-4 flex items-center justify-between">

                                            {/* QUANTITY */}
                                            <div className="flex items-center rounded-full border border-gray-200">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item._id,
                                                            item.quantity
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100"
                                                >
                                                    <FaMinus size={11} />
                                                </button>

                                                <span className="w-8 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item._id,
                                                            item.quantity
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100"
                                                >
                                                    <FaPlus size={11} />
                                                </button>

                                            </div>


                                            {/* REMOVE */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeProduct(
                                                        item._id
                                                    )
                                                }
                                                className="flex items-center gap-2 text-sm text-red-500 transition hover:text-red-700"
                                            >
                                                <FaTrash size={13} />
                                                <span className="hidden sm:inline">
                                                    Remove
                                                </span>
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* ==============================
                        ORDER SUMMARY
                    ============================== */}
                    <div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold text-gray-900">
                                Order Summary
                            </h2>


                            {/* SUBTOTAL */}
                            <div className="mt-6 flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span className="font-medium text-gray-900">
                                    Rs.{" "}
                                    {subtotal.toLocaleString()}
                                </span>
                            </div>


                            {/* DELIVERY */}
                            <div className="mt-4 flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    Delivery
                                </span>

                                <span className="font-medium text-gray-900">
                                    Rs. 300
                                </span>
                            </div>


                            {/* DIVIDER */}
                            <div className="my-5 border-t border-gray-200" />


                            {/* TOTAL */}
                            <div className="flex items-center justify-between">

                                <span className="text-base font-semibold text-gray-900">
                                    Total
                                </span>

                                <span className="text-xl font-bold text-gray-900">
                                    Rs.{" "}
                                    {(subtotal + 300).toLocaleString()}
                                </span>

                            </div>


                            {/* CHECKOUT BUTTON */}
                            <Link
                                to="/checkout"
                                className="mt-6 flex w-full items-center justify-center rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                            >
                                Proceed to Checkout
                            </Link>


                            {/* CONTINUE SHOPPING */}
                            <Link
                                to="/products"
                                className="mt-3 flex w-full items-center justify-center rounded-full border border-gray-300 px-6 py-3.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Continue Shopping
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}