import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetLinkColor = `        linkColor={(link) => {
          if (highlightLinks.has(link)) return "rgba(0,255,255,1)";
          if (filter === "design") {
            return "rgba(255,0,0,0.7)";
          }
          return link.value > 2 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)";
        }}`;

const replaceLinkColor = `        linkColor={(link) => {
          if (highlightLinks.has(link)) return filter === "design" ? "rgba(255,204,0,1)" : "rgba(0,255,255,1)";
          if (filter === "design") {
            return "rgba(255,0,0,0.7)";
          }
          return link.value > 2 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)";
        }}`;

content = content.replace(targetLinkColor, replaceLinkColor);
fs.writeFileSync('/app/applet/src/main.jsx', content);
