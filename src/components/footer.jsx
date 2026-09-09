import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#f8f8f8] text-gray-900">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div>

            {/* Logo */}
            <h2 className="text-4xl font-bold tracking-[0.2em] mb-8">
              NAKASA
            </h2>

            {/* Description */}
            <p className="max-w-xl text-sm md:text-base leading-7 text-gray-700">
              Sri Lanka's No 01 Women's Clothing Store.
              You can never go wrong with us! Explore the most
              stunning designs, sure to grab anyone's attention.
              Shop Online and get delivered right to your doorstep.
            </p>

            {/* Newsletter */}
            <div className="mt-10">

              <h3 className="text-lg font-bold mb-3">
                Join our Newsletter
              </h3>

              <p className="text-base mb-5">
                Be the First to Discover New Collections & Exclusive Offers
              </p>

              {/* Email Form */}
              <div className="flex items-center max-w-xl bg-white border border-gray-300 rounded-full p-1">

                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-5 py-3 rounded-full outline-none bg-transparent"
                />

                <button
                  className="bg-[#ffc29d] hover:bg-[#ffb589]
                  px-7 py-3 rounded-full font-medium
                  transition duration-300"
                >
                  SUBSCRIBE →
                </button>

              </div>

              {/* Social Media */}
              <div className="flex gap-4 mt-10">

                <a
                  href="#"
                  className="w-10 h-10 border border-gray-300
                  rounded-full flex items-center justify-center
                  hover:bg-[#ffc29d] transition"
                >
                  <FaFacebookF size={16} />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 border border-gray-300
                  rounded-full flex items-center justify-center
                  hover:bg-[#ffc29d] transition"
                >
                  <FaInstagram size={16} />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 border border-gray-300
                  rounded-full flex items-center justify-center
                  hover:bg-[#ffc29d] transition"
                >
                  <FaTiktok size={16} />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 border border-gray-300
                  rounded-full flex items-center justify-center
                  hover:bg-[#ffc29d] transition"
                >
                  <FaYoutube size={16} />
                </a>

              </div>

            </div>

          </div>


          {/* RIGHT SIDE */}
          <div className="md:pl-20">

            <h2 className="text-2xl font-bold mb-10">
              INFORMATION
            </h2>

            

            <div className="flex flex-col gap-6 text-sm md:text-base">
                <Link
    to="/contact"
    className="hover:text-[#e99b70] transition"
>
    Contact Us
</Link>
              <Link
                to="/about"
                className="hover:text-[#e99b70] transition"
              >
                About Us
              </Link>

              <Link
                to="/privacy-policy"
                className="hover:text-[#e99b70] transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="hover:text-[#e99b70] transition"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/delivery"
                className="hover:text-[#e99b70] transition"
              >
                Delivery Details
              </Link>

              <Link
                to="/returns"
                className="hover:text-[#e99b70] transition"
              >
                Return Policy
              </Link>

              <Link
                to="/locations"
                className="hover:text-[#e99b70] transition"
              >
                Store Locations
              </Link>

            </div>

          </div>

        </div>


        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-16 pt-8">

          <div className="flex flex-col md:flex-row
          justify-between items-center gap-5">

            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © 2026{" "}
              <span className="text-[#e99b70] font-medium">
                NAKASA.
              </span>{" "}
              All Rights Reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">

              <div className="border border-gray-300 bg-white
              rounded px-4 py-2 text-sm font-bold">
                VISA
              </div>

              <div className="border border-gray-300 bg-white
              rounded px-4 py-2 text-sm font-bold">
                Mastercard
              </div>

              <div className="border border-gray-300 bg-white
              rounded px-4 py-2 text-sm font-bold">
                AMEX
              </div>

              <div className="border border-gray-300 bg-white
              rounded px-4 py-2 text-sm font-bold">
                PayPal
              </div>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}