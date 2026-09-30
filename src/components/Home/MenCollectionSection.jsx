import React from 'react';
import CategorySection from './CategorySection';

function MenCollectionSection({ onOpenItem }) {
  return (
    <CategorySection 
      categoryName="men" 
      displayName="Men" 
      onOpenItem={onOpenItem}
      limit={9}
    />
  );
}

export default MenCollectionSection;

