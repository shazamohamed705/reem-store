import { useEffect } from 'react';
import { getPageContent } from '../api/categories';

function MetaPixel() {
  useEffect(() => {
    // جلب Meta Pixel ID من الـ API
    const loadMetaPixel = async () => {
      try {
        const response = await getPageContent('meta_pixel_id');
        console.log('Meta Pixel API Response:', response.data);
        
        if (response.data && response.data.success && response.data.data) {
          const pixelId = response.data.data.content;
          
          if (!pixelId) {
            console.log('Meta Pixel ID is not set in the backend yet');
            return;
          }
          
          // إضافة Meta Pixel Script
          if (pixelId && !window.fbq) {
            console.log('Loading Meta Pixel with ID:', pixelId);
            
            // Facebook Pixel Code
            // eslint-disable-next-line no-unused-expressions
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            window.fbq('init', pixelId);
            window.fbq('track', 'PageView');
            
            // إضافة noscript image
            const noscript = document.createElement('noscript');
            const img = document.createElement('img');
            img.height = 1;
            img.width = 1;
            img.style.display = 'none';
            img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
            noscript.appendChild(img);
            document.body.insertBefore(noscript, document.body.firstChild);
            
            console.log('Meta Pixel loaded successfully with ID:', pixelId);
          } else if (window.fbq) {
            console.log('Meta Pixel already loaded');
          }
        }
      } catch (error) {
        console.error('Failed to load Meta Pixel:', error);
      }
    };
    
    loadMetaPixel();
  }, []);

  return null;
}

export default MetaPixel;
