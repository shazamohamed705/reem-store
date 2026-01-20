import React, { useEffect, useMemo, useState } from 'react';
import { collectionData } from './collectionData';

const baseSlides = [
  collectionData.default,
  {
    image: '/header2.webp',
    title: 'Quality Fashion',
    description: 'Premium quality clothing for every occasion',
    buttonText: 'Explore'
  }
];

function Banner({ activeCollection, onOpenItem }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeSlide = collectionData[activeCollection] || collectionData.default;
  
  // If collection page is selected (women, men, kids), show only that image (no slides)
  const isCollectionPage = ['women', 'men', 'kids'].includes(activeCollection);
  
  const slides = useMemo(() => {
    if (isCollectionPage) {
      return [activeSlide];
    }
    const merged = [activeSlide, ...baseSlides];
    const seen = new Set();
    return merged.filter((slide) => {
      const key = slide.image;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [activeSlide, isCollectionPage]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isCollectionPage) return; // No auto-play for collection pages
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length, isCollectionPage]);

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          onClick={() => onOpenItem?.({ name: slide.title, image: slide.image })}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide 
              ? 'opacity-100' 
              : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="h-full flex items-center justify-center bg-black/30">
            <div className="text-center text-white px-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 uppercase">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl mb-8 font-light">
                {slide.description}
              </p>
              <button className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm font-light">
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hide for collection pages */}
      {!isCollectionPage && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/100 transition-all backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator - Hide for collection pages */}
      {!isCollectionPage && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Banner;

