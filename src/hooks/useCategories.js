import { useState, useEffect, useCallback } from 'react';
import { getCategories } from '../api/categories';

// Cache للفئات لتجنب استدعاء الـ API مرات متعددة
let categoriesCache = null;
let cachePromise = null;

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // إذا كانت البيانات موجودة في الـ cache، استخدمها
        if (categoriesCache) {
          setCategories(categoriesCache);
          setLoading(false);
          return;
        }

        // إذا كان هناك طلب جاري، انتظره
        if (cachePromise) {
          const result = await cachePromise;
          setCategories(result);
          setLoading(false);
          return;
        }

        // إنشاء طلب جديد
        cachePromise = getCategories().then(response => {
          if (response.data && response.data.success && response.data.data) {
            categoriesCache = response.data.data;
            return response.data.data;
          }
          throw new Error('Invalid response format');
        });

        const result = await cachePromise;
        setCategories(result);
        cachePromise = null;
        
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
        cachePromise = null;
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // دالة للحصول على فئة بالاسم - استخدام useCallback لتجنب إعادة الإنشاء
  const getCategoryByName = useCallback((name) => {
    return categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
  }, [categories]);

  return { categories, loading, error, getCategoryByName };
};