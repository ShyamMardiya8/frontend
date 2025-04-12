import { Facebook, Instagram, Twitter } from "lucide-react";
import { footerLinks } from "../constatnt/FooterValue";

const Footer = () => {
    return (
      <footer className="bg-gray-100 text-gray-700">
        {/* Newsletter */}
        
  
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Info */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <h1 className="text-xl font-bold">SHOP.CO</h1>
              <p className="text-sm">
                We have clothes that suit your style and which you're proud to
                wear. From women to men.
              </p>
              <div className="flex gap-4 text-black mt-2">
                <Twitter className="w-5 h-5" />
                <Facebook className="w-5 h-5" />
                <Instagram className="w-5 h-5" />
              </div>
            </div>
  
            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-sm mb-4">{section.title}</h4>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, i) => (
                    <li key={i} className="hover:underline cursor-pointer">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
  
          {/* Bottom Bar */}
          <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
            <p>Shop.co © 2000-2023, All Rights Reserved</p>
            <div className="flex gap-2">
              <img src="/visa.svg" alt="Visa" className="h-5" />
              <img src="/mastercard.svg" alt="MasterCard" className="h-5" />
              <img src="/paypal.svg" alt="PayPal" className="h-5" />
              <img src="/applepay.svg" alt="Apple Pay" className="h-5" />
              <img src="/googlepay.svg" alt="Google Pay" className="h-5" />
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;