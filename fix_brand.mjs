import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

// Use regex to remove all instances of BrandLogo declaration
const brandRegex = /const BrandLogo = \(\) => \([\s\S]*?Portfolio\n    <\/p>\n  <\/div>\n\);\n\n/g;
content = content.replace(brandRegex, "");

// Add back just one
const brandComponent = `const BrandLogo = () => (
  <div className="fixed top-[60px] right-4 md:top-8 md:right-8 z-50 text-right pointer-events-none drop-shadow-lg">
    <h1 className="text-xl md:text-2xl xl:text-3xl font-mono text-white tracking-widest uppercase" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
      Benito G.<br/>Quiñones
    </h1>
    <p className="text-[9px] md:text-xs xl:text-sm text-gray-400 font-mono tracking-[0.2em] uppercase mt-1 md:mt-2 drop-shadow-md">
      Portfolio
    </p>
  </div>
);

const App = () => {`;
content = content.replace("const App = () => {", brandComponent);

fs.writeFileSync('/app/applet/src/main.jsx', content);
