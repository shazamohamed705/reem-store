import React from 'react';
import CategorySection from './CategorySection';

function WomenCategories({ onOpenItem }) {
  return (
    <CategorySection 
      categoryName="women" 
      displayName="Women" 
      onOpenItem={onOpenItem}
      limit={9}
    />
  );
}

export default WomenCategories;

