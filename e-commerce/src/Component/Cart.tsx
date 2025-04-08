import { useState } from "react";
import { initialCart } from "../constatnt/Cart";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
    const [cart, setCart] = useState(initialCart);
  
    const handleQuantity = (id : any, type : any) => {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
              }
            : item
        )
      );
    };
  
    const handleRemove = (id : any) => {
      setCart((prev) => prev.filter((item) => item.id !== id));
    };
  
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black mb-8">YOUR CART</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white rounded-xl border p-4 shadow-sm">
                <div className="flex gap-4 items-center">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h2 className="font-semibold text-base mb-1">{item.title}</h2>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                    <p className="text-lg font-semibold mt-1">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantity(item.id, "dec")}
                    className="w-8 h-8 border rounded-full flex items-center justify-center"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantity(item.id, "inc")}
                    className="w-8 h-8 border rounded-full flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </button>
                  <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-600">
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
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount (-20%)</span>
                <span className="text-red-500">-${discount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>${deliveryFee}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(0)}</span>
              </div>
            </div>
  
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add promo code"
                className="flex-1 border px-3 py-2 rounded-full text-sm"
              />
              <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Apply</button>
            </div>
  
            <button className="w-full bg-black text-white rounded-full py-3 mt-4 font-medium flex items-center justify-center gap-2">
              Go to Checkout →
            </button>
          </div>
        </div>
      </div>
    );
  }