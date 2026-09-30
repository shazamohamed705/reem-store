import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";
import { useAuth } from "../../Context/AuthContext";
import { useCategories } from "../../hooks/useCategories";
import { getCategoryById, getProductById } from "../../api/categories";

function Navbar({ activeCollection, onSelectCollection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();
  const { categories, loading } = useCategories();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // للتشخيص - طباعة حالة المستخدم عند التحميل
  useEffect(() => {
    console.log("Navbar - User state changed:", user?.name || 'No user');
  }, [user]);

  // جلب الفئات من الـ API
  useEffect(() => {
    if (categories.length > 0) {
      console.log("Categories loaded:", categories.length);
    }
  }, [categories]);

  // إغلاق الـ dropdown لما يضغط المستخدم خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    // التحقق من وجود المستخدم بشكل أكثر دقة
    if (user && (user.name || user.email)) {
      setIsUserDropdownOpen((prev) => !prev);
    } else {
      navigate("/login", { state: { backgroundLocation: location } });
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
  };

  const handleNavClick = (categoryName) => {
    onSelectCollection(categoryName.toLowerCase());
    setIsMenuOpen(false);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    
    try {
      // جلب كل المنتجات من كل الـ categories والبحث عن الـ variant
      for (const category of categories) {
        const response = await getCategoryById(category.id);
        
        if (response.data && response.data.success && response.data.data) {
          const products = response.data.data.products || [];
          
          // البحث في كل منتج
          for (const product of products) {
            const productResponse = await getProductById(product.id);
            
            if (productResponse.data && productResponse.data.success && productResponse.data.data) {
              const productData = productResponse.data.data;
              const variants = productData.variants || [];
              
              // البحث عن الـ variant
              const foundVariant = variants.find(v => 
                v.name.toLowerCase().includes(searchQuery.toLowerCase())
              );
              
              if (foundVariant && foundVariant.google_photo_link) {
                // فتح اللينك مباشرة
                window.open(foundVariant.google_photo_link, '_blank');
                setIsSearchOpen(false);
                setSearchQuery('');
                return;
              }
            }
          }
        }
      }
      
      // لو مفيش نتائج
      alert('No results found for "' + searchQuery + '"');
      setSearchQuery('');
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    }
  };

  return (
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 pt-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu */}
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
            <a href="/" className="text-2xl font-light tracking-widest text-gray-900">
              MEZNA STORE
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-6 relative">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors" 
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 sm:w-80 bg-white border border-gray-200 shadow-lg z-50 rounded-lg p-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch();
                        }
                      }}
                      className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                      autoFocus
                    />
                    <button
                      onClick={handleSearch}
                      className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800"
                    >
                      Search
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleUserClick}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="User Account"
              >
                <FiUser className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:block text-sm font-light text-gray-900">
                  {user && (user.name || user.email) ? (user.name || user.email.split('@')[0]) : "Guest"}
                </span>
              </button>

              {/* Dropdown */}
              {user && (user.name || user.email) && isUserDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-lg z-50 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-light text-gray-900">{user.name || user.email?.split('@')[0] || 'User'}</p>
                    <p className="text-xs font-light text-gray-600 mt-1">{user.email || ''}</p>
                  </div>
                  <div className="border-t border-gray-100">
                    <button
                      className="w-full px-4 py-3 text-left text-sm font-light text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="h-px bg-gray-200 w-full"></div>

        {/* Navigation Links */}
        <div className={`pt-4 pb-4 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleNavClick(category.name)}
                  className={`text-base font-light tracking-wider uppercase transition-colors ${
                    activeCollection === category.name.toLowerCase()
                      ? "text-gray-900 border-b border-gray-900 pb-1"
                      : "text-gray-900 hover:text-gray-600"
                  }`}
                >
                  {category.name === 'Collections' ? 'Collections' : 
                   category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
