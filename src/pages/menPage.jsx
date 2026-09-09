import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

export default function MenPage() {
    const [menProducts, setMenProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/products"
                );

                const data = await response.json();

                const men = data.products.filter(
                    (product) => product.gender?.toLowerCase() === "men"
                );
                console.log("MEN PRODUCTS:", men);
                setMenProducts(men);
            } catch (error) {
                console.error("Failed to fetch men's products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenProducts();
    }, []);

    const latestArrivals = menProducts.filter(
        (product) => product.featured === true
    );

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Loading men's products...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Page Header */}
            <section className="px-6 pb-8 pt-12 text-center">

                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                    NAKASA
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
                    Men's Collection
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-gray-500">
                    Discover our latest collection of stylish sunglasses for men.
                </p>

            </section>

            {/* Latest Arrivals */}
            <section className="px-6 py-8">

                <div className="mb-6 flex items-end justify-between">

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                            Just In
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-900">
                            Latest Arrivals
                        </h2>
                    </div>

                    <button className="hidden text-sm font-medium text-gray-700 hover:text-black sm:block">
                        View All →
                    </button>

                </div>

                <div className="flex gap-5 overflow-x-auto pb-5">

                    {latestArrivals.map((product) => (

                        <div
                            key={product._id}
                            className="w-[240px] flex-shrink-0 sm:w-[280px]"
                        >
                            <ProductCard product={product} />
                        </div>

                    ))}

                </div>

            </section>

            {/* All Products */}
            <section className="px-6 py-10">

                <div className="mb-6">

                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                        Explore
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        All Men's Products
                    </h2>

                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

                    {menProducts.map((product) => (

                        <ProductCard
                            key={product._id}
                            product={product}
                        />

                    ))}

                </div>

            </section>

        </div>
    );
}