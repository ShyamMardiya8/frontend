import { useState } from "react";
import { X, Filter } from "lucide-react";
import { categories, products } from "../constatnt/Products";


export default function Shop() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4">
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Casual</h2>
        <button
          className="flex items-center gap-1 text-sm px-3 py-2 border rounded-md"
          onClick={() => setShowFilters(true)}
        >
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 w-full h-full lg:w-64 lg:h-auto bg-white p-6 overflow-y-auto shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out ${showFilters ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h3 className="text-lg font-bold">Filters</h3>
          <button onClick={() => setShowFilters(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat}
              className="text-gray-700 hover:text-black cursor-pointer"
            >
              {cat}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Price</h3>
          <div className="flex items-center gap-2">
            <span>$50</span>
            <input type="range" className="w-full" />
            <span>$200</span>
          </div>
        </div>
      </aside>

      {/* Product List */}
      <main className="flex-1">
        <div className="hidden lg:flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Casual</h2>
          <span className="text-sm text-gray-500">Sort by: Most Popular</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover mb-4 rounded"
              />
              <h4 className="font-semibold mb-1 text-sm md:text-base">
                {product.name}
              </h4>
              <div className="flex items-center text-yellow-500 text-sm mb-1">
                ⭐ {product.rating}
              </div>
              <div className="text-base font-bold">
                {product.price}
                {product.oldPrice && (
                  <span className="text-gray-400 line-through ml-2 text-sm">
                    {product.oldPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="text-red-500 ml-2 text-sm">
                    -{product.discount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Overlay */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setShowFilters(false)}
        ></div>
      )}
    </div>
  );
}
