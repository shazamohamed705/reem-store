import React from 'react';

function Categories() {
  const categories = [
    { name: 'Women', id: 'women', description: 'Elegant & Stylish' },
    { name: 'Men', id: 'men', description: 'Classic & Modern' },
    { name: 'Kids', id: 'kids', description: 'Fun & Comfortable' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4 text-gray-900">
            Shop By Category
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => scrollToSection(category.id)}
              className="group relative overflow-hidden bg-gray-50 hover:bg-gray-900 transition-all duration-500 p-12 border-2 border-gray-200 hover:border-gray-900"
            >
              <div className="relative z-10">
                <h3 className="text-3xl font-light tracking-widest uppercase text-gray-900 group-hover:text-white transition-colors duration-500 mb-3">
                  {category.name}
                </h3>
                <p className="text-sm tracking-wide text-gray-600 group-hover:text-white/80 transition-colors duration-500">
                  {category.description}
                </p>
                <div className="mt-6 w-12 h-0.5 bg-gray-900 group-hover:bg-white group-hover:w-full transition-all duration-500"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;

