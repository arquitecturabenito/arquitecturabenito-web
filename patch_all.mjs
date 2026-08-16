import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

// 1. Fix Escenografias projects hiding on mobile (OrbitalPage)
const orbTarget = `      if (isMobile && !subcategory) {
        projectNodes = [];
      }`;
const orbReplace = `      if (isMobile && !subcategory && category !== "escenografias" && category !== "scenography") {
        projectNodes = [];
      }`;
content = content.replace(orbTarget, orbReplace);

// 2. Fix OrbitalPage mobile bounds (Jail/Hail)
const boundsTarget = `      simulation.on("tick", () => {
        const marginX = isMobile ? 100 : 200;
        const marginY = isMobile ? 80 : 120;
        const centerKeepout = isMobile ? 120 : 220;`;
const boundsReplace = `      simulation.on("tick", () => {
        const marginX = isMobile ? 30 : 200;
        const marginY = isMobile ? 50 : 120;
        const centerKeepout = isMobile ? 80 : 220;`;
content = content.replace(boundsTarget, boundsReplace);

// 3. Fix NetworkGraph 3D sizing for mobile
const networkForceTarget = `    if (fgRef.current) {
      fgRef.current.d3Force("link").distance((link) => {
        if (link.value === 1) return 200; // Central to Category
        if (link.value === 2) return 100; // Category to Subcategory
        return 60; // Subcat/Cat to Project
      });
      fgRef.current.d3Force("charge").strength(-150);
    }`;
const networkForceReplace = `    if (fgRef.current) {
      const isMobile = window.innerWidth < 768;
      fgRef.current.d3Force("link").distance((link) => {
        if (link.value === 1) return isMobile ? 120 : 200; // Central to Category
        if (link.value === 2) return isMobile ? 60 : 100; // Category to Subcategory
        return isMobile ? 40 : 60; // Subcat/Cat to Project
      });
      fgRef.current.d3Force("charge").strength(isMobile ? -80 : -150);
    }`;
content = content.replace(networkForceTarget, networkForceReplace);

// 4. Fix NetworkGraph 3D mobile "all" filter logic (don't hide escenografias projects)
const networkMobileTarget = `      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        const projectNodes = relevantProjects.map((p) => ({`;
const networkMobileReplace = `      const isMobile = window.innerWidth < 768;
      
      const filteredRelevantProjects = isMobile 
        ? relevantProjects.filter(p => p.category === "scenography" || p.category === "escenografias") 
        : relevantProjects;
        
      const projectNodes = filteredRelevantProjects.map((p) => ({`;
content = content.replace(networkMobileTarget, networkMobileReplace);

const networkMobileTarget2 = `          nodesData.push(...projectNodes);
          linksData.push(...projectLinks);
      }
    } else {`;
const networkMobileReplace2 = `          nodesData.push(...projectNodes);
          linksData.push(...projectLinks);
    } else {`;
content = content.replace(networkMobileTarget2, networkMobileReplace2);

// 5. Fix Mobile Header scrolling & overflow
const headerTarget = `{/* Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-20 bg-black/50 backdrop-blur-sm border-b border-white/10 overflow-x-auto hide-scrollbar text-center whitespace-nowrap">
        <div className="inline-flex space-x-2 items-center px-4 py-2 min-w-min">`;
const headerReplace = `{/* Mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 max-w-[100vw] z-20 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="flex overflow-x-auto hide-scrollbar space-x-2 px-4 py-2 justify-start items-center w-full">`;
content = content.replace(headerTarget, headerReplace);

fs.writeFileSync('src/main.jsx', content);
