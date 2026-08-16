import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetSidebar = `  let displayedProjects = validProjects;
  if (currentFilter !== "all" && currentFilter !== "home") {
    displayedProjects = validProjects.filter((p) => {
      if (currentFilter === "escenografias") return p.category === "scenography";
      return p.category === currentFilter;
    });
  }`;

const replaceSidebar = `  let displayedProjects = validProjects;
  if (currentFilter !== "all" && currentFilter !== "home") {
    displayedProjects = validProjects.filter((p) => {
      if (currentFilter === "escenografias" || currentFilter === "scenography") {
        return p.category === "scenography" || p.category === "escenografias";
      }
      return p.category === currentFilter;
    });
  }`;

content = content.replace(targetSidebar, replaceSidebar);
fs.writeFileSync('/app/applet/src/main.jsx', content);
