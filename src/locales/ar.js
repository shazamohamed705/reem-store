const ar = {
  // ─── Navbar ───────────────────────────────────────────────
  navbar: {
    storeName: 'متجر مزنة',
    searchPlaceholder: 'ابحث عن ماركة...',
    search: 'بحث',
    guest: 'زائر',
    logout: 'تسجيل الخروج',
    loading: 'جاري التحميل...',
    noResults: 'لا توجد نتائج لـ',
    // أسماء الكاتيجوري من السيرفر
    categoryNames: {
      women: 'نساء',
      men: 'رجال',
      kids: 'أطفال',
      collections: 'الكولكشنات',
      bags: 'شنط',
      shoes: 'أحذية',
      clothes: 'ملابس',
      accessories: 'إكسسوارات',
    },
  },

  // ─── Banner / Slides ──────────────────────────────────────
  banner: {
    default: {
      title: 'كولكشن جديد',
      subtitle: 'اكتشف أحدث صيحات الموضة والأزياء',
      cta: 'تسوق الآن',
    },
    women: {
      title: 'كولكشن النساء',
      subtitle: 'أزياء نسائية مختارة لك – ملابس وأحذية والمزيد',
      cta: 'تسوق النساء',
    },
    men: {
      title: 'كولكشن الرجال',
      subtitle: 'ملابس وشنط وأحذية وإكسسوارات رجالية عصرية',
      cta: 'تسوق الرجال',
    },
    kids: {
      title: 'كولكشن الأطفال',
      subtitle: 'اختيارات مريحة وممتعة للصغار',
      cta: 'تسوق الأطفال',
    },
    collections: {
      title: 'كل الكولكشنات',
      subtitle: 'تصفح كل كولكشنات متجر مزنة في مكان واحد',
      cta: 'استكشف',
    },
    slide2: {
      title: 'موضة راقية',
      subtitle: 'ملابس بجودة عالية لكل مناسبة',
      cta: 'استكشف',
    },
  },

  // ─── Why Choose Us ────────────────────────────────────────
  whyUs: {
    heading: 'لماذا تختارنا؟',
    items: [
      {
        number: '01',
        title: 'جودة عالية',
        desc: 'منتجات أصلية ومطابقة تماماً للأصل',
      },
      {
        number: '02',
        title: 'الدفع عند الاستلام',
        desc: 'ادفع فقط عند استلام طلبك',
      },
      {
        number: '03',
        title: 'إرجاع سهل',
        desc: 'استبدال خلال 3 أيام أو استرداد خلال يوم واحد',
      },
    ],
  },

  // ─── Category Section ─────────────────────────────────────
  category: {
    loading: 'جاري تحميل المنتجات...',
    noProducts: 'لا توجد منتجات متاحة',
    viewDetails: 'عرض التفاصيل',
  },

  // ─── Footer ───────────────────────────────────────────────
  footer: {
    shopByCategory: 'تسوق حسب الفئة',
    categories: {
      women: 'نساء',
      womenSub: 'أنيقة وعصرية',
      men: 'رجال',
      menSub: 'كلاسيكي وحديث',
      kids: 'أطفال',
      kidsSub: 'مرح ومريح',
      all: 'الكل',
      allSub: 'تصفح كل شيء',
    },
    about: {
      heading: 'عن متجر مزنة',
      desc: 'منتجات أصلية وعالية الجودة مطابقة للأصل. استمتع بتجربة الفخامة مع كولكشناتنا المختارة.',
    },
    customerService: {
      heading: 'خدمة العملاء',
      contact: 'تواصل معنا',
      shipping: 'الشحن',
      returns: 'الإرجاع',
      faq: 'الأسئلة الشائعة',
    },
    shop: {
      heading: 'تسوق',
      women: 'نساء',
      men: 'رجال',
      kids: 'أطفال',
      collections: 'الكولكشنات',
    },
    badges: {
      cod: 'الدفع عند الاستلام متاح',
      returns: 'إرجاع سهل خلال 3 أيام تطبق الشروط',
      weAccept: 'نقبل',
    },
    copyright: '© 2025 متجر مزنة. جميع الحقوق محفوظة.',
  },

  // ─── Auth – Login ─────────────────────────────────────────
  login: {
    heading: 'مرحباً بعودتك',
    subheading: 'سجل دخولك للوصول إلى حسابك',
    emailPlaceholder: 'بريدك@الإلكتروني.com',
    passwordPlaceholder: 'أدخل كلمة المرور',
    submit: 'تسجيل الدخول',
    submitting: 'جاري الدخول...',
    noAccount: 'ليس لديك حساب؟',
    signUp: 'إنشاء حساب',
  },

  // ─── Auth – Signup ────────────────────────────────────────
  signup: {
    heading: 'إنشاء حساب',
    subheading: 'انضم لمتجر مزنة للوصول الحصري',
    namePlaceholder: 'اسمك الكامل',
    emailPlaceholder: 'بريدك@الإلكتروني.com',
    passwordPlaceholder: 'أنشئ كلمة مرور',
    nameLabel: 'الاسم الكامل',
    emailLabel: 'البريد الإلكتروني',
    passwordLabel: 'كلمة المرور',
    confirmLabel: 'تأكيد كلمة المرور',
    submit: 'إنشاء الحساب',
    submitting: 'جاري الإنشاء...',
    hasAccount: 'لديك حساب بالفعل؟',
    signIn: 'تسجيل الدخول',
  },

  // ─── Contact Page ─────────────────────────────────────────
  contact: {
    backHome: '→ العودة للرئيسية',
    heading: 'تواصل معنا',
    subheading: 'نحن هنا لمساعدتك',
    desc: 'نحن هنا للإجابة على أي سؤال لديك. نتطلع إلى سماعك.',
    whatsapp: 'واتساب',
    whatsappSub: 'تحدث معنا فوراً',
    instagram: 'انستغرام',
    instagramSub: 'تابعنا',
    quickLinks: 'روابط سريعة',
    shipping: 'معلومات الشحن',
    shippingSub: 'تعرف على خيارات التوصيل',
    returns: 'الإرجاع والاستبدال',
    returnsSub: 'اطلع على سياسة الإرجاع',
    faq: 'الأسئلة الشائعة',
    faqSub: 'اعثر على إجابات للأسئلة الشائعة',
    hours: 'ساعات العمل',
    satThurs: 'السبت - الخميس',
    satThursHours: '9:00 ص - 10:00 م',
    friday: 'الجمعة',
    fridayHours: '2:00 م - 10:00 م',
    responseTime: 'وقت الاستجابة: نرد عادةً خلال 1-2 ساعة في ساعات العمل',
  },

  // ─── Product Gallery ──────────────────────────────────────
  product: {
    storeName: 'متجر مزنة',
    searchDesktop: 'ابحث عن ماركة (مثال: Gucci، Chanel، Louis Vuitton)',
    searchMobile: 'ابحث عن ماركة...',
    search: 'بحث',
    loading: 'جاري التحميل...',
    noVariants: 'لا توجد متغيرات لهذا المنتج',
    noResults: 'لا توجد نتائج لـ',
    clearSearch: 'مسح البحث',
    backHome: 'العودة للرئيسية',
    viewCollection: 'عرض الكولكشن',
    notFound: 'المنتج غير موجود',
    home: 'الرئيسية',
    returns: 'الإرجاع',
  },
};

export default ar;
