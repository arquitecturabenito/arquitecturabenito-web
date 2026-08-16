import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetSidebar = `const ConstellationSidebars = ({ currentFilter, onProjectSelect }) => {
  // Only display on desktop
  const validProjects = allProjectsData.filter(
    (p) => !p.isCategoryNode && p.id !== "CENTRAL_HUB" && !p.isPage
  );`;

const replaceSidebar = `const ConstellationSidebars = ({ currentFilter, onProjectSelect, onProjectHover }) => {
  // Only display on desktop
  const validProjects = allProjectsData.filter(
    (p) => !p.isCategoryNode && p.id !== "CENTRAL_HUB" && !p.isPage
  );`;

content = content.replace(targetSidebar, replaceSidebar);

// Also add onMouseEnter and onMouseLeave
const targetButton = `            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}`;

const replaceButton = `            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}
              onMouseEnter={() => onProjectHover && onProjectHover(p.id)}
              onMouseLeave={() => onProjectHover && onProjectHover(null)}`;

content = content.replace(new RegExp(targetButton.replace(/[.*+?^$\\{\\}|()[\\]\\\\]/g, '\\\\$&'), 'g'), replaceButton);

fs.writeFileSync('/app/applet/src/main.jsx', content);
