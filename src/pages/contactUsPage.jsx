import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock
} from "react-icons/fa";

export default function ContactUsPage() {
    return (
        <div className="bg-white text-gray-900">

            {/* Hero Section */}
            <section className="bg-[#f8f8f8] py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
                    CONTACT US
                </h1>

                <p className="mt-4 text-gray-600">
                    We'd love to hear from you. Get in touch with NAKASA.
                </p>
            </section>


            {/* Contact Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">


                    {/* LEFT SIDE - Contact Information */}
                    <div>

                        <h2 className="text-3xl font-bold mb-6">
                            Get In Touch
                        </h2>

                        <p className="text-gray-600 leading-7 mb-10">
                            Have a question about our products, orders, delivery,
                            or anything else? Our team is here to help.
                        </p>


                        {/* Phone */}
                        <div className="flex items-start gap-5 mb-7">
                            <div className="w-12 h-12 rounded-full bg-[#ffc29d]
                            flex items-center justify-center">
                                <FaPhone />
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">
                                    Phone
                                </h3>

                                <p className="text-gray-600 mt-1">
                                    +94 XX XXX XXXX
                                </p>
                            </div>
                        </div>


                        {/* Email */}
                        <div className="flex items-start gap-5 mb-7">
                            <div className="w-12 h-12 rounded-full bg-[#ffc29d]
                            flex items-center justify-center">
                                <FaEnvelope />
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">
                                    Email
                                </h3>

                                <p className="text-gray-600 mt-1">
                                    support@nakasa.lk
                                </p>
                            </div>
                        </div>


                        {/* Location */}
                        <div className="flex items-start gap-5 mb-7">
                            <div className="w-12 h-12 rounded-full bg-[#ffc29d]
                            flex items-center justify-center">
                                <FaMapMarkerAlt />
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">
                                    Location
                                </h3>

                                <p className="text-gray-600 mt-1">
                                    Sri Lanka
                                </p>
                            </div>
                        </div>


                        {/* Opening Hours */}
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-full bg-[#ffc29d]
                            flex items-center justify-center">
                                <FaClock />
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">
                                    Opening Hours
                                </h3>

                                <p className="text-gray-600 mt-1">
                                    Monday - Saturday: 9:00 AM - 6:00 PM
                                </p>
                            </div>
                        </div>

                    </div>


                    {/* RIGHT SIDE - Contact Form */}
                    <div className="bg-[#f8f8f8] p-8 md:p-10 rounded-2xl">

                        <h2 className="text-3xl font-bold mb-8">
                            Send Us A Message
                        </h2>

                        <form className="space-y-6">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-5 py-3 bg-white
                                    border border-gray-300 rounded-lg
                                    outline-none focus:border-[#e99b70]"
                                />
                            </div>


                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-5 py-3 bg-white
                                    border border-gray-300 rounded-lg
                                    outline-none focus:border-[#e99b70]"
                                />
                            </div>


                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="w-full px-5 py-3 bg-white
                                    border border-gray-300 rounded-lg
                                    outline-none focus:border-[#e99b70]"
                                />
                            </div>


                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Message
                                </label>

                                <textarea
                                    rows="5"
                                    placeholder="Write your message..."
                                    className="w-full px-5 py-3 bg-white
                                    border border-gray-300 rounded-lg
                                    outline-none resize-none
                                    focus:border-[#e99b70]"
                                ></textarea>
                            </div>


                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-[#ffc29d]
                                hover:bg-[#ffb589]
                                py-3 rounded-lg font-semibold
                                transition duration-300"
                            >
                                SEND MESSAGE →
                            </button>

                        </form>

                    </div>

                </div>

            </section>

        </div>
    );
}