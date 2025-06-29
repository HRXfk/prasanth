// EcoWorth Calculator JavaScript

// Ecosystem calculation data (converted from Python backend)
const ecosystemMultipliers = {
    forest: {
        carbon_sequestration: 25000,  // Carbon storage and sequestration
        water_purification: 15000,    // Watershed protection and water quality
        soil_fertility: 8000,         // Soil formation and nutrient cycling
        pollination: 5000,            // Pollination services
        recreation: 12000             // Ecotourism and recreation
    },
    wetland: {
        carbon_sequestration: 35000,  // High carbon storage in wetlands
        water_purification: 45000,    // Excellent water filtration
        soil_fertility: 5000,         // Limited soil formation
        pollination: 3000,            // Some pollination services
        recreation: 8000              // Recreational and cultural value
    },
    grassland: {
        carbon_sequestration: 15000,  // Moderate carbon storage
        water_purification: 8000,     // Some water regulation
        soil_fertility: 12000,        // Good soil formation
        pollination: 8000,            // Important pollination services
        recreation: 5000              // Grazing and recreational value
    },
    agricultural: {
        carbon_sequestration: 8000,   // Lower carbon storage
        water_purification: 3000,     // Limited water purification
        soil_fertility: 15000,        // High soil productivity (when managed well)
        pollination: 12000,           // Important for crop production
        recreation: 2000              // Limited recreational value
    },
    urban_green: {
        carbon_sequestration: 18000,  // Urban trees store carbon
        water_purification: 10000,    // Stormwater management
        soil_fertility: 3000,         // Limited soil services
        pollination: 6000,            // Urban pollination services
        recreation: 20000             // High recreational and health value
    }
};

// Land use impact factors (multipliers)
const landUseFactors = {
    pristine: 1.0,                   // Full ecosystem value
    well_managed: 0.8,               // Some degradation but well maintained
    moderately_degraded: 0.5,        // Significant degradation
    heavily_degraded: 0.2,           // Severely compromised ecosystem
    converted: 0.1                   // Almost no natural ecosystem services
};

// Service descriptions
const serviceDescriptions = {
    carbon_sequestration: "Carbon storage and climate regulation services",
    water_purification: "Water filtration, regulation, and quality improvement",
    soil_fertility: "Soil formation, nutrient cycling, and erosion prevention",
    pollination: "Pollination services supporting biodiversity and agriculture",
    recreation: "Recreation, ecotourism, and cultural ecosystem services"
};

// Ecosystem type descriptions
const ecosystemDescriptions = {
    forest: "Tropical, temperate, or boreal forests",
    wetland: "Marshes, swamps, rivers, and lakes",
    grassland: "Natural grasslands and savannas",
    agricultural: "Farmland and crop areas",
    urban_green: "Parks, gardens, and urban forests"
};

// Land use descriptions
const landUseDescriptions = {
    pristine: "Undisturbed natural ecosystem",
    well_managed: "Protected or sustainably managed",
    moderately_degraded: "Some human impact but recoverable",
    heavily_degraded: "Significant degradation requiring restoration",
    converted: "Heavily modified or developed land"
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    // Form submission
    document.getElementById('calculatorForm').addEventListener('submit', handleFormSubmit);
    
    // Ecosystem type change
    document.getElementById('ecosystemType').addEventListener('change', updateEcosystemDescription);
    
    // Land use change
    document.getElementById('landUse').addEventListener('change', updateLandUseDescription);
}

function scrollToCalculator() {
    const calculatorElement = document.getElementById('calculator');
    if (calculatorElement) {
        calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateEcosystemDescription() {
    const ecosystemType = document.getElementById('ecosystemType').value;
    const descriptionElement = document.getElementById('ecosystemDescription');
    
    if (ecosystemType && ecosystemDescriptions[ecosystemType]) {
        descriptionElement.textContent = ecosystemDescriptions[ecosystemType];
    } else {
        descriptionElement.textContent = '';
    }
}

function updateLandUseDescription() {
    const landUse = document.getElementById('landUse').value;
    const descriptionElement = document.getElementById('landUseDescription');
    
    if (landUse && landUseDescriptions[landUse]) {
        descriptionElement.textContent = landUseDescriptions[landUse];
    } else {
        descriptionElement.textContent = '';
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        landArea: parseFloat(document.getElementById('landArea').value),
        ecosystemType: document.getElementById('ecosystemType').value,
        landUse: document.getElementById('landUse').value,
        region: document.getElementById('region').value || 'India'
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Show loading state
    showLoading();
    
    // Calculate ecosystem values
    setTimeout(() => {
        const result = calculateEcosystemValues(formData);
        displayResults(result);
        hideLoading();
    }, 1000); // Simulate processing time
}

function validateForm(formData) {
    const errorElement = document.getElementById('errorMessage');
    
    if (!formData.landArea || formData.landArea <= 0) {
        showError('Please enter a valid land area greater than 0');
        return false;
    }
    
    if (!formData.ecosystemType) {
        showError('Please select an ecosystem type');
        return false;
    }
    
    if (!formData.landUse) {
        showError('Please select a land use condition');
        return false;
    }
    
    hideError();
    return true;
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.classList.add('hidden');
}

function showLoading() {
    const button = document.getElementById('calculateButton');
    const buttonText = document.getElementById('buttonText');
    
    button.disabled = true;
    buttonText.innerHTML = `
        <div class="flex items-center justify-center">
            <div class="spinner mr-2"></div>
            Calculating...
        </div>
    `;
}

function hideLoading() {
    const button = document.getElementById('calculateButton');
    const buttonText = document.getElementById('buttonText');
    
    button.disabled = false;
    buttonText.textContent = 'Calculate Ecosystem Value';
}

function calculateEcosystemValues(inputData) {
    const ecosystemType = inputData.ecosystemType.toLowerCase();
    const landUse = inputData.landUse.toLowerCase();
    
    // Use default values if ecosystem type not found
    const baseValues = ecosystemMultipliers[ecosystemType] || ecosystemMultipliers.grassland;
    
    // Use default land use factor if not found
    const landUseFactor = landUseFactors[landUse] || landUseFactors.moderately_degraded;
    
    const services = [];
    let totalValue = 0;
    
    // Calculate each service
    for (const [serviceName, baseValuePerHectare] of Object.entries(baseValues)) {
        const adjustedValuePerHectare = baseValuePerHectare * landUseFactor;
        const totalServiceValue = adjustedValuePerHectare * inputData.landArea;
        
        const service = {
            serviceName: formatServiceName(serviceName),
            valuePerHectareInr: Math.round(adjustedValuePerHectare * 100) / 100,
            totalValueInr: Math.round(totalServiceValue * 100) / 100,
            description: serviceDescriptions[serviceName]
        };
        
        services.push(service);
        totalValue += totalServiceValue;
    }
    
    return {
        inputData: inputData,
        services: services,
        totalAnnualValueInr: Math.round(totalValue * 100) / 100
    };
}

function formatServiceName(serviceName) {
    return serviceName
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
}

function displayResults(result) {
    // Hide default view and show results
    document.getElementById('defaultView').classList.add('hidden');
    document.getElementById('resultsView').classList.remove('hidden');
    
    // Update total value
    document.getElementById('totalValue').textContent = formatCurrency(result.totalAnnualValueInr);
    document.getElementById('totalValueSubtext').textContent = 
        `Total Annual Value for ${result.inputData.landArea} hectares`;
    
    // Update services breakdown
    const servicesContainer = document.getElementById('servicesBreakdown');
    servicesContainer.innerHTML = '';
    
    result.services.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.className = 'border-l-4 border-green-500 pl-4 py-2';
        serviceElement.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h5 class="font-semibold text-gray-900">${service.serviceName}</h5>
                    <p class="text-sm text-gray-600 mt-1">${service.description}</p>
                </div>
                <div class="text-right ml-4">
                    <div class="font-bold text-green-600">
                        ${formatCurrency(service.totalValueInr)}
                    </div>
                    <div class="text-sm text-gray-500">
                        ${formatCurrency(service.valuePerHectareInr)}/hectare/year
                    </div>
                </div>
            </div>
        `;
        servicesContainer.appendChild(serviceElement);
    });
}

// Export functions for potential use in other scripts
window.EcoWorth = {
    scrollToCalculator,
    calculateEcosystemValues,
    formatCurrency
};