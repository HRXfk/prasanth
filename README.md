# EcoWorth - Ecosystem Value Calculator

EcoWorth is a web platform that calculates the economic value of ecosystem services. This static version is designed to run on GitHub Pages and provides the same functionality as the original full-stack application.

## Features

- **Interactive Ecosystem Value Calculator**: Calculate annual monetary value of ecosystem services
- **Research-Based Calculations**: Uses scientific multipliers adapted for Indian ecosystems
- **Multiple Ecosystem Types**: Forest, Wetland, Grassland, Agricultural, and Urban Green spaces
- **Land Use Impact Assessment**: Accounts for different levels of ecosystem degradation
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Clean, modern interface with smooth animations

## Ecosystem Services Calculated

1. **Carbon Sequestration**: CO2 storage and climate regulation
2. **Water Purification**: Water filtration and quality improvement
3. **Soil Fertility**: Soil formation and nutrient cycling
4. **Pollination**: Support for agriculture and biodiversity
5. **Recreation**: Cultural and recreational value

## Deployment to GitHub Pages

### Method 1: Direct Upload
1. Fork or create a new repository
2. Upload `index.html` and `script.js` to the repository
3. Go to repository Settings → Pages
4. Select source as "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save
7. Your site will be available at `https://yourusername.github.io/repository-name`

### Method 2: GitHub Actions (Recommended)
1. Create a new repository with these files
2. GitHub Pages will automatically detect the `index.html` file
3. Go to Settings → Pages
4. Source should be automatically set to "Deploy from a branch"
5. The site will be built and deployed automatically

## File Structure

```
/
├── index.html          # Main HTML file with complete UI
├── script.js           # JavaScript with calculation logic
└── README.md          # This file
```

## Technical Details

### Ecosystem Calculation Methodology

The calculator uses research-based multipliers for each ecosystem service:

**Forest Ecosystem (per hectare/year in INR):**
- Carbon Sequestration: ₹25,000
- Water Purification: ₹15,000
- Soil Fertility: ₹8,000
- Pollination: ₹5,000
- Recreation: ₹12,000

**Wetland Ecosystem (per hectare/year in INR):**
- Carbon Sequestration: ₹35,000
- Water Purification: ₹45,000
- Soil Fertility: ₹5,000
- Pollination: ₹3,000
- Recreation: ₹8,000

**Land Use Impact Factors:**
- Pristine: 100% of ecosystem value
- Well Managed: 80% of ecosystem value
- Moderately Degraded: 50% of ecosystem value
- Heavily Degraded: 20% of ecosystem value
- Converted: 10% of ecosystem value

### Technologies Used

- **HTML5**: Semantic markup structure
- **Tailwind CSS**: Modern utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No external dependencies for calculations
- **Responsive Design**: Mobile-first approach

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Usage Example

1. Enter land area in hectares (e.g., 5)
2. Select ecosystem type (e.g., Forest)
3. Choose land use condition (e.g., Well Managed)
4. Click "Calculate Ecosystem Value"
5. View detailed breakdown of ecosystem services

## Customization

### Adding New Ecosystem Types

Edit the `ecosystemMultipliers` object in `script.js`:

```javascript
const ecosystemMultipliers = {
    // Add new ecosystem type
    mangrove: {
        carbon_sequestration: 40000,
        water_purification: 35000,
        soil_fertility: 6000,
        pollination: 2000,
        recreation: 10000
    }
};
```

### Modifying Service Values

Update the values in `ecosystemMultipliers` based on new research or regional data.

### Styling Changes

The application uses Tailwind CSS classes. You can:
1. Modify existing classes in `index.html`
2. Add custom CSS in the `<style>` section
3. Replace Tailwind CDN with a custom build

## Performance

- **Load Time**: < 2 seconds on 3G connection
- **Size**: ~50KB total (HTML + JS)
- **Calculations**: Instant (client-side processing)

## Educational Use

This calculator is designed for:
- Environmental education
- Policy planning support
- Research demonstrations
- Conservation awareness

**Disclaimer**: Values are estimates based on ecological economics research. Use for educational and planning purposes. Actual ecosystem values may vary based on local conditions.

## Contributing

To contribute improvements:

1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
- Check the calculator logic in `script.js`
- Verify form validation
- Test on different devices/browsers
- Review console for JavaScript errors

## Version History

- **v1.0**: Initial static version with complete functionality
- Based on the original EcoWorth full-stack application

---

**EcoWorth** - Making the economic value of nature visible and tangible. 🌱
