import React from 'react';

function Footer({ activeCollection, onSelectCollection }) {
  const scrollToSection = (sectionId) => {
    // If we're on a collection page (women, men, kids), go back to default first
    if (['women', 'men', 'kids'].includes(activeCollection)) {
      onSelectCollection('default');
      // Wait for the page to update, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } else {
      // Already on default page, just scroll
      const element = document.getElementById(sectionId);
      if (!element) return;
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Shop By Category Section */}
      <div className="bg-white border-b border-gray-200 py-6 sm:py-8">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-8">
          <h3 className="text-sm sm:text-base font-light tracking-widest uppercase text-gray-900 text-center mb-4 sm:mb-6">
            Shop By Category
          </h3>
          <div className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto">
            <button 
              onClick={() => scrollToSection('women')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 sm:py-5 text-sm sm:text-base font-light tracking-widest uppercase transition-all duration-300"
            >
              Women
            </button>
            <button 
              onClick={() => scrollToSection('men')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 sm:py-5 text-sm sm:text-base font-light tracking-widest uppercase transition-all duration-300"
            >
              Men
            </button>
            <button 
              onClick={() => scrollToSection('kids')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 sm:py-5 text-sm sm:text-base font-light tracking-widest uppercase transition-all duration-300"
            >
              Kids
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* About Reem Store */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs sm:text-sm font-light tracking-widest uppercase text-gray-900 mb-4 sm:mb-6">
              About Reem Store
            </h3>
            <p className="text-xs sm:text-sm font-light text-gray-600 leading-relaxed">
              Premium quality, authentic products identical to originals. Experience luxury with our curated collections.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xs sm:text-sm font-light tracking-widest uppercase text-gray-900 mb-4 sm:mb-6">
              Customer Service
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a className="text-xs sm:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors" href="/contact" data-discover="true">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="text-xs sm:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors" href="/shipping" data-discover="true">
                  Shipping
                </a>
              </li>
              <li>
                <a className="text-xs sm:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors" href="/returns" data-discover="true">
                  Returns
                </a>
              </li>
              <li>
                <a className="text-xs sm:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors" href="/faq" data-discover="true">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs sm:text-sm font-light tracking-widest uppercase text-gray-900 mb-4 sm:mb-6">
              Shop
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('women');
                  }}
                  className="text-xs sm:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors cursor-pointer" 
                  data-discover="true"
                >
                  Women
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('men');
                  }}
                  className="text-xs sm:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors cursor-pointer" 
                  data-discover="true"
                >
                  Men
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('kids');
                  }}
                  className="text-xs sm:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors cursor-pointer" 
                  data-discover="true"
                >
                  Kids
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('collections');
                  }}
                  className="text-xs sm:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors cursor-pointer" 
                  data-discover="true"
                >
                  Collections
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs sm:text-sm font-light tracking-widest uppercase text-gray-900 mb-4 sm:mb-6">
              Connect
            </h3>
            <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
              <a href="https://instagram.com/reem.store7777" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
            <p className="text-xs sm:text-sm font-light text-gray-600 mb-2">
              Cash on Delivery Available
            </p>
            <p className="text-xs sm:text-sm font-light text-gray-600">
              Easy Returns Within 3 Days T&C Applied
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <p className="text-xs font-light text-gray-500 text-center">
            © 2025 Reem Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

