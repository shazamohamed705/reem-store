import React from 'react';

function WhyReemStore() {
  const features = [
    {
      title: 'Premium Quality',
      description: 'Authentic, top-tier products, identical to originals',
      number: '01'
    },
    {
      title: 'Cash on Delivery',
      description: 'Pay only upon receiving your order',
      number: '02'
    },
    {
      title: 'Easy Returns',
      description: 'Hassle-free exchange in 3 days or refund in 1 day',
      number: '03'
    }
  ];

  return (
    <section className="py-24 px-3 sm:px-4 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide mb-6 text-gray-900">
            Why Choose Us?
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="text-6xl font-light text-gray-200 mb-6 group-hover:text-gray-400 transition-colors duration-300">
                {feature.number}
              </div>
              <h3 className="text-2xl font-light tracking-wide mb-4 uppercase text-gray-900">
                {feature.title}
              </h3>
              <div className="w-12 h-0.5 bg-gray-300 mx-auto mb-4 group-hover:w-full transition-all duration-500"></div>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyReemStore;

