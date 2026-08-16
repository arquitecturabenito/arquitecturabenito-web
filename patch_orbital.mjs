import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetArgs = `const OrbitalPage = ({
  category,
  subcategory,
  title,
  onProjectSelect,
  onSubcategorySelect,
  onProjectHover = () => {},
  showEye = false,
}) => {`;

const replaceArgs = `const OrbitalPage = ({
  category,
  subcategory,
  title,
  onProjectSelect,
  onSubcategorySelect,
  onProjectHover = () => {},
  showEye = false,
  highlightNodeId = null,
}) => {`;

content = content.replace(targetArgs, replaceArgs);

fs.writeFileSync('/app/applet/src/main.jsx', content);
