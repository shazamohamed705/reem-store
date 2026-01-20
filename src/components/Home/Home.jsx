import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import WhyReemStore from './WhyReemStore';
import WomenCategories from './WomenCategories';
import MenCategories from './MenCategories';
import KidsCategories from './KidsCategories';
import WomenCollectionSection from './WomenCollectionSection';
import MenCollectionSection from './MenCollectionSection';
import KidsCollectionSection from './KidsCollectionSection';

function Home({ activeCollection, onOpenItem }) {
  // If women collection is selected, show only Banner + WomenCollectionSection
  if (activeCollection === 'women') {
    return (
      <main>
        <Banner activeCollection={activeCollection} onOpenItem={onOpenItem} />
        <WomenCollectionSection onOpenItem={onOpenItem} />
      </main>
    );
  }

  // If men collection is selected, show only Banner + MenCollectionSection
  if (activeCollection === 'men') {
    return (
      <main>
        <Banner activeCollection={activeCollection} onOpenItem={onOpenItem} />
        <MenCollectionSection onOpenItem={onOpenItem} />
      </main>
    );
  }

  // If kids collection is selected, show only Banner + KidsCollectionSection
  if (activeCollection === 'kids') {
    return (
      <main>
        <Banner activeCollection={activeCollection} onOpenItem={onOpenItem} />
        <KidsCollectionSection onOpenItem={onOpenItem} />
      </main>
    );
  }

  // Default view with all sections
  return (
    <main>
      <Banner activeCollection={activeCollection} onOpenItem={onOpenItem} />
      <Categories />
      <WhyReemStore />
      <WomenCategories onOpenItem={onOpenItem} />
      <MenCategories onOpenItem={onOpenItem} />
      <KidsCategories onOpenItem={onOpenItem} />
    </main>
  );
}

export default Home;

