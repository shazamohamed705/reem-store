import React from 'react';
import CategorySection from './CategorySection';

function WomenCollectionSection({ onOpenItem }) {
  return (
    <CategorySection 
      categoryName="women" 
      displayName="Women" 
      onOpenItem={onOpenItem}
      limit={9}
    />
  );
}

export default WomenCollectionSection;

