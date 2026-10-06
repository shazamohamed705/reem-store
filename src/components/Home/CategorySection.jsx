import React, { useState, useEffect, useMemo } from 'react';
import { getCategoryById } from '../../api/categories';
import { useCategories } from '../../hooks/useCategories';

function CategorySection({ categoryName, displayName, onOpenItem, limit = 9 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { categories, loading: categoriesLoading } = useCategories();

  // استخدام useMemo لتجنب إعادة البحث في كل render
  const category = useMemo(() => {
    if (categoriesLoading || !categories.length) return null;
    return categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
  }, [categories, categoriesLoading, categoryName]);

  useEffect(() => {
    // تجنب الاستدعاء إذا لم تتغير البيانات المهمة
    if (categoriesLoading) {
      setLoading(true);
      return;
    }

    if (!category) {
      setLoading(false);
      setError(`Category ${categoryName} not found`);
      setProducts([]);
      return;
    }

    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getCategoryById(category.id);
        
        if (response.data && response.data.success && response.data.data) {
          // أخذ عدد محدود من المنتجات
          const limitedProducts = response.data.data.products?.slice(0, limit) || [];
          setProducts(limitedProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error(`Error fetching ${categoryName} products:`, err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category, category?.id, categoryName, limit, categoriesLoading]);

  if (loading) {
    return (
      <section id={categoryName.toLowerCase()} className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 max-w-screen-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider text-center mb-8 sm:mb-12 text-gray-900">
          {displayName || categoryName}
        </h2>
        <div className="text-center py-12">
          <div className="text-gray-500">Loading products...</div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <section id={categoryName.toLowerCase()} className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 max-w-screen-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider text-center mb-8 sm:mb-12 text-gray-900">
          {displayName || categoryName}
        </h2>
        <div className="text-center py-12">
          <div className="text-gray-500">No products available</div>
        </div>
      </section>
    );
  }

  return (
    <section id={categoryName.toLowerCase()} className="py-20 px-3 sm:px-4 lg:px-8 max-w-screen-2xl mx-auto bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide mb-4 text-gray-900">
          {displayName || categoryName}
        </h2>
        <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onOpenItem?.({ 
              id: product.id,
              name: product.name, 
              image: product.image, 
              price: product.price,
              description: product.description 
            })}
            className="group relative overflow-hidden cursor-pointer"
          >
            {/* Card Container */}
            <div className="relative aspect-[3/4] bg-white overflow-hidden border border-gray-300 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-500 group-hover:-translate-y-2">
              {/* Image */}
              <img
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                src={product.image}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                }}
              />
              
              {/* Gradient Overlay - appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Product Info - slides up on hover */}
              <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-light tracking-wider text-white mb-2 uppercase">
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-lg font-light text-white/90">
                      ${product.price}
                    </p>
                  )}
                  
                  {/* View Details Button */}
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <span className="text-sm tracking-widest uppercase text-white flex items-center">
                      View Details
                      <svg 
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Corner Accent - appears on hover */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-r-[60px] border-t-white/20 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Product Name Below Card - visible by default */}
            <div className="mt-4 text-center">
              <h3 className="text-base md:text-lg font-medium tracking-wide text-black">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;