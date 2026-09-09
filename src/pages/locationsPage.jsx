import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaDirections
} from "react-icons/fa";

export default function LocationsPage() {
  const locations = [
    {
      name: "NAKASA – Main Store",
      address: "Add your store address here",
      phone: "+94 XX XXX XXXX",
      hours: "Monday – Sunday | 9:00 AM – 8:00 PM",
    },
    {
      name: "NAKASA – Branch 02",
      address: "Add your store address here",
      phone: "+94 XX XXX XXXX",
      hours: "Monday – Sunday | 9:00 AM – 8:00 PM",
    },
    {
      name: "NAKASA – Branch 03",
      address: "Add your store address here",
      phone: "+94 XX XXX XXXX",
      hours: "Monday – Sunday | 9:00 AM – 8:00 PM",
    },
  ];

  return (
    <div className="bg-white text-gray-900">

      {/* Hero Section */}
      <section className="bg-[#f8f8f8] py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          STORE LOCATIONS
        </h1>

        <p className="mt-4 text-gray-600">
          Visit us and experience NAKASA in person
        </p>
      </section>


      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-center">

        <h2 className="text-3xl font-bold mb-5">
          Find a NAKASA Store Near You
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 leading-7">
          Looking for your nearest NAKASA store? Explore our store
          locations below and visit us to discover our latest collections,
          styles and exclusive products.
        </p>

      </section>


      {/* Store Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {locations.map((location, index) => (

            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-8
              hover:shadow-lg transition duration-300"
            >

              {/* Store Name */}
              <h3 className="text-xl font-bold mb-6">
                {location.name}
              </h3>


              {/* Address */}
              <div className="flex gap-4 mb-5">

                <FaMapMarkerAlt
                  className="text-[#e99b70] mt-1"
                  size={20}
                />

                <div>
                  <p className="font-semibold">
                    Address
                  </p>

                  <p className="text-gray-600 mt-1">
                    {location.address}
                  </p>
                </div>

              </div>


              {/* Phone */}
              <div className="flex gap-4 mb-5">

                <FaPhone
                  className="text-[#e99b70] mt-1"
                  size={18}
                />

                <div>
                  <p className="font-semibold">
                    Phone
                  </p>

                  <p className="text-gray-600 mt-1">
                    {location.phone}
                  </p>
                </div>

              </div>


              {/* Opening Hours */}
              <div className="flex gap-4 mb-7">

                <FaClock
                  className="text-[#e99b70] mt-1"
                  size={18}
                />

                <div>
                  <p className="font-semibold">
                    Opening Hours
                  </p>

                  <p className="text-gray-600 mt-1">
                    {location.hours}
                  </p>
                </div>

              </div>


              {/* Directions Button */}
              <button
                className="w-full flex items-center
                justify-center gap-2
                bg-[#ffc29d]
                hover:bg-[#ffb589]
                py-3 rounded-full
                font-medium transition duration-300"
              >
                <FaDirections />
                Get Directions
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* Online Shopping CTA */}
      <section className="bg-[#f8f8f8] py-16 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Can't Visit Our Store?
        </h2>

        <p className="text-gray-600 mb-7">
          Shop your favourite NAKASA products online from anywhere.
        </p>

        <a
          href="/"
          className="inline-block bg-black text-white
          px-8 py-3 rounded-full
          hover:bg-gray-800 transition duration-300"
        >
          SHOP ONLINE
        </a>

      </section>

    </div>
  );
}