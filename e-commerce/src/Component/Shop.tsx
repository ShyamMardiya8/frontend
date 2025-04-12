import { useEffect, useState } from "react";
import { X, Filter } from "lucide-react";
// import { categories, products } from "../constatnt/Products";
import { GET_PRODUCTS } from "../controllers/functions";
import { useNavigate } from "react-router-dom";


interface Product {
  _id: string;
  product_Name: string;
  image: string[];
  decripation: string;
  price: string;
  quantity: string;
  category?: string;
}


export default function Shop() {
  const [showFilters, setShowFilters] = useState(false);
  const [product, setProduct] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate()
  const filteredProducts = selectedCategory
  ? product.filter(product => product.category === selectedCategory)
  : product;

  const categories = [...new Set(product.map(product => product.category))]; // Unique categories

  console.log("cat", categories)
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchData = async  () => {
    const response = await GET_PRODUCTS()
    setProduct(response)
    console.log("product", response)
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleClick = (id : any) => {
    console.log("id", id)
    navigate(`/product/${id}`)
  }
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
          {categories.map((cat : any) => (
            <li
              key={cat?._id}
              className="text-gray-700 hover:text-black cursor-pointer"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>

        {/* <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Price</h3>
          <div className="flex items-center gap-2">
            <span>$50</span>
            <input type="range" className="w-full" />
            <span>$200</span>
          </div>
        </div> */}
      </aside>

      {/* Product List */}
      <main className="flex-1">
        <div className="hidden lg:flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Casual</h2>
          <span className="text-sm text-gray-500">Sort by: Most Popular</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, idx) => (
      <div key={product._id || idx} className="border rounded-lg p-4 bg-white" onClick={() => handleClick(product._id)}>
        <img
          src={
            product.image?.[0]?.startsWith("https")
              ? product.image[0]
              : `/uploads/${product.image?.[0] || "default.jpg"}`
          }
          alt={product.product_Name}
          className="w-full h-60 object-cover mb-4 rounded"
        />
        <h4 className="font-semibold mb-1 text-sm md:text-base">
          {product.product_Name}
        </h4>
        <p className="text-gray-500 text-xs mb-2">{product.decripation}</p>
        <div className="text-base font-bold text-gray-800">
          ₹{product.price}
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
