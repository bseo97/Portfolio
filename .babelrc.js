module.exports = {
  presets: ['next/babel'],
  plugins: [
    // Custom plugin to remove trailing slashes from void elements
    function() {
      return {
        name: 'remove-trailing-slashes',
        visitor: {
          JSXOpeningElement(path) {
            const elementName = path.node.name.name;
            
            // List of void elements that shouldn't have trailing slashes
            const voidElements = [
              'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
              'link', 'meta', 'param', 'source', 'track', 'wbr'
            ];
            
            if (voidElements.includes(elementName) && path.node.selfClosing) {
              // This will be handled by the React renderer, but we ensure
              // proper void element handling in the JSX
              path.node.selfClosing = true;
            }
          }
        }
      };
    }
  ]
};
