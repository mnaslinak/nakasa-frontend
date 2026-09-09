import Header from "../components/header";
import { Link } from "react-router-dom";

export default function HomePage() {

    return (
        <div className="w-full">

            {/* ================= HEADER ================= */}

            <Header />


            {/* ================= HERO SECTION ================= */}

            <section className="relative w-full h-screen min-h-[650px] overflow-hidden">

                {/* Background Image */}

                <img
                    src="/hero.jpg"
                    alt="Fashion collection"
                    className="absolute inset-0 w-full h-full object-cover"
                />


                {/* Dark overlay */}

                <div className="absolute inset-0 bg-black/20"></div>


                {/* ================= HERO CONTENT ================= */}

                <div className="
                    absolute
                    left-6
                    md:left-10
                    lg:left-12
                    bottom-16
                    md:bottom-20
                    lg:bottom-24
                    text-white
                ">

                    {/* Main heading */}

                    <h1 className="
                        text-5xl
                        md:text-6xl
                        lg:text-8xl
                        font-black
                        italic
                        tracking-tight
                        leading-none
                    ">
                        BE BETTER
                        <br />
                        EVERYDAY
                    </h1>


                    {/* Subtitle */}

                    <p className="
                        mt-5
                        text-base
                        md:text-lg
                        font-medium
                    ">
                        Explore our Collection
                    </p>


                    {/* Buttons */}

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        mt-6
                    ">

                        <Link
                            to="/men"
                            className="
                                bg-black
                                text-white
                                px-10
                                py-4
                                text-sm
                                font-semibold
                                text-center
                                hover:bg-white
                                hover:text-black
                                transition
                            "
                        >
                            SHOP MEN'S
                        </Link>


                        <Link
                            to="/women"
                            className="
                                bg-black
                                text-white
                                px-10
                                py-4
                                text-sm
                                font-semibold
                                text-center
                                hover:bg-white
                                hover:text-black
                                transition
                            "
                        >
                            SHOP WOMEN'S
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= CATEGORY SECTION ================= */}

            <section className="w-full py-20 px-6 md:px-10 lg:px-12">

                <div className="text-center mb-12">

                    <h2 className="
                        text-3xl
                        md:text-4xl
                        font-bold
                    ">
                        SHOP OUR COLLECTION
                    </h2>

                    <p className="
                        mt-3
                        text-gray-500
                    ">
                        Find your perfect style
                    </p>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                ">

                    {/* Men's category */}

                    <Link
                        to="/men"
                        className="
                            group
                            relative
                            h-[500px]
                            overflow-hidden
                            bg-gray-200
                        "
                    >

                        <img
                            src="/men.jpg"
                            alt="Men's collection"
                            className="
                                w-full
                                h-full
                                object-cover
                                group-hover:scale-105
                                transition
                                duration-500
                            "
                        />

                        <div className="
                            absolute
                            inset-0
                            bg-black/20
                            flex
                            items-end
                            p-8
                        ">

                            <div className="text-white">

                                <h3 className="text-3xl font-bold">
                                    MEN
                                </h3>

                                <p className="mt-2">
                                    Shop Men's Collection →
                                </p>

                            </div>

                        </div>

                    </Link>


                    {/* Women's category */}

                    <Link
                        to="/women"
                        className="
                            group
                            relative
                            h-[500px]
                            overflow-hidden
                            bg-gray-200
                        "
                    >

                        <img
                            src="/women.jpg"
                            alt="Women's collection"
                            className="
                                w-full
                                h-full
                                object-cover
                                group-hover:scale-105
                                transition
                                duration-500
                            "
                        />

                        <div className="
                            absolute
                            inset-0
                            bg-black/20
                            flex
                            items-end
                            p-8
                        ">

                            <div className="text-white">

                                <h3 className="text-3xl font-bold">
                                    WOMEN
                                </h3>

                                <p className="mt-2">
                                    Shop Women's Collection →
                                </p>

                            </div>

                        </div>

                    </Link>

                </div>

            </section>


            {/* ================= FOOTER MESSAGE ================= */}

            <section className="
                w-full
                bg-black
                text-white
                py-20
                px-6
                text-center
            ">

                <h2 className="
                    text-3xl
                    md:text-5xl
                    font-bold
                ">
                    STYLE FOR EVERY DAY
                </h2>

                <p className="
                    mt-5
                    text-gray-300
                ">
                    Discover our latest collection.
                </p>

            </section>

        </div>
    );
}