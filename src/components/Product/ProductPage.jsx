import React from 'react';
import ProductGallery from './ProductGallery';
import { useParams, useNavigate } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/');
  };

  return (
    <ProductGallery
      productId={id}
      columns={3}
      onBack={handleBack}
      defaultImage="https://reem-store.com/images/all_shoes.jpg"
    />
  );
}

export default ProductPage;
