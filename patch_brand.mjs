import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetLogo = `const BrandLogo = ({ theme = "dark" }) => {
  let titleColor, subColor, shadow;
  if (theme === "design") {
    titleColor = "text-[#ff0000]";
    subColor = "text-[#ff0000]";
    shadow = "0 2px 10px rgba(0,0,0,0.3)";
  } else if (theme === "light") {
    titleColor = "text-black";
    subColor = "text-gray-600";
    shadow = "none";
  } else {
    titleColor = "text-white";
    subColor = "text-gray-400";
    shadow = "0 2px 10px rgba(0,0,0,0.5)";
  }

  return (
    <div className="fixed top-[70px] left-4 md:top-8 md:left-8 z-[100] text-left pointer-events-none drop-shadow-lg">
      <h1 className={\`text-xl md:text-2xl xl:text-3xl font-mono tracking-widest uppercase \${titleColor}\`} style={{ textShadow: shadow }}>
        Benito G.<br/>Quiñones
      </h1>
      <p className={\`text-[9px] md:text-xs xl:text-sm font-mono tracking-[0.2em] uppercase mt-1 md:mt-2 drop-shadow-md \${subColor}\`}>
        Portfolio
      </p>
    </div>
  );
};`;

const replaceLogo = `const BrandLogo = ({ theme = "dark", compact = false }) => {
  let titleColor, subColor, shadow;
  if (theme === "design") {
    titleColor = "text-[#ff0000]";
    subColor = "text-[#ff0000]";
    shadow = "0 2px 10px rgba(0,0,0,0.3)";
  } else if (theme === "light") {
    titleColor = "text-black";
    subColor = "text-gray-600";
    shadow = "none";
  } else {
    titleColor = "text-white";
    subColor = "text-gray-400";
    shadow = "0 2px 10px rgba(0,0,0,0.5)";
  }

  const containerClasses = compact
    ? "fixed top-6 right-4 md:top-6 md:right-8 z-[100] text-right pointer-events-none drop-shadow-lg"
    : "fixed top-[70px] left-4 md:top-8 md:left-8 z-[100] text-left pointer-events-none drop-shadow-lg";
    
  const h1Classes = compact
    ? \`text-[10px] md:text-xs font-mono tracking-[0.1em] uppercase \${titleColor}\`
    : \`text-xl md:text-2xl xl:text-3xl font-mono tracking-widest uppercase \${titleColor}\`;
    
  const pClasses = compact
    ? \`text-[7px] md:text-[8px] font-mono tracking-[0.2em] uppercase mt-0.5 md:mt-1 drop-shadow-md \${subColor}\`
    : \`text-[9px] md:text-xs xl:text-sm font-mono tracking-[0.2em] uppercase mt-1 md:mt-2 drop-shadow-md \${subColor}\`;

  return (
    <div className={containerClasses}>
      <h1 className={h1Classes} style={{ textShadow: shadow }}>
        {compact ? "Benito G. Quiñones" : <React.Fragment>Benito G.<br/>Quiñones</React.Fragment>}
      </h1>
      <p className={pClasses}>
        Portfolio
      </p>
    </div>
  );
};`;

content = content.replace(targetLogo, replaceLogo);

const targetApp = `  } else if (view.page === "escritos") {
    currentTheme = "light";
  } else if (view.page === "escritos-react") {
    currentTheme = "light";
  }

  return (
    <div className="w-full h-full relative">
      <CustomCursor />
      <BrandLogo theme={currentTheme} />`;

const replaceApp = `  } else if (view.page === "escritos") {
    currentTheme = "light";
  } else if (view.page === "escritos-react") {
    currentTheme = "light";
  }

  const isPublication = [
    "project",
    "carteleria",
    "generacion-ia",
    "web-design",
    "escritos-arquitectura",
    "escrito-detail",
  ].includes(view.page);

  return (
    <div className="w-full h-full relative">
      <CustomCursor />
      <BrandLogo theme={currentTheme} compact={isPublication} />`;

content = content.replace(targetApp, replaceApp);
fs.writeFileSync('/app/applet/src/main.jsx', content);
