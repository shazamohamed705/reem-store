import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";

function Navbar({ activeCollection, onSelectCollection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserClick = () => {
    navigate('/login', { state: { backgroundLocation: location } });
  };

  const handleNavClick = (id) => {
    onSelectCollection(id);
    setIsMenuOpen(false);
  };
  const navItems = [
    { id: "women", label: "Women" },
    { id: "men", label: "Men" },
    { id: "kids", label: "Kids" },
    { id: "collections", label: "Collections" }
  ];

  return (
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 pt-4">
      {/* Top Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo, Menu, and Icons Row */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <a 
              href="/" 
              className="text-2xl font-light tracking-widest text-gray-900"
              data-discover="true"
            >
              REEM STORE
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button 
              onClick={handleUserClick}
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="User Account"
            >
              <FiUser className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Line - Under logo and icons */}
        <div className="h-px bg-gray-200 w-full"></div>

        {/* Navigation Links */}
        <div className={`pt-4 pb-4 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = activeCollection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-base font-light tracking-wider uppercase transition-colors ${
                    isActive
                      ? "text-gray-900 border-b border-gray-900 pb-1"
                      : "text-gray-900 hover:text-gray-600"
                  }`}
                  data-discover="true"
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
