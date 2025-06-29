import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🌳",
      title: "Carbon Sequestration",
      description: "Measure how much CO2 your ecosystem captures and stores, contributing to climate regulation."
    },
    {
      icon: "💧",
      title: "Water Purification",
      description: "Calculate the water filtration and quality improvement services provided by natural systems."
    },
    {
      icon: "🐝",
      title: "Pollination Services",
      description: "Quantify the economic value of pollination supporting agriculture and biodiversity."
    },
    {
      icon: "🌱",
      title: "Soil Fertility",
      description: "Evaluate soil formation, nutrient cycling, and erosion prevention services."
    },
    {
      icon: "🏞️",
      title: "Recreation & Tourism",
      description: "Assess the cultural and recreational value of natural areas for communities."
    },
    {
      icon: "📊",
      title: "Real-time Calculations",
      description: "Get instant, research-based valuations tailored to Indian ecosystem conditions."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ecosystem Services We Value
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform quantifies the hidden economic benefits that healthy ecosystems provide to society, 
            helping you understand the true cost of environmental degradation.
          </p>
        </div>
        
        {/* Featured Image */}
        <div className="mb-16">
          <img 
            src="https://images.unsplash.com/photo-1686842803181-1c43ea309a3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Diverse ecosystem showing multiple services"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Educational Content */}
        <div className="mt-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Ecosystem Valuation Matters
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>For Policymakers:</strong> Make informed decisions about land use, conservation investments, 
                  and environmental regulations based on economic evidence.
                </p>
                <p>
                  <strong>For Farmers:</strong> Understand the additional value your land provides beyond crops, 
                  supporting arguments for sustainable agriculture subsidies.
                </p>
                <p>
                  <strong>For Researchers:</strong> Access research-based valuation methods adapted for Indian 
                  ecosystem conditions and economic contexts.
                </p>
                <p>
                  <strong>For Communities:</strong> Demonstrate the economic importance of local natural areas 
                  to support conservation efforts and eco-tourism development.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Global ecosystem services value:</span>
                  <span className="font-bold text-green-600">$125 trillion/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">India's forest cover:</span>
                  <span className="font-bold text-green-600">24.56% of land area</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wetlands in India:</span>
                  <span className="font-bold text-green-600">15.3 million hectares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Economic loss from degradation:</span>
                  <span className="font-bold text-red-600">3-7% of GDP annually</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;