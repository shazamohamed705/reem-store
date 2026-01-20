import React from 'react';

function KidsCategories({ onOpenItem }) {
  const categories = [
    {
      name: 'Clothes & Shoes',
      image: 'https://www.reem-store.com/images/kids.webp',
      link: 'https://photos.app.goo.gl/EetntP67VUzMpwRy6'
    }
  ];

  return (
    <section id="kids" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 max-w-screen-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider text-center mb-8 sm:mb-12 text-gray-900">
        Kids
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => onOpenItem?.({ name: category.name, image: category.image })}
            className="group relative overflow-hidden bg-gray-50 aspect-[3/4] cursor-pointer"
          >
            <img
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={category.image}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
              <h3 className="text-base sm:text-xl lg:text-2xl font-light tracking-wider text-white drop-shadow-lg">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default KidsCategories;

