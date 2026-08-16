import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetEffect = `  React.useEffect(() => {
    if (!svgRef.current || !window.d3) return;
    const svg = window.d3.select(svgRef.current);
    const isDesign = category === "design";
    const isMobile = window.innerWidth < 768;

    let pathNodeIds = new Set();
    if (highlightNodeId) {
      let targetNode = null;
      svg.selectAll("g").each(function(d) {
        if (d && d.projectId === highlightNodeId) targetNode = d;
      });
      if (targetNode) {
        pathNodeIds.add(targetNode.id);
        if (targetNode.sun) pathNodeIds.add(targetNode.sun);
        pathNodeIds.add(title);
      }
    }

    svg.selectAll(".animated-link").each(function(d) {
      if (!d || !d.source || !d.target) return;
      const isHighlighted = pathNodeIds.has(d.source.id) && pathNodeIds.has(d.target.id);
      window.d3.select(this)
        .transition().duration(200)
        .attr("stroke", isHighlighted ? "#00ffff" : (isDesign ? "rgba(255,0,0,0.7)" : "#fff"))
        .attr("stroke-width", isHighlighted ? 3 : (d.target.isSubSun ? 3 : 1.5))
        .attr("stroke-opacity", isHighlighted ? 1 : (d.target.isSubSun ? 1 : 0.7));
    });

    svg.selectAll("g").each(function(d) {
      if (!d) return;
      const isHighlighted = pathNodeIds.has(d.id) && d.isProject;
      if (d.isProject && !d.isPage) {
        window.d3.select(this).select("circle").transition().duration(200)
          .attr("fill", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#999"))
          .attr("stroke", isHighlighted ? "#00ffff" : (isDesign ? "#ff0000" : "#fff"))
          .attr("r", isHighlighted ? (isMobile ? 7 : 5) : (isMobile ? 3 : 2));
        window.d3.select(this).select("text").transition().duration(200)
          .attr("fill", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#aaa"))
          .style("font-size", isHighlighted ? (isMobile ? "0.8rem" : "0.85rem") : (isMobile ? "0.6rem" : "0.65rem"));
      }
      if (d.isProject && d.isPage) {
        window.d3.select(this).select("text").transition().duration(200)
          .attr("fill", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#fff"));
        window.d3.select(this).select("circle").transition().duration(200)
          .attr("stroke", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#fff"));
      }
    });
  }, [highlightNodeId, category, title]);`;

const replaceEffect = `  React.useEffect(() => {
    if (!svgRef.current || !d3) return;
    const svg = d3.select(svgRef.current);
    const isDesign = category === "design";
    const isMobile = window.innerWidth < 768;

    let pathNodeIds = new Set();
    if (highlightNodeId) {
      let targetNode = null;
      svg.selectAll("g").each(function(d) {
        if (d && d.projectId === highlightNodeId) targetNode = d;
      });
      if (targetNode) {
        pathNodeIds.add(targetNode.id);
        if (targetNode.sun) pathNodeIds.add(targetNode.sun);
        pathNodeIds.add(title);
      }
    }

    svg.selectAll(".animated-link").each(function(d) {
      if (!d || !d.source || !d.target) return;
      const isHighlighted = pathNodeIds.has(d.source.id) && pathNodeIds.has(d.target.id);
      d3.select(this)
        .transition().duration(200)
        .attr("stroke", isHighlighted ? "#00ffff" : (isDesign ? "rgba(255,0,0,0.7)" : "#fff"))
        .attr("stroke-width", isHighlighted ? 3 : (d.target.isSubSun ? 3 : 1.5))
        .attr("stroke-opacity", isHighlighted ? 1 : (d.target.isSubSun ? 1 : 0.7));
    });

    svg.selectAll("g").each(function(d) {
      if (!d) return;
      const isHighlighted = pathNodeIds.has(d.id) && d.isProject;
      if (d.isProject && !d.isPage) {
        d3.select(this).select("circle").transition().duration(200)
          .attr("fill", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#999"))
          .attr("stroke", isHighlighted ? "#00ffff" : (isDesign ? "#ff0000" : "#fff"))
          .attr("r", isHighlighted ? (isMobile ? 7 : 5) : (isMobile ? 3 : 2));
        d3.select(this).select("text").transition().duration(200)
          .attr("fill", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#aaa"))
          .style("font-size", isHighlighted ? (isMobile ? "0.8rem" : "0.85rem") : (isMobile ? "0.6rem" : "0.65rem"));
      }
      if (d.isProject && d.isPage) {
        d3.select(this).select("text").transition().duration(200)
          .attr("fill", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#fff"));
        d3.select(this).select("circle").transition().duration(200)
          .attr("stroke", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#fff"));
      }
    });
  }, [highlightNodeId, category, title]);`;

content = content.replace(targetEffect, replaceEffect);
fs.writeFileSync('/app/applet/src/main.jsx', content);
