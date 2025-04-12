import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { shopSubmenu } from "../constatnt/value";
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
              <button className="hover:underline">Shop</button>

              {/* Submenu */}
              <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50">
                {shopSubmenu.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <a href="#" className="hover:underline">
              On Sale
            </a>
            <a href="#" className="hover:underline">
              New Arrivals
            </a>
            <a href="#" className="hover:underline">
              Brands
            </a>
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
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
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
              <details>
                <summary className="cursor-pointer">Shop</summary>
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
              </details>

              <a href="#" className="block">
                On Sale
              </a>
              <a href="#" className="block">
                New Arrivals
              </a>
              <a href="#" className="block">
                Brands
              </a>
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
