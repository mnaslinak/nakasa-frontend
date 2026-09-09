import { FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";

export default function ProductCard({ product }) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="group relative w-full overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Wishlist Button */}
            <button
                type="button"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:bg-black hover:text-white"
            >
                <FaHeart size={15} />
            </button>

            {/* Product Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">

                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Discount Badge */}
                {product.discount && (
                    <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                        {product.discount}% OFF
                    </span>
                )}

                {/* Add to Cart */}
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-16 items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white opacity-0 shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:shadow-lg active:scale-95 group-hover:translate-y-0 group-hover:opacity-100"
                >
                    <FaShoppingBag size={14} />
                    Add to Cart
                </button>

            </div>

            {/* Product Information */}
            <div className="p-4">

                {/* Category */}
                <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">
                    {product.category}
                </p>

                {/* Product Name */}
                <Link to={`/product/${product._id}`}>
                    <h3 className="truncate text-sm font-semibold text-gray-900 hover:text-gray-600">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                {product.rating && (
                    <div className="mt-2 flex items-center gap-1">
                        <FaStar
                            size={13}
                            className="text-yellow-500"
                        />

                        <span className="text-xs text-gray-500">
                            {product.rating}
                        </span>
                    </div>
                )}

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">

                    <span className="text-base font-bold text-gray-900">
                        Rs. {Number(product.price).toLocaleString()}
                    </span>

                    {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            Rs. {Number(product.oldPrice).toLocaleString()}
                        </span>
                    )}

                </div>

            </div>

        </div>
    );
}