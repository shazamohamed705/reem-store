import React from 'react';
import ProductGallery from './ProductGallery';

function ProductBags({ onBack, onOpenShoes, onOpenBags, onOpenClothes }) {
  return (
    <ProductGallery
      title="Bags"
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

