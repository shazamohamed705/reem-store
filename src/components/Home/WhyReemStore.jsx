import React from 'react';

function WhyReemStore() {
  const features = [
    {
      title: 'Premium Quality',
      description: 'Authentic, top-tier products, identical to originals'
    },
    {
      title: 'Cash on Delivery',
      description: 'Pay only upon receiving your order'
    },
    {
      title: 'Easy Returns',
      description: 'Hassle-free exchange in 3 days or refund in 1 day'
    }
  ];

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 lg:px-8 text-center max-w-4xl mx-auto">
      {/* Payment Gateway Logos */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
        <img 
          src="/b76ba7212e0ac8087f112b48c9b5ab0dc3231828.png" 
          alt="Tabby" 
          className="h-8 sm:h-10 object-contain"
        />
        <img 
          src="/3b87a60a8e30f980b67d1f4c8d87fb19e275cb93.png" 
          alt="Tamara" 
          className="h-10 sm:h-12 object-contain"
        />
      </div>

      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider mb-6 text-gray-900">
        Why Reem Store?
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
        {features.map((feature, index) => (
          <div key={index}>
            <h3 className="text-base sm:text-lg font-light tracking-wider mb-3 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-sm font-light text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyReemStore;

