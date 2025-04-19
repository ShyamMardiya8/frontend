import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { DELETE_CART, GET_CART } from "../controllers/functions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface CartItem {
  _id: string;
  product_Name: string;
  image: string[];
  category: string;
  price: string;
  quantity: number;
  __v: number;
  size?: string;
  color?: string;
}

export default function CartPage({ setOrder, order }: any) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [check, setCheck] = useState<Boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  // This will sync the updated cart with the parent setOrder function
  useEffect(() => {
    setOrder(cart);
  }, [cart]);

  const fetchCartItems = async () => {
    try {
      const response = await GET_CART();
      const cartLength = response?.data.length;
      cartLength > 0 ? setCheck(false) : setCheck(true);

      const fixedCart: CartItem[] = response?.data?.map((item: any) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
        price: String(item.price),
      }));

      setCart(fixedCart);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await DELETE_CART(id);
      setCart((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleQuantity = (id: string, type: "inc" | "dec") => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handleCheckOut = () => {
    if (!check) {
      navigate("/order");
    } else {
      toast.error("Your cart is empty", { position: "top-right" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-8">YOUR CART</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white rounded-xl border p-4 shadow-sm"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.image?.[0] || "https://via.placeholder.com/80"}
                  alt={item.product_Name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="font-semibold text-base mb-1">
                    {item.product_Name}
                  </h2>
                  <p className="text-lg font-semibold mt-1">
                    ${parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantity(item._id, "dec")}
                  className="w-8 h-8 border rounded-full flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantity(item._id, "inc")}
                  className="w-8 h-8 border rounded-full flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount (-20%)</span>
              <span className="text-red-500">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Add promo code"
              className="flex-1 border px-3 py-2 rounded-full text-sm"
            />
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm">
              Apply
            </button>
          </div>

          <button
            className="cursor-pointer w-full bg-black text-white rounded-full py-3 mt-4 font-medium flex items-center justify-center gap-2"
            onClick={handleCheckOut}
          >
            Go to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}
  