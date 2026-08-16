import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetStr = `const ConstellationSidebars = ({ currentFilter, onProjectSelect }) => {
  // Only display on desktop
  const validProjects = window.allProjectsData.filter(
    (p) => !p.isCategoryNode && p.id !== "CENTRAL_HUB" && !p.isPage
  );`;

const replaceStr = `const ConstellationSidebars = ({ currentFilter, onProjectSelect }) => {
  // Only display on desktop
  const validProjects = allProjectsData.filter(
    (p) => !p.isCategoryNode && p.id !== "CENTRAL_HUB" && !p.isPage
  );`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('/app/applet/src/main.jsx', content);
