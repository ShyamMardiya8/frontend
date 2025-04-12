import { useEffect, useState } from "react";
import { CheckCircle2, Minus, Plus, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { CREATE_CART, GET_PRODUCTS_BY_ID } from "../controllers/functions";
import { reviews } from "../constatnt/Singel";


interface ProductType {
  _id: string;
  product_Name: string;
  image: string[];
  category: string;
  decripation: string;
  price: string;
  quantity: string;
  __v: number;
}

export default function SingleProduct() {
  const { id } = useParams();
  const [single, setSingle] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("reviews");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const GET_PRODUCTS_BY_ID_PAGE = async () => {
    if (!id) return;
    const response = await GET_PRODUCTS_BY_ID(id);
    setSingle(response);
  };

  useEffect(() => {
    GET_PRODUCTS_BY_ID_PAGE();
  }, [id]);

  useEffect(() => {
    if (single?.image?.[0]) {
      setSelectedImage(single.image[0]);
    }
  }, [single]);


  const ADD_TO_CART = async (payload: any) => {
      const response = await CREATE_CART(payload);
      console.log("response", response)
  };
  const handleCart  = (single : any) => {
    ADD_TO_CART(single);
    
    console.log("getting this data", single)
  }
  if (!single) return <div className="text-center py-10">Loading product...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="flex flex-col items-center">
          <img
            src={selectedImage || ""}
            alt="Product"
            className="rounded-xl mb-4 max-w-md"
          />
          <div className="flex gap-2">
            {single.image.map((src, i) => (
              <img
                key={i}
                src={src}
                onClick={() => setSelectedImage(src)}
                className={`w-16 h-16 rounded-md object-cover border cursor-pointer ${
                  selectedImage === src ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{single.product_Name}</h1>

          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < 4 ? "fill-yellow-500" : ""}`} />
            ))}
            <span className="text-sm text-black">4/5</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold">${single.price}</span>
            <span className="line-through text-gray-500">$200</span>
            <span className="text-red-500 font-semibold">-20%</span>
          </div>

          <p className="text-gray-600 mb-6">{single.decripation}</p>

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

          <button className="w-full bg-black text-white py-3 rounded-full text-lg font-medium" onClick={() => handleCart(single)}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 border-b flex justify-center gap-8">
        {["Product Details", "Rating & Reviews", "FAQs"].map((item, i) => (
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
                    className={`w-4 h-4 ${
                      idx < Math.round(review.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
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
