import React from 'react';
import ProductGallery from './ProductGallery';
import { useParams } from 'react-router-dom';

function ProductShoes({ onBack, onOpenShoes, onOpenBags, onOpenClothes }) {
  const { id } = useParams();
  
  return (
    <ProductGallery
      title="Shoes"
      productId={id}
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

