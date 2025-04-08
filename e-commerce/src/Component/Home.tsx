import { Star } from 'lucide-react'
import { products, styles } from '../constatnt/Product'
import Testimonal from './Testimonal'
import Footer from './Footer'

const Home = () => {
  return (
    <>
        <section className="py-12 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center mb-10">NEW ARRIVALS</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-contain mb-4"
            />

            <h3 className="font-medium text-base mb-1">{product.title}</h3>

            {/* Rating */}
            <div className="flex items-center justify-center text-yellow-400 text-sm mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              ))}
              <span className="ml-2 text-gray-600">{product.rating}/5</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 text-base font-semibold">
              <span>${product.price}</span>

              {product.originalPrice && (
                <span className="text-gray-400 line-through font-normal">
                  ${product.originalPrice}
                </span>
              )}

              {product.discount && (
                <span className="text-red-500 text-xs bg-red-100 px-2 py-0.5 rounded-full font-medium">
                  -{product.discount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-10 flex justify-center">
        <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition font-medium">
          View All
        </button>
      </div>
    </section>

    <section className="py-12 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center mb-10">TOP SELLING</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-contain mb-4"
            />

            <h3 className="font-medium text-base mb-1">{product.title}</h3>

            {/* Rating */}
            <div className="flex items-center justify-center text-yellow-400 text-sm mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              ))}
              <span className="ml-2 text-gray-600">{product.rating}/5</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 text-base font-semibold">
              <span>${product.price}</span>

              {product.originalPrice && (
                <span className="text-gray-400 line-through font-normal">
                  ${product.originalPrice}
                </span>
              )}

              {product.discount && (
                <span className="text-red-500 text-xs bg-red-100 px-2 py-0.5 rounded-full font-medium">
                  -{product.discount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-10 flex justify-center">
        <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition font-medium">
          View All
        </button>
      </div>
    </section>

    <section className="bg-gray-100 px-4 py-12 rounded-3xl max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
        BROWSE BY DRESS STYLE
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* Row 1 - Casual (6 cols) */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-xl shadow-sm group cursor-pointer h-52 sm:h-64">
          <img
            src={styles[0].image}
            alt={styles[0].label}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition duration-300" />
          <div className="absolute top-3 left-4 text-lg font-semibold text-black group-hover:text-white transition">
            {styles[0].label}
          </div>
        </div>

        {/* Row 1 - Formal (6 cols) */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-xl shadow-sm group cursor-pointer h-52 sm:h-64">
          <img
            src={styles[1].image}
            alt={styles[1].label}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition duration-300" />
          <div className="absolute top-3 left-4 text-lg font-semibold text-black group-hover:text-white transition">
            {styles[1].label}
          </div>
        </div>

        {/* Row 2 - Party (8 cols) */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-xl shadow-sm group cursor-pointer h-52 sm:h-64">
          <img
            src={styles[2].image}
            alt={styles[2].label}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition duration-300" />
          <div className="absolute top-3 left-4 text-lg font-semibold text-black group-hover:text-white transition">
            {styles[2].label}
          </div>
        </div>

        {/* Row 2 - Gym (4 cols) */}
        <div className="lg:col-span-4 relative overflow-hidden rounded-xl shadow-sm group cursor-pointer h-52 sm:h-64">
          <img
            src={styles[3].image}
            alt={styles[3].label}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition duration-300" />
          <div className="absolute top-3 left-4 text-lg font-semibold text-black group-hover:text-white transition">
            {styles[3].label}
          </div>
        </div>
      </div>
    </section>
    <Testimonal />
    <Footer />
    </>
  )
}

export default Home