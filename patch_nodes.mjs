import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

// Patch NetworkGraph
const netTarget = `    if (filter === "all" || filter === "home" || filter === "contact") {
      nodesData = [...baseNodesRaw];
      linksData = [...baseLinksRaw];

      const projectNodes = relevantProjects.map((p) => ({
          id: p.title,
          group: 4,
          isNavLink: true,
          isProject: true,
          projectId: p.id,
          isPage: !!p.isPage,
          targetPage: p.targetPage || p.id,
        }));
        const projectLinks = relevantProjects.map((p) => ({
          source: getSourceNode(p),
          target: p.title,
          value: 5,
        }));

        nodesData.push(...projectNodes);
        linksData.push(...projectLinks);
    }`;

const netReplace = `    if (filter === "all" || filter === "home" || filter === "contact") {
      nodesData = [...baseNodesRaw];
      linksData = [...baseLinksRaw];

      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        const projectNodes = relevantProjects.map((p) => ({
            id: p.title,
            group: 4,
            isNavLink: true,
            isProject: true,
            projectId: p.id,
            isPage: !!p.isPage,
            targetPage: p.targetPage || p.id,
          }));
          const projectLinks = relevantProjects.map((p) => ({
            source: getSourceNode(p),
            target: p.title,
            value: 5,
          }));

          nodesData.push(...projectNodes);
          linksData.push(...projectLinks);
      }
    }`;
content = content.replace(netTarget, netReplace);

// Patch OrbitalPage
const orbTarget = `      const projectNodes = projects.map((p) => ({
        id: p.title,
        isProject: true,
        isPage: !!p.isPage || !!p.isCategoryNode,
        isCategoryNode: !!p.isCategoryNode,
        projectId: p.id,
        sun: subcategory ? title : p.subcategory || title,
      }));`;

const orbReplace = `      let projectNodes = projects.map((p) => ({
        id: p.title,
        isProject: true,
        isPage: !!p.isPage || !!p.isCategoryNode,
        isCategoryNode: !!p.isCategoryNode,
        projectId: p.id,
        sun: subcategory ? title : p.subcategory || title,
      }));
      if (isMobile && !subcategory) {
        projectNodes = [];
      }`;
content = content.replace(orbTarget, orbReplace);

fs.writeFileSync('src/main.jsx', content);
