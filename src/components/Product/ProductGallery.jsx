import React, { useState } from 'react';

const galleryItems = [
  { name: 'ALL SHOES', image: 'images/all_shoes.jpg', link: 'https://photos.app.goo.gl/JcKUzQw4e5f8E2fXA' },
  { name: 'CHANEL', image: 'images/chanel_shoes.jpg', link: 'https://photos.app.goo.gl/cnZp1CCYbKe6Zuaf8' },
  { name: 'LORO PIANA', image: 'images/loro piana_shoes.jpg', link: 'https://photos.app.goo.gl/H9juxvHXtPktaxLs6' },
  { name: 'AQUAZZURA', image: 'images/aquazzura_shoes.jpg', link: 'https://photos.app.goo.gl/fP7bu1qDoMURfrwf6' },
  { name: 'AMINA MUADDI', image: 'images/AMINA MUADDI_shoes.jpg', link: 'https://photos.app.goo.gl/8EQQEAyg1SM1tSJj6' },
  { name: 'GUCCI', image: 'images/gucci_shoes.jpg', link: 'https://photos.app.goo.gl/yVQiBtoi3W2mSqh4A' },
  { name: 'HERMES', image: 'images/hermes_shoes.jpg', link: 'https://photos.app.goo.gl/z88v5s9GngiaGnWq5' },
  { name: 'BALENCIAGA', image: 'images/balenciaga_shoes.jpg', link: 'https://photos.app.goo.gl/4HjvwgmC6aTVCR5U8' },
  { name: 'ROGER VIVIER', image: 'images/Roger Vivier.jpg', link: 'https://photos.app.goo.gl/81RS4j9a7S4CoDTS9' },
  { name: 'CELINE', image: 'images/celine_shoes.jpg', link: 'https://photos.app.goo.gl/VihmGQQE1QmmjoVZA' },
  { name: 'GOLDEN GOOSE', image: 'images/golden goose.jpg', link: 'https://photos.app.goo.gl/MYZpqq3n9v4H45rs9' },
  { name: 'GIANVITO ROSSI', image: 'images/gianvito rossi_shoes.jpg', link: 'https://photos.app.goo.gl/wYTxMHjJvVsKU5Ss6' },
  { name: 'UGG', image: 'images/UGG_shoes.jpg', link: 'https://photos.app.goo.gl/E4xwbttEDDmg3vCa8' },
  { name: 'YSL', image: 'images/YSL_shoes.jpg', link: 'https://photos.app.goo.gl/9KyZyvUfEhFYykhG6' },
  { name: 'VALENTINO', image: 'images/valentino_shoes.jpg', link: 'https://photos.app.goo.gl/MdooYBRiAbyPfqYU6' },
  { name: 'MIU MIU', image: 'images/miu miu_shoes.jpg', link: 'https://photos.app.goo.gl/ge9hHCkf6NbME3as9' },
  { name: 'DIOR', image: 'images/dior_shoes.jpg', link: 'https://photos.app.goo.gl/6C9g3anDEHXSAQMa6' },
  { name: 'FENDI', image: 'images/fendi_shoes.jpg', link: 'https://photos.app.goo.gl/MZtJscV4JxFZfonu9' },
  { name: 'LOUIS VUITTON', image: 'images/LOUIS VUITTON_shoes.jpg', link: 'https://photos.app.goo.gl/cHPsuLmXGbYHF8Hr6' },
  { name: 'GINA', image: 'images/Gina_shoes.jpg', link: 'https://photos.app.goo.gl/j3VGhtdsL4uFMNcUA' },
  { name: 'BOTTEGA VENETA', image: 'images/Bottega Veneta_shoes.jpg', link: 'https://photos.app.goo.gl/7PmxoFpLc8VSZTLX7' },
  { name: 'CHLOE', image: 'images/Chloe_shoes.jpg', link: 'https://photos.app.goo.gl/A75qk8RrVLaJSeLY7' },
  { name: 'PRADA', image: 'images/prada_shoes.jpg', link: 'https://photos.app.goo.gl/kuhxCZQKNNMJ7Vrq6' },
  { name: 'LOEWE', image: 'images/Loewe_shoes.jpg', link: 'https://photos.app.goo.gl/yCTSqHjCohriy6Sd6' },
  { name: 'ANDREA WAZEN', image: 'images/andrea wazen_shoes.jpg', link: 'https://photos.app.goo.gl/MHLAd4jN5YCVWUr49' },
  { name: 'JIMMY CHOO', image: 'images/JIMMI CHOO_shoes.jpg', link: 'https://photos.app.goo.gl/dXq6h1ANAjf2xuZm7' },
  { name: 'RENE CAOVILLA', image: 'images/rene caovilla_shoes.jpg', link: 'https://photos.app.goo.gl/89aw1bgzfwcPD5eY9' },
  { name: 'ALAIA', image: 'images/alaia_shoes.jpg', link: 'https://photos.app.goo.gl/T7HAqkrydso84B3h9' },
  { name: 'TOM FORD', image: 'images/tom ford_shoes.jpg', link: 'https://photos.app.goo.gl/VAaEqKTNJHpWQxki8' },
  { name: 'DOLCE&GABBANA', image: 'images/dolce&gabbana_shoes.jpg', link: 'https://photos.app.goo.gl/SXFueYpZi4tKFHHf9' },
  { name: 'ALEVI MILANO', image: 'images/alevi milano_shoes.jpg', link: 'https://photos.app.goo.gl/W6UPpTfqzJWeqGi96' },
  { name: 'BRUNELLO CUCINELLI', image: 'images/Brunello Cucinelli_shoes.jpg', link: 'https://photos.app.goo.gl/3Gsd9svYBrnGgEHQ6' }
];

function ProductGallery({ onBack, title, items = galleryItems, columns = 2, onOpenShoes, onOpenBags, onOpenClothes, defaultImage = 'https://reem-store.com/images/tshirts.webp' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', action: onBack },
    { label: 'Bags', action: onOpenBags },
    { label: 'Shoes', action: onOpenShoes },
    { label: 'Clothes', action: onOpenClothes },
    { label: 'Returns' }
  ];

  return (
    <div className="min-h-screen bg-white">
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

      <main className="w-full px-2 sm:px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-light tracking-wider text-gray-900">
            {title || 'Gallery'}
          </h1>
          <button
            onClick={onBack}
            className="text-sm px-4 py-2 border border-gray-900 text-gray-900 rounded hover:bg-gray-900 hover:text-white"
          >
            Back
          </button>
        </div>
        <div className={`grid ${columns === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-[10px] sm:gap-3`}>
          {items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between border border-gray-300 bg-white text-center p-0 shadow-sm overflow-hidden w-full"
            >
              <div className="w-full flex items-center justify-center p-2">
                <img
                  src={defaultImage}
                  alt={item.name}
                  className="w-full h-auto max-h-[300px] max-w-full object-contain rounded-xl cursor-pointer shadow-md transition-transform duration-200 hover:scale-[1.03] border-b border-gray-200"
                  style={{ boxSizing: 'border-box' }}
                />
              </div>
              <div className="py-4 flex justify-center">
                {title === 'Shoes' && onOpenShoes ? (
                  <button
                    onClick={onOpenShoes}
                    className="inline-block w-full max-w-[200px] bg-black text-white text-center py-3 px-4 text-[14px] font-bold uppercase tracking-[0.06em] border-2 border-gray-400 rounded cursor-pointer hover:bg-gray-900 transition-colors"
                  >
                    {item.name}
                  </button>
                ) : title === 'Bags' && onOpenBags ? (
                  <button
                    onClick={onOpenBags}
                    className="inline-block w-full max-w-[200px] bg-black text-white text-center py-3 px-4 text-[14px] font-bold uppercase tracking-[0.06em] border-2 border-gray-400 rounded cursor-pointer hover:bg-gray-900 transition-colors"
                  >
                    {item.name}
                  </button>
                ) : columns === 2 && onOpenClothes ? (
                  <button
                    onClick={onOpenClothes}
                    className="inline-block w-full max-w-[200px] bg-black text-white text-center py-3 px-4 text-[14px] font-bold uppercase tracking-[0.06em] border-2 border-gray-400 rounded cursor-pointer hover:bg-gray-900 transition-colors"
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full max-w-[200px] bg-black text-white text-center py-3 px-4 text-[14px] font-bold uppercase tracking-[0.06em] border-2 border-gray-400 rounded cursor-pointer hover:bg-gray-900 transition-colors"
                    style={{ textDecoration: 'none' }}
                  >
                    {item.name}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductGallery;

