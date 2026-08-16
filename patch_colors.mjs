import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetNodeColor = `          } else if (filter === "design" && (node.isSubcategory || node.isProject)) {
             color = Math.random() > 0.5 ? "#ff0000" : "#ffcc00";
             textColor = color;
          }`;

const replaceNodeColor = `          } else if (filter === "design" && (node.isSubcategory || node.isProject)) {
             color = Math.random() > 0.5 ? "#ff0000" : "#ffcc00";
             textColor = "#ffcc00";
          }`;

content = content.replace(targetNodeColor, replaceNodeColor);
fs.writeFileSync('/app/applet/src/main.jsx', content);
