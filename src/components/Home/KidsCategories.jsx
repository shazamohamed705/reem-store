import React from 'react';
import CategorySection from './CategorySection';

function KidsCategories({ onOpenItem }) {
  return (
    <CategorySection 
      categoryName="kids" 
      displayName="Kids" 
      onOpenItem={onOpenItem}
      limit={9}
    />
  );
}

export default KidsCategories;

