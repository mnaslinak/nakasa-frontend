import { Link } from "react-router-dom";

export default function OrderConfirmationPage() {
  const order = JSON.parse(localStorage.getItem("nakasaLastOrder"));

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">No Order Found</h1>

        <p className="text-gray-600 mb-6">
          We couldn't find your recent order.
        </p>

        <Link
          to="/"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-md p-8 text-center mb-6">
          <div className="text-5xl mb-4">🎉</div>

          <h1 className="text-3xl font-bold mb-2">
            Order Confirmed!
          </h1>

          <p className="text-gray-600">
            Thank you for shopping with NAKASA.
          </p>

          <p className="mt-4 font-semibold">
            Order ID:{" "}
            <span className="text-gray-700">
              {order.orderId}
            </span>
          </p>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            Delivery Information
          </h2>

          <p>
            <strong>Name:</strong>{" "}
            {order.customer.firstName} {order.customer.lastName}
          </p>

          <p>
            <strong>Phone:</strong> {order.customer.phone}
          </p>

          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {order.customer.address}, {order.customer.city},{" "}
            {order.customer.postalCode}
          </p>

          <p className="mt-3">
            <strong>Payment:</strong> Cash on Delivery
          </p>
        </div>

        {/* Ordered Products */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            Your Sunglasses
          </h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={`${item.productId}-${item.name}`}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="font-medium">
                    Rs. {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Total */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>
              Rs. {order.subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Delivery Fee</span>
            <span>
              Rs. {order.deliveryFee.toLocaleString()}
            </span>
          </div>

          <div className="border-t pt-3 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>
              Rs. {order.total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 text-center bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Back to Home
          </Link>

          <Link
            to="/products"
            className="flex-1 text-center border border-black py-3 rounded-lg hover:bg-gray-100"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}