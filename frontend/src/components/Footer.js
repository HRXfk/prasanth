import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-green-400 mb-4">EcoWorth</h3>
            <p className="text-gray-300 mb-4">
              Making the economic value of nature visible and tangible. 
              Supporting informed decisions for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <div className="bg-green-600 px-3 py-1 rounded-full text-sm">
                🌱 Research-Based
              </div>
              <div className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                🇮🇳 India-Focused
              </div>
            </div>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition-colors">Methodology</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Research Papers</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Partnerships</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Feedback</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 EcoWorth. Built with 💚 for a sustainable future.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                Values are estimates based on ecological economics research • Use for educational and planning purposes
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;