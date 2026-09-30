import { useState, useEffect } from 'react';
import { getSocialLinks } from '../api/categories';

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: null,
    instagram: null,
    twitter: null,
    snapchat: null,
    whatsapp: null,
    tiktok: null,
    youtube: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await getSocialLinks();
        if (response.data && response.data.success && response.data.data) {
          setSocialLinks(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load social links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  return { socialLinks, loading };
};
