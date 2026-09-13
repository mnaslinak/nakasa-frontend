import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homePage.css";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const SCENE_DURATION = 5000;

// ========================================
// FALLBACK HERO IMAGES
// ========================================

const SCENES = [
    {
        title: "Men's sunglasses",
        category: "sunglasses",
        gender: "men",
        detail: "A different perspective.",
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&auto=format&fit=crop&q=85",
        position: "center",
        product: false,
    },
    {
        title: "Men's watches",
        category: "watches",
        gender: "men",
        detail: "Make every moment yours.",
        image:
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1600&auto=format&fit=crop&q=85",
        position: "center",
        product: false,
    },
    {
        title: "Women's sunglasses",
        category: "sunglasses",
        gender: "women",
        detail: "See your own way.",
        image:
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1600&auto=format&fit=crop&q=85",
        position: "center",
        product: false,
    },
    {
        title: "Women's watches",
        category: "watches",
        gender: "women",
        detail: "Details that stay with you.",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&auto=format&fit=crop&q=85",
        position: "center",
        product: false,
    },
];

export default function HomePage() {

    // ========================================
    // STATES
    // ========================================

    const [scenes, setScenes] = useState(SCENES);

    const [latestProducts, setLatestProducts] =
        useState([]);

    const [active, setActive] = useState(0);

    const [paused, setPaused] = useState(false);

    const [focused, setFocused] = useState(false);

    const [hidden, setHidden] = useState(false);

    const [reducedMotion, setReducedMotion] =
        useState(() => {

            if (typeof window === "undefined") {
                return false;
            }

            return window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
        });


    // ========================================
    // REDUCED MOTION + TAB VISIBILITY
    // ========================================

    useEffect(() => {

        const query = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const updateMotion = () => {
            setReducedMotion(query.matches);
        };

        const updateVisibility = () => {
            setHidden(document.hidden);
        };

        updateMotion();

        updateVisibility();

        query.addEventListener(
            "change",
            updateMotion
        );

        document.addEventListener(
            "visibilitychange",
            updateVisibility
        );

        return () => {

            query.removeEventListener(
                "change",
                updateMotion
            );

            document.removeEventListener(
                "visibilitychange",
                updateVisibility
            );
        };

    }, []);


    // ========================================
    // LOAD PRODUCTS FROM BACKEND
    // ========================================

    useEffect(() => {

        const controller =
            new AbortController();

        async function loadProducts() {

            try {

                const response =
                    await fetch(
                        `${API_URL}/products?page=1&limit=100`,
                        {
                            signal:
                                controller.signal,
                        }
                    );

                if (!response.ok) {
                    return;
                }

                const data =
                    await response.json();

                const products =
                    Array.isArray(data)
                        ? data
                        : data.products;

                if (!Array.isArray(products)) {
                    return;
                }


                // ========================================
                // LATEST / FEATURED PRODUCTS
                // ========================================

                const latest = products
                    .filter(
                        (product) =>
                            product &&
                            product.featured === true
                    )
                    .slice(0, 12);

                setLatestProducts(latest);


                // ========================================
                // HERO PRODUCTS
                // ========================================

                const normalize = (value) =>
                    String(value || "")
                        .trim()
                        .toLowerCase();

                const updatedScenes =
                    SCENES.map((scene) => {

                        const product =
                            products.find(
                                (item) =>
                                    item &&
                                    normalize(
                                        item.gender
                                    ) ===
                                        scene.gender &&
                                    normalize(
                                        item.category
                                    ) ===
                                        scene.category &&
                                    typeof item.image ===
                                        "string" &&
                                    item.image.trim()
                            );

                        if (!product) {
                            return scene;
                        }

                        return {
                            ...scene,
                            image:
                                product.image,
                            product: true,
                        };
                    });

                setScenes(updatedScenes);

            } catch (error) {

                if (
                    error.name !==
                    "AbortError"
                ) {

                    console.warn(
                        "Products could not be loaded."
                    );
                }
            }
        }

        loadProducts();

        return () => {
            controller.abort();
        };

    }, []);


    // ========================================
    // HERO SLIDESHOW STATUS
    // ========================================

    const stopped =
        paused ||
        focused ||
        hidden ||
        reducedMotion;


    // ========================================
    // AUTOMATIC HERO SLIDESHOW
    // ========================================

    useEffect(() => {

        if (stopped) {
            return;
        }

        const timer =
            window.setTimeout(() => {

                setActive(
                    (previous) =>
                        (previous + 1) %
                        scenes.length
                );

            }, SCENE_DURATION);

        return () => {

            window.clearTimeout(
                timer
            );

        };

    }, [
        active,
        stopped,
        scenes.length,
    ]);


    // ========================================
    // MANUAL HERO SLIDE
    // ========================================

    function showScene(index) {

        setPaused(true);

        setActive(index);
    }


    // ========================================
    // IMAGE FALLBACK
    // ========================================

    function recoverImage(
        event,
        index
    ) {

        const image =
            event.currentTarget;

        if (
            image.dataset.fallback ===
            "true"
        ) {

            image.style.visibility =
                "hidden";

            return;
        }

        image.dataset.fallback =
            "true";

        image.src =
            SCENES[index].image;
    }


    return (

        <div className="w-full">


            {/* ========================================
                HERO SECTION
            ======================================== */}

            <section
                className={`nakasa-hero${
                    stopped
                        ? " is-paused"
                        : ""
                }`}
                aria-label="NAKASA featured collections"
                aria-roledescription="carousel"

                onFocusCapture={() => {
                    setFocused(true);
                }}

                onBlurCapture={(event) => {

                    if (
                        !event.currentTarget.contains(
                            event.relatedTarget
                        )
                    ) {

                        setFocused(false);
                    }
                }}
            >


                {/* HERO BACKGROUND SCENES */}

                {scenes.map(
                    (scene, index) => (

                        <div
                            key={
                                scene.title
                            }

                            aria-hidden="true"

                            className={`nakasa-scene${
                                index === active
                                    ? " is-active"
                                    : ""
                            }${
                                scene.product
                                    ? " is-product"
                                    : ""
                            }`}
                        >

                            <img
                                key={
                                    scene.image
                                }

                                src={
                                    scene.image
                                }

                                alt=""

                                style={{
                                    objectPosition:
                                        scene.position,
                                }}

                                decoding="async"

                                onError={(
                                    event
                                ) =>
                                    recoverImage(
                                        event,
                                        index
                                    )
                                }
                            />

                        </div>
                    )
                )}


                {/* DARK OVERLAY */}

                <div
                    className="nakasa-shade"
                    aria-hidden="true"
                />


                {/* HERO CONTENT */}

                <div className="nakasa-hero-content">

                    <p className="nakasa-eyebrow">

                        NAKASA · Sunglasses
                        &amp; Watches

                    </p>


                    <h1>

                        OWN YOUR LOOK

                        <br />

                        <span>
                            OWN YOUR TIME.
                        </span>

                    </h1>


                    <p className="nakasa-hero-description">

                        Your perspective.
                        Your time.

                        <br />

                        Discover everyday
                        style for him and her.

                    </p>


                    <div className="nakasa-hero-actions">

                        <Link to="/men">
                            SHOP MEN'S ↗
                        </Link>

                        <Link to="/women">
                            SHOP WOMEN'S ↗
                        </Link>

                    </div>

                </div>


                {/* ACTIVE SLIDE CAPTION */}

                <div
                    className="nakasa-scene-caption"
                    aria-live="off"
                >

                    <p>
                        Explore the collection
                    </p>

                    <h2>
                        {
                            scenes[active]
                                ?.title
                        }
                    </h2>

                    <span>
                        {
                            scenes[active]
                                ?.detail
                        }
                    </span>

                </div>


                {/* SLIDER CONTROLS */}

                <div className="nakasa-controls">

                    <div
                        className="nakasa-dots"
                        role="group"
                        aria-label="Choose collection"
                    >

                        {scenes.map(
                            (
                                scene,
                                index
                            ) => (

                                <button
                                    key={
                                        scene.title
                                    }

                                    type="button"

                                    aria-label={`Show ${scene.title}`}

                                    aria-pressed={
                                        index ===
                                        active
                                    }

                                    onClick={() =>
                                        showScene(
                                            index
                                        )
                                    }
                                >

                                    <i
                                        aria-hidden="true"
                                    />

                                    0{index + 1}

                                </button>
                            )
                        )}

                    </div>


                    {reducedMotion ? (

                        <span className="nakasa-motion-note">

                            Manual slideshow

                        </span>

                    ) : (

                        <button
                            className="nakasa-pause"
                            type="button"
                            aria-pressed={
                                paused
                            }

                            aria-label={
                                paused
                                    ? "Resume slideshow"
                                    : "Pause slideshow"
                            }

                            onClick={(
                                event
                            ) => {

                                setPaused(
                                    (
                                        previous
                                    ) =>
                                        !previous
                                );

                                if (
                                    event.detail >
                                    0
                                ) {

                                    event.currentTarget.blur();
                                }
                            }}
                        >

                            {paused
                                ? "▶ Play"
                                : "Ⅱ Pause"}

                        </button>
                    )}

                </div>

            </section>


            {/* ========================================
                COLLECTION SECTION
            ======================================== */}

            <section className="w-full py-20 px-6 md:px-10 lg:px-12">

                <div className="text-center mb-12">

                    <h2 className="text-3xl md:text-4xl font-bold">

                        SHOP OUR COLLECTION

                    </h2>

                    <p className="mt-3 text-gray-500">

                        Find your perfect style

                    </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {[
                        {
                            name: "MEN",
                            path: "/men",
                            caption:
                                "Shop Men's Collection",
                            image:
                                SCENES[0].image,
                        },

                        {
                            name: "WOMEN",
                            path: "/women",
                            caption:
                                "Shop Women's Collection",
                            image:
                                SCENES[2].image,
                        },

                    ].map(
                        (collection) => (

                            <Link
                                key={
                                    collection.path
                                }

                                to={
                                    collection.path
                                }

                                className="
                                    group
                                    relative
                                    h-[500px]
                                    overflow-hidden
                                    bg-gray-200
                                "
                            >

                                <img
                                    src={
                                        collection.image
                                    }

                                    alt={`${collection.name} collection`}

                                    loading="lazy"

                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                        group-hover:scale-105
                                        transition
                                        duration-500
                                        motion-reduce:transform-none
                                        motion-reduce:transition-none
                                    "
                                />


                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-black/20
                                        flex
                                        items-end
                                        p-8
                                    "
                                >

                                    <div className="text-white">

                                        <h3 className="text-3xl font-bold">

                                            {
                                                collection.name
                                            }

                                        </h3>

                                        <p className="mt-2">

                                            {
                                                collection.caption
                                            }{" "}
                                            →

                                        </p>

                                    </div>

                                </div>

                            </Link>
                        )
                    )}

                </div>

            </section>


            {/* ========================================
                LATEST ARRIVALS
            ======================================== */}

            {latestProducts.length >
                0 && (

                <section className="nakasa-latest-section">

                    <div className="nakasa-latest-header">

                        <div>

                            <p className="nakasa-latest-eyebrow">

                                NEW COLLECTION

                            </p>

                            <h2>
                                LATEST ARRIVALS
                            </h2>

                        </div>


                        <Link
                            to="/products"
                            className="nakasa-view-all"
                        >

                            VIEW ALL →

                        </Link>

                    </div>


                    {/* SLIDER */}

                    <div className="nakasa-latest-slider">

                        <div className="nakasa-latest-track">


                            {/* ORIGINAL PRODUCTS */}

                            {latestProducts.map(
                                (product) => (

                                    <Link
                                        key={
                                            product._id
                                        }

                                        to={`/product/${product._id}`}

                                        className="nakasa-latest-card"
                                    >

                                        <div className="nakasa-latest-image">

                                            <img
                                                src={
                                                    product.image
                                                }

                                                alt={
                                                    product.name
                                                }

                                                loading="lazy"
                                            />


                                            {Number(
                                                product.discount
                                            ) >
                                                0 && (

                                                <span className="nakasa-discount">

                                                    -
                                                    {
                                                        product.discount
                                                    }
                                                    %

                                                </span>
                                            )}

                                        </div>


                                        <div className="nakasa-latest-info">

                                            <p className="nakasa-product-category">

                                                {
                                                    product.category
                                                }

                                            </p>


                                            <h3>

                                                {
                                                    product.name
                                                }

                                            </h3>


                                            <div className="nakasa-price">

                                                <span>

                                                    Rs.{" "}
                                                    {Number(
                                                        product.price
                                                    ).toLocaleString()}

                                                </span>


                                                {Number(
                                                    product.oldPrice
                                                ) >
                                                    Number(
                                                        product.price
                                                    ) && (

                                                    <del>

                                                        Rs.{" "}
                                                        {Number(
                                                            product.oldPrice
                                                        ).toLocaleString()}

                                                    </del>
                                                )}

                                            </div>

                                        </div>

                                    </Link>
                                )
                            )}


                            {/* DUPLICATE PRODUCTS */}

                            {latestProducts.map(
                                (product) => (

                                    <Link
                                        key={`duplicate-${product._id}`}

                                        to={`/product/${product._id}`}

                                        className="nakasa-latest-card"

                                        aria-hidden="true"

                                        tabIndex={
                                            -1
                                        }
                                    >

                                        <div className="nakasa-latest-image">

                                            <img
                                                src={
                                                    product.image
                                                }

                                                alt=""

                                                loading="lazy"
                                            />


                                            {Number(
                                                product.discount
                                            ) >
                                                0 && (

                                                <span className="nakasa-discount">

                                                    -
                                                    {
                                                        product.discount
                                                    }
                                                    %

                                                </span>
                                            )}

                                        </div>


                                        <div className="nakasa-latest-info">

                                            <p className="nakasa-product-category">

                                                {
                                                    product.category
                                                }

                                            </p>


                                            <h3>

                                                {
                                                    product.name
                                                }

                                            </h3>


                                            <div className="nakasa-price">

                                                <span>

                                                    Rs.{" "}
                                                    {Number(
                                                        product.price
                                                    ).toLocaleString()}

                                                </span>


                                                {Number(
                                                    product.oldPrice
                                                ) >
                                                    Number(
                                                        product.price
                                                    ) && (

                                                    <del>

                                                        Rs.{" "}
                                                        {Number(
                                                            product.oldPrice
                                                        ).toLocaleString()}

                                                    </del>
                                                )}

                                            </div>

                                        </div>

                                    </Link>
                                )
                            )}

                        </div>

                    </div>

                </section>
            )}


            {/* ========================================
                BOTTOM SECTION
            ======================================== */}

            <section
                className="
                    w-full
                    bg-black
                    text-white
                    py-20
                    px-6
                    text-center
                "
            >

                <h2 className="text-3xl md:text-5xl font-bold">

                    STYLE FOR EVERY DAY

                </h2>


                <p className="mt-5 text-gray-300">

                    Discover our latest
                    collection.

                </p>

            </section>

        </div>
    );
}