import React from 'react';
import ProductGallery from './ProductGallery';

function ProductShoes({ onBack, onOpenShoes, onOpenBags, onOpenClothes }) {
  return (
    <ProductGallery
      title="Shoes"
      columns={3}
      onBack={onBack}
      onOpenShoes={onOpenShoes}
      onOpenBags={onOpenBags}
      onOpenClothes={onOpenClothes}
      defaultImage="https://reem-store.com/images/all_shoes.jpg"
    />
  );
}

export default ProductShoes;

