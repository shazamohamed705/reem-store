import React from 'react';

function WomenCategories({ onOpenItem }) {
  const categories = [
    {
      name: 'Handbag',
      image: 'https://www.reem-store.com/images/handbag.webp',
      link: 'https://reem-store.com/bags.html'
    },
    {
      name: 'Shoes',
      image: 'https://www.reem-store.com/images/shoes.webp',
      link: 'https://reem-store.com/shoes.html'
    },
    {
      name: 'Clothes',
      image: 'https://www.reem-store.com/images/clothes.webp',
      link: 'https://reem-store.com/clothes.html'
    },
    {
      name: 'Watches',
      image: 'https://www.reem-store.com/images/watches.webp',
      link: 'https://photos.app.goo.gl/Wo2BrGcwmWqH34U2A'
    },
    {
      name: 'Accessories',
      image: 'https://www.reem-store.com/images/jewelry.webp',
      link: 'https://photos.app.goo.gl/y4DEXDLrVJdnk5Ek8'
    },
    {
      name: 'Sunglasses',
      image: 'https://www.reem-store.com/images/sunglass.webp',
      link: 'https://photos.app.goo.gl/1kZuzKtSw2FNzhsY6'
    },
    {
      name: 'Wallet',
      image: 'https://www.reem-store.com/images/wallet.webp',
      link: 'https://photos.app.goo.gl/UUexWcSk1Qx2Tncm8'
    },
    {
      name: 'Trolley',
      image: 'https://www.reem-store.com/images/trolly.webp',
      link: 'https://photos.app.goo.gl/58rqTteGawTpkr969'
    },
    {
      name: 'Belts',
      image: 'https://www.reem-store.com/images/belts.webp',
      link: 'https://photos.app.goo.gl/ErfaS75igV6CWvw99'
    },
    {
      name: 'Scarf',
      image: 'https://www.reem-store.com/images/scarf.webp',
      link: 'https://photos.app.goo.gl/DV1QwA26ydLuUHJL9'
    },
    {
      name: 'Hats',
      image: 'https://www.reem-store.com/images/hats.webp',
      link: 'https://photos.app.goo.gl/AKDYvKrpN6anSDJ49'
    }
  ];

  return (
    <section id="women" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 max-w-screen-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider text-center mb-8 sm:mb-12 text-gray-900">
        Women
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

export default WomenCategories;

