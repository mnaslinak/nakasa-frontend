export default function DeliveryPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="bg-[#f8f8f8] py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          DELIVERY DETAILS
        </h1>

        <p className="mt-4 text-gray-600">
          Everything you need to know about your NAKASA delivery
        </p>
      </section>


      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">

        <p className="text-gray-600 leading-7 text-center mb-14">
          At NAKASA, we aim to make your shopping experience as
          convenient as possible. Once your order is confirmed,
          we will prepare and dispatch your items for delivery.
        </p>


        {/* Delivery Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Delivery Areas */}
          <div className="border border-gray-200 p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">
              Delivery Areas
            </h2>

            <p className="text-gray-600 leading-7">
              We aim to provide delivery services to customers
              across Sri Lanka. Delivery availability may depend
              on the customer's location.
            </p>
          </div>


          {/* Processing Time */}
          <div className="border border-gray-200 p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">
              Order Processing
            </h2>

            <p className="text-gray-600 leading-7">
              Orders are processed after the order has been
              successfully confirmed. Processing time may vary
              depending on product availability and order volume.
            </p>
          </div>


          {/* Delivery Time */}
          <div className="border border-gray-200 p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">
              Delivery Time
            </h2>

            <p className="text-gray-600 leading-7">
              Delivery times may vary depending on your location,
              courier availability, weather conditions, and other
              circumstances. An estimated delivery period may be
              provided during the ordering process.
            </p>
          </div>


          {/* Delivery Charges */}
          <div className="border border-gray-200 p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">
              Delivery Charges
            </h2>

            <p className="text-gray-600 leading-7">
              Delivery charges may depend on the customer's location,
              order value, and the delivery service used. Any
              applicable delivery fee will be displayed during
              checkout.
            </p>
          </div>

        </div>


        {/* How Delivery Works */}
        <div className="mt-20">

          <div className="text-center mb-12">

            <p className="text-sm uppercase tracking-[0.2em] text-[#e99b70] font-medium mb-3">
              Simple & Convenient
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              How Delivery Works
            </h2>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Step 1 */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full
                bg-[#ffc29d] flex items-center justify-center
                font-bold text-lg mb-5">
                01
              </div>

              <h3 className="font-bold text-lg mb-3">
                Place Order
              </h3>

              <p className="text-gray-600 text-sm leading-6">
                Select your favourite products and complete your order.
              </p>
            </div>


            {/* Step 2 */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full
                bg-[#ffc29d] flex items-center justify-center
                font-bold text-lg mb-5">
                02
              </div>

              <h3 className="font-bold text-lg mb-3">
                Order Confirmed
              </h3>

              <p className="text-gray-600 text-sm leading-6">
                We receive and confirm your order details.
              </p>
            </div>


            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full
                bg-[#ffc29d] flex items-center justify-center
                font-bold text-lg mb-5">
                03
              </div>

              <h3 className="font-bold text-lg mb-3">
                Order Dispatched
              </h3>

              <p className="text-gray-600 text-sm leading-6">
                Your order is prepared and handed over for delivery.
              </p>
            </div>


            {/* Step 4 */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full
                bg-[#ffc29d] flex items-center justify-center
                font-bold text-lg mb-5">
                04
              </div>

              <h3 className="font-bold text-lg mb-3">
                Delivered
              </h3>

              <p className="text-gray-600 text-sm leading-6">
                Your NAKASA order arrives at your delivery address.
              </p>
            </div>

          </div>

        </div>


        {/* Important Information */}
        <div className="bg-[#fff5ef] border-l-4 border-[#ffc29d]
          p-6 mt-20">

          <h3 className="font-bold text-lg mb-3">
            Important Information
          </h3>

          <ul className="text-gray-600 leading-7 list-disc pl-5 space-y-2">
            <li>
              Please make sure your delivery address and contact
              details are correct before placing your order.
            </li>

            <li>
              Someone should be available to receive the package
              at the provided delivery address.
            </li>

            <li>
              Delivery times may be affected by circumstances
              outside our control.
            </li>

            <li>
              Please contact NAKASA if you experience any issue
              with your delivery.
            </li>
          </ul>

        </div>


        {/* Contact CTA */}
        <div className="text-center mt-16">

          <h2 className="text-2xl font-bold mb-4">
            Need Help With Your Delivery?
          </h2>

          <p className="text-gray-600 mb-6">
            Our team is happy to help you with your order.
          </p>

          <a
            href="/contact"
            className="inline-block bg-black text-white
              px-8 py-3 rounded-full
              hover:bg-gray-800 transition duration-300"
          >
            CONTACT US →
          </a>

        </div>

      </section>

    </div>
  );
}