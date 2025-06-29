import React from "react";

const HeroSection = ({ onCalculateClick }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1633158829875-e5316a358c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
          Discover the True <span className="text-yellow-400">Economic Value</span> of Nature
        </h1>
        
        <p className="text-xl sm:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
          EcoWorth makes the invisible visible - calculate the real monetary value of ecosystem services 
          like carbon sequestration, water purification, and biodiversity conservation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={onCalculateClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Calculate Ecosystem Value
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-green-900 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300">
            Learn More
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">₹65,000</div>
            <div className="text-green-100 mt-2">Average forest value per hectare/year</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">₹96,000</div>
            <div className="text-green-100 mt-2">Average wetland value per hectare/year</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">₹48,000</div>
            <div className="text-green-100 mt-2">Average grassland value per hectare/year</div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 text-yellow-400 opacity-60">
        <svg className="w-8 h-8 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
        </svg>
      </div>
      
      <div className="absolute bottom-32 right-16 text-green-300 opacity-60">
        <svg className="w-12 h-12 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;