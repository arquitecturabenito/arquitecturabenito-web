import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetAppRender = `  return (
    <div className="w-full h-full relative">`;

const replaceAppRender = `  const isDesignBg = currentTheme === "design" && !["generacion-ia", "web-design"].includes(view.page);
  return (
    <div className="w-full h-full relative" style={{ backgroundColor: isDesignBg ? "#001aff" : "transparent" }}>`;

content = content.replace(targetAppRender, replaceAppRender);
fs.writeFileSync('/app/applet/src/main.jsx', content);
