import { useState, useEffect } from "react";
import { FaHeart, FaSearch, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function ProductsPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("default");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                return response.json();
            })
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    // Filter products
    let filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            product.category?.toLowerCase() === category.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    // Sort products
    if (sort === "low") {
        filteredProducts.sort(
            (a, b) => Number(a.price) - Number(b.price)
        );
    }

    if (sort === "high") {
        filteredProducts.sort(
            (a, b) => Number(b.price) - Number(a.price)
        );
    }

    return (
        <div className="bg-white min-h-screen">

            {/* Hero */}
            <section className="bg-[#f8f8f8] py-20 text-center">

                <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">
                    NAKASA COLLECTION
                </p>

                <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
                    SHOP ALL
                </h1>

                <p className="mt-5 text-gray-600">
                    Discover our latest styles and collections
                </p>

            </section>

            {/* Products Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-14">

                {/* Top Controls */}
                <div className="flex flex-col lg:flex-row justify-between gap-5 mb-10">

                    {/* Search */}
                    <div className="relative w-full lg:w-96">

                        <FaSearch
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full border border-gray-300 rounded-full py-3 pl-11 pr-5 outline-none focus:border-[#e99b70]"
                        />

                    </div>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-gray-300 rounded-full px-5 py-3 outline-none cursor-pointer"
                    >
                        <option value="default">
                            Sort: Default
                        </option>

                        <option value="low">
                            Price: Low to High
                        </option>

                        <option value="high">
                            Price: High to Low
                        </option>
                    </select>

                </div>

                {/* Category Buttons */}
                <div className="flex flex-wrap gap-3 mb-10">

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
                            className={`px-6 py-2 rounded-full border transition duration-300 ${
                                category === item
                                    ? "bg-black text-white border-black"
                                    : "border-gray-300 hover:border-black"
                            }`}
                        >
                            {item}
                        </button>

                    ))}

                </div>

                {/* Product Count */}
                <div className="flex justify-between items-center mb-7">

                    <p className="text-gray-500">
                        {filteredProducts.length} Products
                    </p>

                </div>

                {/* Loading */}
                {loading ? (

                    <div className="text-center py-20">
                        <h2 className="text-xl font-semibold">
                            Loading products...
                        </h2>
                    </div>

                ) : filteredProducts.length > 0 ? (

                    /* Product Grid */
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">

                        {filteredProducts.map((product) => (

                            <div
                                key={product._id}
                                className="group"
                            >

                                {/* Product Image */}
                                <div className="relative bg-[#f5f5f5] aspect-[3/4] overflow-hidden rounded-xl">

                                    <Link
                                        to={`/product/${product._id}`}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </Link>

                                    {/* Wishlist */}
                                    <button
                                        type="button"
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#ffc29d] transition"
                                    >
                                        <FaHeart size={15} />
                                    </button>

                                    {/* Quick Add */}
                                    <button
                                        type="button"
                                        className="absolute bottom-4 left-4 right-4 bg-white py-3 rounded-full font-medium opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 flex items-center justify-center gap-2"
                                    >
                                        <FaShoppingBag />
                                        Add to Cart
                                    </button>

                                </div>

                                {/* Product Information */}
                                <div className="pt-4">

                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        {product.category}
                                    </p>

                                    <Link
                                        to={`/product/${product._id}`}
                                    >
                                        <h3 className="font-medium mt-1 hover:text-[#e99b70] transition">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <p className="font-semibold mt-2">
                                        Rs. {Number(product.price).toLocaleString()}
                                    </p>

                                    {/* View Product */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(`/product/${product._id}`)
                                        }
                                        className="mt-3 text-sm font-medium hover:text-[#e99b70] transition"
                                    >
                                        View Product →
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    /* No Products */
                    <div className="text-center py-20">

                        <h2 className="text-2xl font-semibold">
                            No products found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Try another search or category.
                        </p>

                    </div>

                )}

            </section>

        </div>
    );
}
