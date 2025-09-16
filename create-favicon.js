const fs = require('fs');

// Create a simple ICO file with embedded PNG data
// This is a basic ICO structure with a 16x16 PNG
const createFavicon = () => {
  // Simple SVG-based favicon that browsers will accept
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="7" fill="#FFD700" stroke="#333" stroke-width="0.5"/>
  <circle cx="5.5" cy="6" r="1" fill="#333"/>
  <circle cx="10.5" cy="6" r="1" fill="#333"/>
  <path d="M 5 10 Q 8 13 11 10" stroke="#333" stroke-width="1" fill="none" stroke-linecap="round"/>
</svg>`;

  // For modern browsers, we can use SVG directly
  fs.writeFileSync('public/favicon.svg', svgFavicon);
  
  console.log('✅ Smiley face favicon created successfully!');
  console.log('📝 Created public/favicon.svg');
};

createFavicon();
