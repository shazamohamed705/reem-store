import React from 'react';
import CategorySection from './CategorySection';

function MenCategories({ onOpenItem }) {
  return (
    <CategorySection 
      categoryName="men" 
      displayName="Men" 
      onOpenItem={onOpenItem}
      limit={9}
    />
  );
}

export default MenCategories;

