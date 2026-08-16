import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetEyeUsage = `      {showEye && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <EyeIcon />
        </div>
      )}`;

const replaceEyeUsage = `      {showEye && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <EyeIcon color={category === "design" ? "#ff0000" : "#00ffff"} />
        </div>
      )}`;

content = content.replace(targetEyeUsage, replaceEyeUsage);
fs.writeFileSync('/app/applet/src/main.jsx', content);
