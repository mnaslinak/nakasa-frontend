import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../utils/cartUtils";

import {
    IoSearchOutline,
    IoPersonOutline,
    IoBagOutline,
    IoMenuOutline,
    IoCloseOutline
} from "react-icons/io5";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = () => {
        const cart = getCart();

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        setCartCount(totalItems);
    };

    useEffect(() => {
        updateCartCount();

        window.addEventListener("cartUpdated", updateCartCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    return (
        <>
            {/* ================= HEADER ================= */}

            <header className="fixed top-0 left-0 w-full h-[75px] bg-black z-50">

                <div className="relative w-full h-full px-6 md:px-10 lg:px-12 flex items-center">

                    {/* ================= LOGO ================= */}

                    <div className="absolute left-6 md:left-10 lg:left-12">

                        <Link to="/">

                            <img
                                src="/logo-white.png"
                                alt="NAKASA"
                                className="h-8 md:h-9 lg:h-10 w-auto object-contain"
                            />

                        </Link>

                    </div>


                    {/* ================= DESKTOP NAVIGATION ================= */}

                    <nav className="
                        hidden
                        md:flex
                        absolute
                        left-1/2
                        -translate-x-1/2
                        items-center
                        gap-8
                        lg:gap-10
                    ">

                        <Link
                            to="/women"
                            className="
                                text-white
                                text-sm
                                font-semibold
                                tracking-wide
                                hover:opacity-60
                                transition
                            "
                        >
                            WOMEN
                        </Link>


                        <Link
                            to="/men"
                            className="
                                text-white
                                text-sm
                                font-semibold
                                tracking-wide
                                hover:opacity-60
                                transition
                            "
                        >
                            MEN
                        </Link>


                        <Link
                            to="/products"
                            className="
                                text-white
                                text-sm
                                font-semibold
                                tracking-wide
                                hover:opacity-60
                                transition
                            "
                        >
                            SHOP ALL
                        </Link>

                    </nav>


                    {/* ================= DESKTOP ICONS ================= */}

                    <div className="
                        hidden
                        md:flex
                        absolute
                        right-6
                        md:right-10
                        lg:right-12
                        items-center
                        gap-5
                    ">

                        {/* Search */}

                        <Link
                            to="/search"
                            className="text-white hover:opacity-60 transition"
                        >
                            <IoSearchOutline size={23} />
                        </Link>


                        {/* Account */}

                        <Link
                            to="/login"
                            className="text-white hover:opacity-60 transition"
                        >
                            <IoPersonOutline size={22} />
                        </Link>


                        {/* Cart */}

                        <Link
                            to="/cart"
                            className="relative text-white hover:opacity-60 transition"
                        >
                            <IoBagOutline size={23} />

                            {cartCount > 0 && (
                                <span className="
                                    absolute
                                    -top-2
                                    -right-2
                                    bg-red-500
                                    text-white
                                    text-xs
                                    rounded-full
                                    h-5
                                    w-5
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    {cartCount}
                                </span>
                            )}

                        </Link>

                    </div>


                    {/* ================= MOBILE ICONS ================= */}

                    <div className="
                        md:hidden
                        ml-auto
                        flex
                        items-center
                        gap-5
                    ">

                        {/* Search */}

                        <Link
                            to="/search"
                            className="text-white"
                        >
                            <IoSearchOutline size={23} />
                        </Link>


                        {/* Cart */}

                        <Link
                            to="/cart"
                            className="relative text-white"
                        >
                            <IoBagOutline size={23} />

                            {cartCount > 0 && (
                                <span className="
                                    absolute
                                    -right-2
                                    -top-2
                                    flex
                                    h-4
                                    min-w-4
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white
                                    px-1
                                    text-[10px]
                                    font-bold
                                    text-black
                                ">
                                    {cartCount}
                                </span>
                            )}

                        </Link>


                        {/* Menu */}

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white"
                        >

                            {menuOpen ? (
                                <IoCloseOutline size={27} />
                            ) : (
                                <IoMenuOutline size={27} />
                            )}

                        </button>

                    </div>

                </div>

            </header>


            {/* ================= MOBILE MENU ================= */}

            <div
                className={`
                    fixed
                    top-0
                    right-0
                    h-screen
                    w-[280px]
                    bg-white
                    z-[60]
                    transform
                    transition-transform
                    duration-300
                    ${menuOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                    }
                `}
            >

                {/* Mobile menu header */}

                <div className="
                    h-[90px]
                    flex
                    items-center
                    justify-between
                    px-6
                    border-b
                ">

                    <span className="
                        text-black
                        font-semibold
                        tracking-wider
                    ">
                        MENU
                    </span>

                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-black"
                    >
                        <IoCloseOutline size={27} />
                    </button>

                </div>


                {/* Mobile links */}

                <nav className="
                    flex
                    flex-col
                    px-6
                    py-8
                    gap-7
                ">

                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-black text-sm font-semibold tracking-wider"
                    >
                        HOME
                    </Link>


                    <Link
                        to="/women"
                        onClick={() => setMenuOpen(false)}
                        className="text-black text-sm font-semibold tracking-wider"
                    >
                        WOMEN
                    </Link>


                    <Link
                        to="/men"
                        onClick={() => setMenuOpen(false)}
                        className="text-black text-sm font-semibold tracking-wider"
                    >
                        MEN
                    </Link>


                    <Link
                        to="/products"
                        onClick={() => setMenuOpen(false)}
                        className="text-black text-sm font-semibold tracking-wider"
                    >
                        SHOP ALL
                    </Link>


                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="text-black text-sm font-semibold tracking-wider"
                    >
                        CONTACT US
                    </Link>


                    <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="text-black text-sm font-semibold tracking-wider"
                    >
                        MY ACCOUNT
                    </Link>

                </nav>

            </div>


            {/* ================= MOBILE OVERLAY ================= */}

            {menuOpen && (

                <div
                    onClick={() => setMenuOpen(false)}
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        z-[55]
                        md:hidden
                    "
                />

            )}

        </>
    );
}