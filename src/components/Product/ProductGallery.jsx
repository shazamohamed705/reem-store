import React, { useState, useEffect } from 'react';
import { getProductById, getCategoryById, recordVisit } from '../../api/categories';
import { useNavigate, useLocation } from 'react-router-dom';

function ProductGallery({ onBack, productId, columns = 2, onOpenShoes, onOpenBags, onOpenClothes, defaultImage = 'https://reem-store.com/images/tshirts.webp' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(productId);
        
        if (response.data && response.data.success && response.data.data) {
          const productData = response.data.data;
          setProduct(productData);
          setVariants(productData.variants || []);
          
          // جلب منتجات الـ category
          if (productData.category_id) {
            const categoryResponse = await getCategoryById(productData.category_id);
            if (categoryResponse.data && categoryResponse.data.success && categoryResponse.data.data) {
              // أخذ أول 3 منتجات فقط
              const products = categoryResponse.data.data.products?.slice(0, 3) || [];
              setCategoryProducts(products);
            }
          }
          
          // تسجيل زيارة المنتج
          try {
            const visitResponse = await recordVisit({
              type: 'product',
              id: productData.id
            });
            console.log('Visit recorded successfully:', visitResponse.data);
          } catch (visitError) {
            // تجاهل أخطاء تسجيل الزيارات - لا تؤثر على عمل الموقع
            console.error('Failed to record visit:', visitError.response?.data || visitError.message);
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Check for search query in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    
    if (searchParam && variants.length > 0) {
      setSearchQuery(searchParam);
      // Trigger search automatically after variants are loaded
      const foundVariant = variants.find(variant =>
        variant.name.toLowerCase().includes(searchParam.toLowerCase())
      );
      
      if (foundVariant && foundVariant.google_photo_link) {
        window.open(foundVariant.google_photo_link, '_blank');
        setSearchQuery('');
        // Remove search param from URL
        navigate(location.pathname, { replace: true });
      }
    }
  }, [variants, location.search, location.pathname, navigate]);

  useEffect(() => {
    // Filter variants based on search query
    if (searchQuery.trim() === '') {
      setFilteredVariants(variants);
    } else {
      const filtered = variants.filter(variant =>
        variant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVariants(filtered);
    }
  }, [searchQuery, variants]);

  const handleSearch = (query) => {
    // Search for variant and open google link directly
    const searchTerm = typeof query === 'string' ? query : (searchQuery || '');
    if (!searchTerm || searchTerm.trim() === '') return;
    
    const foundVariant = variants.find(variant =>
      variant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (foundVariant && foundVariant.google_photo_link) {
      window.open(foundVariant.google_photo_link, '_blank');
      setSearchQuery(''); // Clear search after opening
      // Remove search param from URL
      navigate(location.pathname, { replace: true });
    } else {
      // If no variant found or no google link, show filtered results
      const filtered = variants.filter(variant =>
        variant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVariants(filtered);
    }
  };

  const menuItems = [
    { label: 'Home', action: onBack },
    ...categoryProducts.map(prod => ({
      label: prod.name,
      action: () => navigate(`/product/${prod.id}`)
    })),
    { label: 'Returns', action: onBack }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={onBack}
              className="text-xl sm:text-2xl font-light tracking-widest text-black hover:text-gray-600 transition-colors"
            >
              MEZNA STORE
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-sm font-medium tracking-wide text-gray-800 hover:text-black transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-gray-800 hover:text-black"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden sm:flex items-center gap-3 pb-4">
            <input
              type="text"
              placeholder="Search brands (e.g., Gucci, Chanel, Louis Vuitton)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <button 
              onClick={handleSearch}
              className="px-6 py-2 bg-black text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action?.();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 rounded transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Search Bar - Mobile */}
        <div className="sm:hidden px-4 pb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button 
              onClick={handleSearch}
              className="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800"
            >
              Search
            </button>
          </div>
        </div>
      </nav>

      <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <div className="text-gray-600">Loading...</div>
          </div>
        ) : error || !product ? (
          <div className="text-center py-20">
            <div className="text-red-500 text-lg mb-6">{error || 'Product not found'}</div>
            <button
              onClick={onBack}
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            {/* Product Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide text-black mb-4">
                {product.name}
              </h1>
              <div className="w-24 h-1 bg-black mx-auto"></div>
            </div>
            
            {variants.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-600 text-lg">No variants available for this product</div>
              </div>
            ) : filteredVariants.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-600 text-lg">No results found for "{searchQuery}"</div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilteredVariants(variants);
                  }}
                  className="mt-6 px-6 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredVariants.map((variant) => (
                  <div
                    key={variant.id}
                    className="group relative"
                  >
                    {/* Card Container */}
                    <div className="relative aspect-[3/4] bg-white overflow-hidden border border-gray-300 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2">
                      {/* Skeleton Loader - يظهر لحد ما الصورة تتحمل */}
                      {!loadedImages[variant.id] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                          <div className="text-gray-400">Loading...</div>
                        </div>
                      )}
                      
                      {/* Image */}
                      <a
                        href={variant.google_photo_link || '#'}
                        target={variant.google_photo_link ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                        onClick={(e) => {
                          if (!variant.google_photo_link) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <img
                          src={variant.image || product.image || defaultImage}
                          alt={variant.name}
                          className={`w-full h-full transition-all duration-700 group-hover:scale-110 ${!loadedImages[variant.id] ? 'opacity-0' : 'opacity-100'}`}
                          style={{ objectFit: 'contain' }}
                          onLoad={(e) => {
                            const img = e.target;
                            const container = img.parentElement;
                            const containerWidth = container.offsetWidth;
                            const containerHeight = container.offsetHeight;
                            
                            // احسب نسبة حجم الصورة للـ container
                            const widthRatio = img.naturalWidth / containerWidth;
                            const heightRatio = img.naturalHeight / containerHeight;
                            
                            // إذا كانت الصورة صغيرة أو قريبة من حجم الـ container، استخدم cover
                            if (widthRatio <= 1.2 && heightRatio <= 1.2) {
                              img.style.objectFit = 'cover';
                            } else {
                              // الصور الكبيرة تبقى contain
                              img.style.objectFit = 'contain';
                            }
                            
                            // علم الصورة كمحملة
                            setLoadedImages(prev => ({ ...prev, [variant.id]: true }));
                          }}
                          onError={(e) => {
                            e.target.src = defaultImage;
                            setLoadedImages(prev => ({ ...prev, [variant.id]: true }));
                          }}
                        />
                      </a>
                      
                      {/* Gradient Overlay - appears on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Brand Name - slides up on hover */}
                      <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <div className="relative z-10">
                          <h3 className="text-xl md:text-2xl font-light tracking-wider text-white uppercase">
                            {variant.name}
                          </h3>
                          
                          {/* View Button */}
                          {variant.google_photo_link && (
                            <div className="mt-4 pt-4 border-t border-white/30">
                              <span className="text-sm tracking-widest uppercase text-white flex items-center">
                                View Collection
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
                          )}
                        </div>
                      </div>
                      
                      {/* Corner Accent - appears on hover */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-r-[60px] border-t-white/20 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Brand Name Below Card - visible by default */}
                    <div className="mt-4 text-center">
                      <h3 className="text-base md:text-lg font-medium tracking-wide text-black">
                        {variant.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default ProductGallery;

