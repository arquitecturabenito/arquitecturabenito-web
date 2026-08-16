import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

// 1. Remove the brand from ConstellationSidebars
const brandTarget = `      {/* Top Right Brand */}
      <div className="fixed top-8 right-8 z-30 text-right">
        <h1 className="text-2xl xl:text-3xl font-mono text-white tracking-widest uppercase" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          Benito G.<br/>Quiñones
        </h1>
        <p className="text-xs xl:text-sm text-gray-400 font-mono tracking-[0.2em] uppercase mt-2">
          Portfolio
        </p>
      </div>`;
content = content.replace(brandTarget, "");

// 2. Add BrandLogo component
const brandComponent = `const BrandLogo = () => (
  <div className="fixed top-14 right-4 md:top-8 md:right-8 z-[100] text-right pointer-events-none drop-shadow-lg">
    <h1 className="text-lg md:text-2xl xl:text-3xl font-mono text-white tracking-widest uppercase" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
      Benito G.<br/>Quiñones
    </h1>
    <p className="text-[9px] md:text-xs xl:text-sm text-gray-400 font-mono tracking-[0.2em] uppercase mt-1 md:mt-2 drop-shadow-md">
      Portfolio
    </p>
  </div>
);

const App = () => {`;
content = content.replace("const App = () => {", brandComponent);

// 3. Add <BrandLogo /> to App render
const appRenderTarget = `<div className="w-full h-full relative">
      <CustomCursor />
      {isNavigatingMode && <NavigationOverlay />}`;
const appRenderReplace = `<div className="w-full h-full relative">
      <CustomCursor />
      <BrandLogo />
      {isNavigatingMode && <NavigationOverlay />}`;
content = content.replace(appRenderTarget, appRenderReplace);

// 4. Move Instructions box to bottom-left instead of bottom-center
const instrTarget = `className="fixed bottom-24 left-1/2 -translate-x-1/2 p-2 sm:p-3 bg-black/40 backdrop-blur-md rounded-xl md:rounded-lg border border-white/10 text-white/70 text-[9px] sm:text-[10px] md:text-xs font-mono tracking-wider pointer-events-none opacity-70 animate-pulse text-center whitespace-pre-line z-50 min-w-max"`;
const instrReplace = `className="fixed bottom-24 left-4 md:bottom-8 md:left-8 p-2 sm:p-3 bg-black/40 backdrop-blur-md rounded-xl md:rounded-lg border border-white/10 text-white/70 text-[9px] sm:text-[10px] md:text-xs font-mono tracking-wider pointer-events-none opacity-70 text-left whitespace-pre-line z-50 min-w-max"`;
content = content.replace(instrTarget, instrReplace);

fs.writeFileSync('/app/applet/src/main.jsx', content);
