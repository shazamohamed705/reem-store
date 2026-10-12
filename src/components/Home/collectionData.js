// الصور ثابتة، النصوص تيجي من ملفات الترجمة
export const collectionImages = {
  default:     '/header.webp',
  women:       'https://www.reem-store.com/images/clothes.webp',
  men:         'https://www.reem-store.com/images/men-clothes.webp',
  kids:        'https://www.reem-store.com/images/kids.webp',
  collections: '/header2.webp',
};

// دالة تبني collectionData من ملف الترجمة
export const buildCollectionData = (t) => ({
  default: {
    image:      collectionImages.default,
    title:      t.banner.default.title,
    description: t.banner.default.subtitle,
    buttonText: t.banner.default.cta,
    sectionId:  null,
  },
  women: {
    image:      collectionImages.women,
    title:      t.banner.women.title,
    description: t.banner.women.subtitle,
    buttonText: t.banner.women.cta,
    sectionId:  'women',
  },
  men: {
    image:      collectionImages.men,
    title:      t.banner.men.title,
    description: t.banner.men.subtitle,
    buttonText: t.banner.men.cta,
    sectionId:  'men',
  },
  kids: {
    image:      collectionImages.kids,
    title:      t.banner.kids.title,
    description: t.banner.kids.subtitle,
    buttonText: t.banner.kids.cta,
    sectionId:  'kids',
  },
  collections: {
    image:      collectionImages.collections,
    title:      t.banner.collections.title,
    description: t.banner.collections.subtitle,
    buttonText: t.banner.collections.cta,
    sectionId:  null,
  },
});

// للتوافق مع أي كود قديم لا يزال يستخدم collectionData مباشرة
export const collectionData = {
  default: {
    image:       '/header.webp',
    title:       'New Collection',
    description: 'Discover our latest fashion trends and styles',
    buttonText:  'Shop Now',
    sectionId:   null,
  },
  women: {
    image:       'https://www.reem-store.com/images/clothes.webp',
    title:       'Women Collection',
    description: 'Women styles picked for you – clothes, shoes, and more',
    buttonText:  'Shop Women',
    sectionId:   'women',
  },
  men: {
    image:       'https://www.reem-store.com/images/men-clothes.webp',
    title:       'Men Collection',
    description: 'Fresh men outfits, bags, shoes, and accessories',
    buttonText:  'Shop Men',
    sectionId:   'men',
  },
  kids: {
    image:       'https://www.reem-store.com/images/kids.webp',
    title:       'Kids Collection',
    description: 'Comfortable, fun picks for the little ones',
    buttonText:  'Shop Kids',
    sectionId:   'kids',
  },
  collections: {
    image:       '/header2.webp',
    title:       'All Collections',
    description: 'Browse the full MEZNA STORE collections in one place',
    buttonText:  'Explore',
    sectionId:   null,
  },
};
