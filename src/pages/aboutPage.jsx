export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="bg-[#f8f8f8] py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          ABOUT US
        </h1>

        <p className="mt-4 text-gray-600">
          Discover the story behind NAKASA
        </p>
      </section>


      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* Image Placeholder */}
          <div className="h-[450px] bg-[#f8f8f8] flex items-center justify-center">
            <span className="text-gray-400 text-lg">
              NAKASA IMAGE
            </span>
          </div>


          {/* Content */}
          <div>

            <p className="text-sm uppercase tracking-[0.2em] text-[#e99b70] font-medium mb-4">
              Welcome to NAKASA
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fashion That Makes You Feel Confident
            </h2>

            <p className="text-gray-600 leading-7 mb-5">
              NAKASA is a fashion brand created to bring stylish,
              modern, and affordable clothing to customers who love
              expressing themselves through fashion.
            </p>

            <p className="text-gray-600 leading-7 mb-5">
              We carefully select our collections to provide designs
              that combine comfort, quality, and contemporary style.
              Whether you are looking for something casual or
              something special, NAKASA is here to help you find
              something you love.
            </p>

            <p className="text-gray-600 leading-7">
              Our goal is simple — to make online shopping easy,
              enjoyable, and accessible while providing our customers
              with products they can feel confident wearing.
            </p>

          </div>

        </div>

      </section>


      {/* Our Mission */}
      <section className="bg-[#fff5ef] py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-sm uppercase tracking-[0.2em] text-[#e99b70] font-medium mb-4">
            Our Mission
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Making Fashion Simple & Beautiful
          </h2>

          <p className="text-gray-600 leading-8 max-w-3xl mx-auto">
            At NAKASA, our mission is to bring together quality,
            style, and convenience. We want every customer to enjoy
            discovering new styles and have a smooth shopping
            experience from browsing products to receiving their
            order.
          </p>

        </div>

      </section>


      {/* Why Choose NAKASA */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">

        <div className="text-center mb-14">

          <p className="text-sm uppercase tracking-[0.2em] text-[#e99b70] font-medium mb-3">
            Why NAKASA
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Why Choose Us?
          </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="border border-gray-200 p-8 text-center hover:shadow-lg transition">

            <h3 className="text-xl font-bold mb-4">
              Quality
            </h3>

            <p className="text-gray-600 leading-7">
              We focus on providing products with good quality,
              comfortable materials, and carefully selected designs.
            </p>

          </div>


          {/* Card 2 */}
          <div className="border border-gray-200 p-8 text-center hover:shadow-lg transition">

            <h3 className="text-xl font-bold mb-4">
              Modern Style
            </h3>

            <p className="text-gray-600 leading-7">
              Our collections are selected with modern fashion
              trends in mind so you can discover styles that fit
              your personality.
            </p>

          </div>


          {/* Card 3 */}
          <div className="border border-gray-200 p-8 text-center hover:shadow-lg transition">

            <h3 className="text-xl font-bold mb-4">
              Customer First
            </h3>

            <p className="text-gray-600 leading-7">
              We believe our customers come first. We aim to provide
              a simple, convenient, and enjoyable shopping experience.
            </p>

          </div>

        </div>

      </section>


      {/* Call To Action */}
      <section className="bg-black text-white py-20 text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-5">
          Discover Your Style With NAKASA
        </h2>

        <p className="text-gray-300 mb-8">
          Explore our latest collection and find something made for you.
        </p>

        <a
          href="/"
          className="inline-block bg-[#ffc29d] text-black
          px-8 py-3 rounded-full font-medium
          hover:bg-[#ffb589] transition duration-300"
        >
          SHOP NOW →
        </a>

      </section>

    </div>
  );
}