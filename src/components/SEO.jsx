import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPageContent } from '../api/categories';

function SEO({ pageKey = 'home' }) {
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const response = await getPageContent(pageKey);
        if (response.data && response.data.success && response.data.data && response.data.data.seo) {
          setSeoData(response.data.data.seo);
        }
      } catch (error) {
        console.error('Failed to load SEO data:', error);
      }
    };

    fetchSEO();
  }, [pageKey]);

  if (!seoData) return null;

  return (
    <Helmet>
      {seoData.title && <title>{seoData.title}</title>}
      {seoData.meta_description && (
        <meta name="description" content={seoData.meta_description} />
      )}
      {seoData.meta_keywords && (
        <meta name="keywords" content={seoData.meta_keywords} />
      )}
      
      {/* Open Graph Tags */}
      {seoData.og_title && (
        <meta property="og:title" content={seoData.og_title} />
      )}
      {seoData.og_description && (
        <meta property="og:description" content={seoData.og_description} />
      )}
      {seoData.og_image && (
        <meta property="og:image" content={seoData.og_image} />
      )}
      <meta property="og:type" content="website" />
      
      {/* Twitter Card Tags */}
      {seoData.og_title && (
        <meta name="twitter:title" content={seoData.og_title} />
      )}
      {seoData.og_description && (
        <meta name="twitter:description" content={seoData.og_description} />
      )}
      {seoData.og_image && (
        <meta name="twitter:image" content={seoData.og_image} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

export default SEO;
