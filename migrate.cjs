const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const babelStart = html.indexOf('<script type="text/babel">');
const babelEnd = html.indexOf('</script>', babelStart);

if (babelStart !== -1 && babelEnd !== -1) {
    const scriptContent = html.substring(babelStart + '<script type="text/babel">'.length, babelEnd);
    
    // Write to src/main.jsx
    if (!fs.existsSync('src')) {
        fs.mkdirSync('src');
    }
    
    let jsxContent = `import React from 'react';\nimport ReactDOM from 'react-dom/client';\n\n` + scriptContent;
    
    // Fix ReactDOM.createRoot which is React 18, but wait, from CDN it was ReactDOM.createRoot.
    // If we import ReactDOM from 'react-dom/client', it works exactly the same.
    
    fs.writeFileSync('src/main.jsx', jsxContent);
    console.log("Created src/main.jsx");
    
    // Remove Babel script and replace with Vite module script
    let newHtml = html.substring(0, babelStart) + '<script type="module" src="/src/main.jsx"></script>' + html.substring(babelEnd + '</script>'.length);
    
    // Also remove Babel standalone CDN
    newHtml = newHtml.replace('<script src="https://unpkg.com/@babel/standalone@7.23.0/babel.min.js"></script>', '');
    
    // Remove React and ReactDOM CDNs, because we're bundling them now!
    newHtml = newHtml.replace('<script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js" crossorigin></script>', '');
    newHtml = newHtml.replace('<script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js" crossorigin></script>', '');
    
    // Remove the old index.tsx script at the end
    newHtml = newHtml.replace('<script type="module" src="/index.tsx"></script>', '');

    fs.writeFileSync('index.html', newHtml);
    console.log("Updated index.html");
} else {
    console.log("Could not find babel script");
}
