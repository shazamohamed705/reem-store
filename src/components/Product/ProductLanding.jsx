import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ProductLanding({ item, onBack, onOpenShoes, onOpenBags, onOpenClothes }) {
  const { name, image } = item || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.backgroundLocation;

  const openLogin = () => {
    navigate('/login', { state: { backgroundLocation: background || location } });
  };

  const menuItems = [
    { label: 'Home', action: onBack },
    { label: 'Bags', action: onOpenBags },
    { label: 'Shoes', action: onOpenShoes },
    { label: 'Clothes', action: onOpenClothes },
    { label: 'Login', action: openLogin },
    { label: 'Returns' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Simple navbar inspired by provided snippet */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="w-full px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-xl px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 sm:hidden"
            >
              ☰
            </button>
            <button
              onClick={onBack}
              className="text-lg font-bold tracking-widest text-gray-900"
            >
              REEM STORE
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-1">
            <input
              type="text"
              placeholder="Search (e.g., Gucci, Chanel)"
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button className="px-4 py-2 bg-gray-900 text-white text-sm tracking-wider rounded hover:bg-gray-800">
              Search
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-semibold">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="hover:text-gray-600"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 flex flex-col gap-3 text-sm font-semibold">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action?.();
                    setIsMenuOpen(false);
                  }}
                  className="text-left w-full px-3 py-2 rounded hover:bg-gray-100"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Preview</p>
            <h1 className="text-3xl sm:text-4xl font-light tracking-wider text-gray-900">
              {name || 'Collection Item'}
            </h1>
            <p className="text-gray-600">
              This is a preview page inside the site. Click Home (or the menu icon) to return.
            </p>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-gray-900 text-white tracking-wider text-sm uppercase rounded hover:bg-gray-800">
                Add to Cart
              </button>
              <button onClick={onBack} className="px-6 py-3 border border-gray-900 text-gray-900 tracking-wider text-sm uppercase rounded hover:bg-gray-900 hover:text-white">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductLanding;

