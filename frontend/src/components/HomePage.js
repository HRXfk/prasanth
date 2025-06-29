import React, { useState } from "react";
import HeroSection from "./HeroSection";
import CalculatorSection from "./CalculatorSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";

const HomePage = () => {
  const [calculatorVisible, setCalculatorVisible] = useState(false);

  const scrollToCalculator = () => {
    setCalculatorVisible(true);
    setTimeout(() => {
      const calculatorElement = document.getElementById('calculator');
      if (calculatorElement) {
        calculatorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <HeroSection onCalculateClick={scrollToCalculator} />
      <FeaturesSection />
      {calculatorVisible && <CalculatorSection />}
      <Footer />
    </div>
  );
};

export default HomePage;