import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CalculatorSection = () => {
  const [formData, setFormData] = useState({
    land_area: "",
    ecosystem_type: "",
    land_use: "",
    region: "India"
  });
  
  const [ecosystemTypes, setEcosystemTypes] = useState([]);
  const [landUseTypes, setLandUseTypes] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEcosystemTypes();
  }, []);

  const fetchEcosystemTypes = async () => {
    try {
      const response = await axios.get(`${API}/ecosystem-types`);
      setEcosystemTypes(response.data.ecosystem_types);
      setLandUseTypes(response.data.land_use_types);
    } catch (err) {
      console.error("Error fetching ecosystem types:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.land_area || !formData.ecosystem_type || !formData.land_use) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API}/calculate-ecosystem-value`, {
        land_area: parseFloat(formData.land_area),
        ecosystem_type: formData.ecosystem_type,
        land_use: formData.land_use,
        region: formData.region
      });
      
      setResult(response.data);
    } catch (err) {
      console.error("Error calculating ecosystem value:", err);
      setError("Failed to calculate ecosystem value. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real-time Ecosystem Value Calculator
          </h2>
          <p className="text-xl text-gray-600">
            Calculate the annual economic value of ecosystem services for your area
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Land Area (hectares) *
                  </label>
                  <input
                    type="number"
                    name="land_area"
                    value={formData.land_area}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter area in hectares"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">1 hectare = 2.47 acres = 10,000 sq meters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ecosystem Type *
                  </label>
                  <select
                    name="ecosystem_type"
                    value={formData.ecosystem_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select ecosystem type</option>
                    {ecosystemTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {formData.ecosystem_type && (
                    <p className="text-sm text-gray-500 mt-1">
                      {ecosystemTypes.find(t => t.value === formData.ecosystem_type)?.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Land Use Condition *
                  </label>
                  <select
                    name="land_use"
                    value={formData.land_use}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select land use condition</option>
                    {landUseTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {formData.land_use && (
                    <p className="text-sm text-gray-500 mt-1">
                      {landUseTypes.find(t => t.value === formData.land_use)?.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Region (e.g., India, Maharashtra)"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </div>
                ) : (
                  "Calculate Ecosystem Value"
                )}
              </button>
            </form>
          </div>

          {/* Results Display */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {result ? (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Ecosystem Valuation Results
                </h3>
                
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      {formatCurrency(result.total_annual_value_inr)}
                    </div>
                    <div className="text-green-100">
                      Total Annual Value for {result.input_data.land_area} hectares
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Breakdown by Ecosystem Service:
                  </h4>
                  
                  {result.services.map((service, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{service.service_name}</h5>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-bold text-green-600">
                            {formatCurrency(service.total_value_inr)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatCurrency(service.value_per_hectare_inr)}/hectare/year
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2">Key Insights:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Values are based on research-adapted multipliers for Indian ecosystems</li>
                    <li>• Annual values may vary based on seasonal factors and local conditions</li>
                    <li>• These estimates help quantify the "hidden" benefits of healthy ecosystems</li>
                    <li>• Use these values to support conservation and policy decisions</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Calculate?
                </h3>
                <p className="text-gray-600">
                  Fill in the form on the left to discover the economic value of your ecosystem. 
                  Our calculator uses research-based methods to provide realistic estimates 
                  adapted for Indian conditions.
                </p>
                
                <div className="mt-8 space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">💡 Pro Tip</h4>
                    <p className="text-sm text-green-700">
                      Start with a small area (1-10 hectares) to understand the per-hectare values, 
                      then scale up your calculations for larger areas.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;