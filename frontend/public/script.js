// Global variables
let ecosystemTypes = [];
let landUseTypes = [];

// API Configuration
const BACKEND_URL = 'https://a80120b8-6356-4b99-b55f-5a588f6d5efe.preview.emergentagent.com';
const API = `${BACKEND_URL}/api`;

// DOM Elements
const calculateBtn = document.getElementById('calculateBtn');
const calculatorSection = document.getElementById('calculator');
const ecosystemForm = document.getElementById('ecosystemForm');
const ecosystemTypeSelect = document.getElementById('ecosystemType');
const landUseSelect = document.getElementById('landUse');
const ecosystemDescription = document.getElementById('ecosystemDescription');
const landUseDescription = document.getElementById('landUseDescription');
const errorMessage = document.getElementById('errorMessage');
const calculateButton = document.getElementById('calculateButton');
const buttonText = document.getElementById('buttonText');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultsContainer = document.getElementById('resultsContainer');
const placeholderContent = document.getElementById('placeholderContent');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    calculateBtn.addEventListener('click', showCalculator);
    ecosystemForm.addEventListener('submit', handleFormSubmit);
    ecosystemTypeSelect.addEventListener('change', handleEcosystemTypeChange);
    landUseSelect.addEventListener('change', handleLandUseChange);
    
    // Fetch ecosystem types
    fetchEcosystemTypes();
});

// Show calculator section
function showCalculator() {
    calculatorSection.style.display = 'block';
    calculatorSection.scrollIntoView({ behavior: 'smooth' });
}

// Fetch ecosystem types from API
async function fetchEcosystemTypes() {
    try {
        const response = await fetch(`${API}/ecosystem-types`);
        const data = await response.json();
        
        ecosystemTypes = data.ecosystem_types;
        landUseTypes = data.land_use_types;
        
        populateDropdowns();
    } catch (error) {
        console.error('Error fetching ecosystem types:', error);
        showError('Failed to load ecosystem types. Please refresh the page.');
    }
}

// Populate dropdown menus
function populateDropdowns() {
    // Populate ecosystem types
    ecosystemTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.value;
        option.textContent = type.label;
        ecosystemTypeSelect.appendChild(option);
    });
    
    // Populate land use types
    landUseTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.value;
        option.textContent = type.label;
        landUseSelect.appendChild(option);
    });
}

// Handle ecosystem type change
function handleEcosystemTypeChange(event) {
    const selectedType = ecosystemTypes.find(type => type.value === event.target.value);
    if (selectedType) {
        ecosystemDescription.textContent = selectedType.description;
    } else {
        ecosystemDescription.textContent = '';
    }
}

// Handle land use change
function handleLandUseChange(event) {
    const selectedType = landUseTypes.find(type => type.value === event.target.value);
    if (selectedType) {
        landUseDescription.textContent = selectedType.description;
    } else {
        landUseDescription.textContent = '';
    }
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(ecosystemForm);
    const data = {
        land_area: parseFloat(formData.get('land_area')),
        ecosystem_type: formData.get('ecosystem_type'),
        land_use: formData.get('land_use'),
        region: formData.get('region') || 'India'
    };
    
    // Validate required fields
    if (!data.land_area || !data.ecosystem_type || !data.land_use) {
        showError('Please fill in all required fields.');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    hideError();
    
    try {
        const response = await fetch(`${API}/calculate-ecosystem-value`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to calculate ecosystem value');
        }
        
        const result = await response.json();
        displayResults(result);
        
    } catch (error) {
        console.error('Error calculating ecosystem value:', error);
        showError('Failed to calculate ecosystem value. Please try again.');
    } finally {
        setLoadingState(false);
    }
}

// Set loading state
function setLoadingState(loading) {
    calculateButton.disabled = loading;
    if (loading) {
        buttonText.style.display = 'none';
        loadingSpinner.style.display = 'flex';
    } else {
        buttonText.style.display = 'block';
        loadingSpinner.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
}

// Display results
function displayResults(result) {
    // Hide placeholder content
    placeholderContent.style.display = 'none';
    
    // Show results container
    resultsContainer.style.display = 'block';
    
    // Update total value
    const totalValue = document.getElementById('totalValue');
    totalValue.querySelector('.total-amount').textContent = formatCurrency(result.total_annual_value_inr);
    totalValue.querySelector('.total-label').textContent = 
        `Total Annual Value for ${result.input_data.land_area} hectares`;
    
    // Update services breakdown
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = '';
    
    result.services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        
        serviceItem.innerHTML = `
            <div class="service-header">
                <div class="service-info">
                    <div class="service-name">${service.service_name}</div>
                    <div class="service-description">${service.description}</div>
                </div>
                <div class="service-values">
                    <div class="service-total">${formatCurrency(service.total_value_inr)}</div>
                    <div class="service-per-hectare">${formatCurrency(service.value_per_hectare_inr)}/hectare/year</div>
                </div>
            </div>
        `;
        
        servicesList.appendChild(serviceItem);
    });
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .stat-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initial animation check
animateOnScroll();

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out;
    }
`;
document.head.appendChild(style);