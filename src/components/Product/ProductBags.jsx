import React from 'react';
import ProductGallery from './ProductGallery';
import { useParams } from 'react-router-dom';

function ProductBags({ onBack, onOpenShoes, onOpenBags, onOpenClothes }) {
  const { id } = useParams();
  
  return (
    <ProductGallery
      title="Bags"
      productId={id}
      columns={3}
      onBack={onBack}
      onOpenShoes={onOpenShoes}
      onOpenBags={onOpenBags}
      onOpenClothes={onOpenClothes}
      defaultImage="https://reem-store.com/images/hermes_bag.webp"
    />
  );
}

export default ProductBags;

