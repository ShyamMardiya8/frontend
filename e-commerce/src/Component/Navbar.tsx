import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);


  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => setAnimateSidebar(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateSidebar(false);
    }
  }, [menuOpen]);
  
  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-sm text-center p-2">
        Sign up and get 20% off to your first order.{" "}
        <a href="#" className="underline">
          Sign Up Now
        </a>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-4 sm:px-8 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold">SHOP.CO</span>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {/* Shop with submenu */}
            <div className="relative group">
              <Link to='/shop' className="hover:underline">Shop</Link>
            </div>

            <Link to="/shop" className="hover:underline">
              On Sale
            </Link>
            <Link to="/shop" className="hover:underline">
              New Arrivals
            </Link>
            <Link to="/shop" className="hover:underline">
              Brands
            </Link>
          </div>
        </div>

        {/* Center Search */}
        <div className="hidden lg:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full max-w-md px-4 py-2 rounded-full border border-gray-200 bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to='/cart'>
          <ShoppingCart className="w-5 h-5 cursor-pointer cursor-pointer" />
          </Link>
          <User className="w-5 h-5 cursor-pointer" />
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden focus:outline-none"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay + Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div
            className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-500 ease-in-out ${
              animateSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <nav className="mt-8 space-y-4 text-sm">
              {/* <details>
                <Link to='/shop'  className="cursor-pointer">Shop</Link>
                <div className="pl-4 mt-2 space-y-1 ">
                  {shopSubmenu.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block hover:underline text-gray-700 z-10"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </details> */}
              <Link to='/shop' className="hover:underline block" onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link to="/shop" className="block" onClick={() => setMenuOpen(false)}>
                On Sale
              </Link>
              <Link to="/shop" className="block" onClick={() => setMenuOpen(false)}>
                New Arrivals
              </Link>
              <input
                type="text"
                placeholder="Search..."
                className="w-full mt-4 px-4 py-2 rounded-full border border-gray-200 bg-gray-100"
              />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
