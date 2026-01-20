import React from 'react';
import { collectionData } from './collectionData';

function FeaturedCollection({ collectionKey }) {
  const selected = collectionData[collectionKey];

  if (!selected || collectionKey === 'default') return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 max-w-screen-2xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            alt={selected.title}
            src={selected.image}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Featured
          </p>
          <h3 className="text-3xl sm:text-4xl font-light tracking-wider text-gray-900">
            {selected.title}
          </h3>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {selected.description}
          </p>
          <div>
            <a
              href={selected.sectionId ? `#${selected.sectionId}` : '#'}
              className="inline-block px-6 py-3 border border-gray-900 text-gray-900 tracking-widest uppercase text-sm hover:bg-gray-900 hover:text-white transition-colors"
            >
              {selected.buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;

