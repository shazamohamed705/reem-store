import api from "./auth";

// جلب جميع الفئات
export const getCategories = () => api.get("/categories");

// جلب فئة محددة بالـ ID
export const getCategoryById = (id) => api.get(`/categories/${id}`);

// جلب منتجات فئة محددة مع limit
export const getCategoryProducts = (categoryId, limit = 9) => 
  api.get(`/categories/${categoryId}?limit=${limit}`);

// جلب تفاصيل منتج محدد بالـ ID
export const getProductById = (id) => api.get(`/products/${id}`);

// البحث في المنتجات والـ variants
export const searchProducts = (query) => api.get(`/products/search?q=${query}`);

// جلب محتوى الصفحات (shipping, returns, faq)
export const getPageContent = (pageKey) => api.get(`/page-contents/${pageKey}`);

// تسجيل زيارة
export const recordVisit = (data) => api.post('/visits', data);

// جلب روابط التواصل الاجتماعي
export const getSocialLinks = () => api.get('/social-links');