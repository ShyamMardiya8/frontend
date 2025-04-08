import { useState } from "react";
import { reviews, single_product } from "../constatnt/Singel";
import { CheckCircle2, Minus, Plus, Star } from "lucide-react";

export default function SingleProduct() {
    const [selectedColor, setSelectedColor] = useState(single_product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(single_product.sizes[2]);
    const [quantity, setQuantity] = useState(1);
    const [tab, setTab] = useState("reviews");
  
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="flex flex-col items-center">
            <img src={single_product.images[0]} alt="Product" className="rounded-xl mb-4 max-w-md" />
            <div className="flex gap-2">
              {single_product.images.map((src, i) => (
                <img key={i} src={src} className="w-16 h-16 rounded-md object-cover border" />
              ))}
            </div>
          </div>
  
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{single_product.name}</h1>
            <div className="flex items-center gap-1 text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(single_product.rating) ? "fill-yellow-500" : ""}`}
                />
              ))}
              <span className="text-sm text-black">{single_product.rating}/5</span>
            </div>
  
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold">${single_product.price}</span>
              <span className="line-through text-gray-500">${single_product.originalPrice}</span>
              <span className="text-red-500 font-semibold">-{single_product.discount}%</span>
            </div>
  
            <p className="text-gray-600 mb-6">{single_product.description}</p>
  
            <div className="mb-4">
              <p className="font-medium mb-1">Select Colors</p>
              <div className="flex gap-3">
                {single_product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColor === color ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
  
            <div className="mb-4">
              <p className="font-medium mb-1">Choose Size</p>
              <div className="flex gap-2 flex-wrap">
                {single_product.sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      selectedSize === size ? "bg-black text-white" : "bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
  
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded-full"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border rounded-full"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
  
            <button className="w-full bg-black text-white py-3 rounded-full text-lg font-medium">
              Add to Cart
            </button>
          </div>
        </div>
  
        {/* Tabs */}
        <div className="mt-12 border-b flex justify-center gap-8">
          {['Product Details', 'Rating & Reviews', 'FAQs'].map((item, i) => (
            <button
              key={i}
              onClick={() => setTab(item.toLowerCase())}
              className={`pb-2 font-medium ${
                tab === item.toLowerCase() ? "border-b-2 border-black" : "text-gray-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
  
        {/* Tab Content */}
        {tab === "rating & reviews" && (
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className="border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${idx < Math.round(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <h4 className="font-semibold flex items-center gap-1">
                  {review.name}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </h4>
                <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  