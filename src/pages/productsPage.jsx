import { useEffect, useMemo, useState } from "react";
import { FaHeart, FaSearch, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";
import toast from "react-hot-toast";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ProductsPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("default");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/products?limit=100`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch products"
                    );
                }

                setProducts(data.products || []);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message || "Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            const productName = product.name?.toLowerCase() || "";
            const productCategory = product.category?.toLowerCase() || "";
            const productGender = product.gender?.toLowerCase() || "";

            const matchesSearch = productName.includes(
                search.toLowerCase()
            );

            let matchesCategory = true;

            if (category === "Women" || category === "Men") {
                matchesCategory =
                    productGender === category.toLowerCase();
            } else if (category !== "All") {
                matchesCategory =
                    productCategory === category.toLowerCase();
            }

            return matchesSearch && matchesCategory;
        });

        if (sort === "low") {
            filtered.sort(
                (a, b) => Number(a.price) - Number(b.price)
            );
        }

        if (sort === "high") {
            filtered.sort(
                (a, b) => Number(b.price) - Number(a.price)
            );
        }

        return filtered;
    }, [products, search, category, sort]);

    return (
        <div className="min-h-screen bg-white">

            <section className="bg-[#f8f8f8] py-20 text-center">
                <p className="mb-4 text-sm tracking-[0.3em] text-gray-500">
                    NAKASA COLLECTION
                </p>

                <h1 className="text-4xl font-bold tracking-wide md:text-5xl">
                    SHOP ALL
                </h1>

                <p className="mt-5 text-gray-600">
                    Discover our latest styles and collections
                </p>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-14 md:px-12">

                <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row">
                    <div className="relative w-full lg:w-96">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full rounded-full border border-gray-300 py-3 pl-11 pr-5 outline-none focus:border-[#e99b70]"
                        />
                    </div>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="cursor-pointer rounded-full border border-gray-300 px-5 py-3 outline-none"
                    >
                        <option value="default">Sort: Default</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>

                <div className="mb-10 flex flex-wrap gap-3">
                    {[
                        "All",
                        "Women",
                        "Men",
                        "Watches",
                        "Sunglasses",
                    ].map((item) => (
                        <button
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`rounded-full border px-6 py-2 transition ${
                                category === item
                                    ? "border-black bg-black text-white"
                                    : "border-gray-300 hover:border-black"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="mb-7 flex items-center justify-between">
                    <p className="text-gray-500">
                        {filteredProducts.length} Products
                    </p>
                </div>

                {loading ? (
                    <div className="py-20 text-center">
                        <h2 className="text-xl font-semibold">
                            Loading products...
                        </h2>
                    </div>
                ) : error ? (
                    <div className="py-20 text-center">
                        <h2 className="text-xl font-semibold">
                            Unable to load products
                        </h2>
                        <p className="mt-3 text-gray-500">{error}</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="group">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f5f5f5]">

                                    <Link to={`/product/${product._id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </Link>

                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-[#ffc29d]"
                                        aria-label={`Add ${product.name} to wishlist`}
                                    >
                                        <FaHeart size={15} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            addToCart(product);
                                            toast.success("Added to cart");
                                        }}
                                        className="absolute bottom-4 left-4 right-4 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-white py-3 font-medium opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        <FaShoppingBag />
                                        Add to Cart
                                    </button>
                                </div>

                                <div className="pt-4">
                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        {product.category}
                                    </p>

                                    <Link to={`/product/${product._id}`}>
                                        <h3 className="mt-1 font-medium hover:text-[#e99b70]">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <p className="mt-2 font-semibold">
                                        Rs.{" "}
                                        {Number(product.price).toLocaleString()}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/product/${product._id}`
                                            )
                                        }
                                        className="mt-3 text-sm font-medium hover:text-[#e99b70]"
                                    >
                                        View Product →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <h2 className="text-2xl font-semibold">
                            No products found
                        </h2>
                        <p className="mt-3 text-gray-500">
                            Try another search or category.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
