import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../utils/cartUtils";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
    }, [id]);

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">
                    Loading product...
                </h1>
            </div>
        );
    }

    // Product not found
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">
                    Product not found
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">

            <div className="mx-auto max-w-7xl">

                <div className="grid gap-10 md:grid-cols-2">

                    {/* Product Image */}
                    <div className="overflow-hidden rounded-xl bg-white">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">

                        <p className="text-sm uppercase tracking-wider text-gray-400">
                            {product.category}
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-gray-900">
                            {product.name}
                        </h1>

                        <p className="mt-4 text-xl font-bold text-gray-900">
                            Rs. {Number(product.price).toLocaleString()}
                        </p>

                        {product.oldPrice && (
                            <p className="mt-1 text-gray-400 line-through">
                                Rs. {Number(product.oldPrice).toLocaleString()}
                            </p>
                        )}

                        {product.rating && (
                            <div className="mt-4">
                                ⭐ {product.rating}
                            </div>
                        )}

                        {/* Description */}
                        {product.description && (
                            <p className="mt-6 text-gray-600 leading-7">
                                {product.description}
                            </p>
                        )}

                        {/* Buttons */}
                        <div className="mt-8 flex gap-4">

                            <button
                                onClick={() => addToCart(product)}
                                className="rounded-full border border-black px-6 py-3 font-medium transition hover:bg-black hover:text-white"
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/checkout", {
                                        state: {
                                            buyNowProduct: product
                                        }
                                    })
                                }
                                className="rounded-full bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
                            >
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}