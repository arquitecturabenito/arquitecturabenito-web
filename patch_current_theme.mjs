import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetTheme = `  let currentTheme = "dark";
  if (view.page === "project" && view.projectId) {
    const project = allProjectsData.find((p) => p.id === view.projectId);
    if (project) {
      const carouselProjects = [
        "escenografia-grita",
        "escenografia-bodas",
        "coleccion-grabados",
        "territorios-digitales",
      ];
      const isCarouselView = carouselProjects.includes(project.id);
      const isDesignTheme = project.category === "design";
      const isDarkTheme = project.id === "hashima-animal-park" || isCarouselView || isDesignTheme;
      currentTheme = isDesignTheme ? "design" : (isDarkTheme ? "dark" : "light");
    }
  } else if (view.page === "escritos") {
    currentTheme = "light";
  } else if (view.page === "escritos-react") {
    currentTheme = "light";
  }`;

const replaceTheme = `  let currentTheme = "dark";
  if (view.page === "project" && view.projectId) {
    const project = allProjectsData.find((p) => p.id === view.projectId);
    if (project) {
      const carouselProjects = [
        "escenografia-grita",
        "escenografia-bodas",
        "coleccion-grabados",
        "territorios-digitales",
      ];
      const isCarouselView = carouselProjects.includes(project.id);
      const isDesignTheme = project.category === "design";
      const isDarkTheme = project.id === "hashima-animal-park" || isCarouselView || isDesignTheme;
      currentTheme = isDesignTheme ? "design" : (isDarkTheme ? "dark" : "light");
    }
  } else if (view.page === "escritos") {
    currentTheme = "light";
  } else if (view.page === "escritos-react") {
    currentTheme = "light";
  } else if (view.page === "design" || (view.page === "home" && filter === "design")) {
    currentTheme = "design";
  }`;

content = content.replace(targetTheme, replaceTheme);
fs.writeFileSync('/app/applet/src/main.jsx', content);
