import React, { useEffect, useMemo, useState } from 'react';
import { collectionData } from './collectionData';
import { useCategories } from '../../hooks/useCategories';
import { getCategoryById } from '../../api/categories';

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
  const [categoryImages, setCategoryImages] = useState({});
  const [loading, setLoading] = useState(false);

  const { categories, loading: categoriesLoading } = useCategories();

  const activeSlide = collectionData[activeCollection] || collectionData.default;
  
  // جلب صور الفئات من الـ API
  useEffect(() => {
    const fetchCategoryImages = async () => {
      if (categoriesLoading || !categories.length) return;
      
      setLoading(true);
      const imagesData = {};
      
      try {
        // جلب صورة كل فئة
        for (const category of categories) {
          try {
            const response = await getCategoryById(category.id);
            if (response.data && response.data.success && response.data.data) {
              const categoryData = response.data.data;
              // استخدم صورة الـ category نفسها
              if (categoryData.image) {
                imagesData[category.name.toLowerCase()] = {
                  image: categoryData.image,
                  name: categoryData.name
                };
              }
            }
          } catch (err) {
            console.error(`Error fetching image for ${category.name}:`, err);
          }
        }
        
        setCategoryImages(imagesData);
      } catch (err) {
        console.error('Error fetching category images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryImages();
  }, [categories, categoriesLoading]);
  
  // If collection page is selected (women, men, kids), show only that image (no slides)
  const isCollectionPage = ['women', 'men', 'kids'].includes(activeCollection);
  
  const slides = useMemo(() => {
    if (isCollectionPage) {
      // إذا كان collection page، استخدم صورة الـ category من الـ API
      const categoryImage = categoryImages[activeCollection];
      if (categoryImage) {
        return [{
          image: categoryImage.image,
          title: activeSlide.title,
          description: activeSlide.description,
          buttonText: activeSlide.buttonText || 'Explore'
        }];
      }
      return [activeSlide];
    }
    
    // للصفحة الرئيسية، اجمع صور كل الـ categories
    const allCategorySlides = [];
    Object.entries(categoryImages).forEach(([key, data]) => {
      allCategorySlides.push({
        image: data.image,
        title: collectionData[key]?.title || 'Discover Fashion',
        description: collectionData[key]?.description || 'Explore our latest collection',
        buttonText: 'Shop Now'
      });
    });
    
    const merged = [activeSlide, ...allCategorySlides, ...baseSlides];
    const seen = new Set();
    return merged.filter((slide) => {
      const key = slide.image;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [activeSlide, isCollectionPage, categoryImages, activeCollection]);

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
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [slides.length, isCollectionPage]);

  return (
    <section className="relative h-screen overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={index}
          onClick={() => onOpenItem?.({ name: slide.title, image: slide.image })}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="h-full flex items-center justify-start bg-gradient-to-r from-black/60 via-black/30 to-transparent">
              <div className="text-left text-white px-8 md:px-16 lg:px-24 max-w-3xl">
                <div className="overflow-hidden">
                  <h2 className={`text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6 uppercase transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                    {slide.title}
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <p className={`text-xl md:text-2xl mb-10 font-light leading-relaxed transition-all duration-700 delay-150 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                    {slide.description}
                  </p>
                </div>
                <div className="overflow-hidden">
                  <button className={`group relative px-10 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-widest text-sm font-medium overflow-hidden ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  } transition-all duration-700 delay-300`}>
                    <span className="relative z-10">{slide.buttonText}</span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hide for collection pages */}
      {!isCollectionPage && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-14 h-14 border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all backdrop-blur-sm group"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-14 h-14 border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all backdrop-blur-sm group"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator - Hide for collection pages */}
      {!isCollectionPage && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-12 h-1 bg-white' 
                  : 'w-8 h-1 bg-white/40 hover:bg-white/60'
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

