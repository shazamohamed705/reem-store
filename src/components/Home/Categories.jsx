import React from 'react';

function Categories() {
  const categories = [
    { name: 'Women', id: 'women' },
    { name: 'Men', id: 'men' },
    { name: 'Kids', id: 'kids' }
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
    <section className="py-10" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => scrollToSection(category.id)}
              className="bg-white hover:bg-gray-900 text-gray-900 hover:text-white py-4 sm:py-6 text-sm sm:text-base font-light tracking-widest uppercase transition-all duration-300 px-8"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;

