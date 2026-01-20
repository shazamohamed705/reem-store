import React from 'react';
import ProductGallery from './ProductGallery';

function ProductClothes({ onBack, onOpenShoes, onOpenBags, onOpenClothes }) {
  return (
    <ProductGallery
      title="Clothes"
      columns={2}
      onBack={onBack}
      onOpenShoes={onOpenShoes}
      onOpenBags={onOpenBags}
      onOpenClothes={onOpenClothes}
      defaultImage="https://reem-store.com/images/tshirts.webp"
    />
  );
}

export default ProductClothes;

