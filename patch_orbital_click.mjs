import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetClick = `.on("click", (event, d) => {
          if (d.isProject) {
            if (d.isPage) {
              onProjectSelect(d.projectId, true);
            } else {
              onProjectSelect(d.projectId, false);
            }
          } else if (d.isSubSun && onSubcategorySelect) {
            onSubcategorySelect(d.id);
          }
        });`;

const replaceClick = `.on("click", (event, d) => {
          if (d.isProject) {
            // Illuminate path
            let pathNodeIds = new Set();
            pathNodeIds.add(d.id);
            if (d.sun) pathNodeIds.add(d.sun);
            pathNodeIds.add(title);
            
            const isDesign = category === "design";
            
            svg.selectAll(".animated-link").each(function(linkD) {
              if (!linkD || !linkD.source || !linkD.target) return;
              const isHighlighted = pathNodeIds.has(linkD.source.id) && pathNodeIds.has(linkD.target.id);
              if (isHighlighted) {
                d3.select(this)
                  .transition().duration(200)
                  .attr("stroke", "#00ffff")
                  .attr("stroke-width", 3)
                  .attr("stroke-opacity", 1);
              }
            });

            svg.selectAll("g").each(function(nodeD) {
              if (!nodeD) return;
              const isHighlighted = pathNodeIds.has(nodeD.id) && nodeD.isProject;
              if (isHighlighted && nodeD.isProject && !nodeD.isPage) {
                d3.select(this).select("circle").transition().duration(200)
                  .attr("fill", "#00ffff")
                  .attr("stroke", "#00ffff")
                  .attr("r", isMobile ? 7 : 5);
                d3.select(this).select("text").transition().duration(200)
                  .attr("fill", "#00ffff")
                  .style("font-size", isMobile ? "0.8rem" : "0.85rem");
              } else if (isHighlighted && nodeD.isProject && nodeD.isPage) {
                d3.select(this).select("circle").transition().duration(200).attr("stroke", "#00ffff");
                d3.select(this).select("text").transition().duration(200).attr("fill", "#00ffff");
              }
            });

            // Zoom in
            svg.transition().duration(3200).ease(d3.easeCubicInOut)
               .attr("viewBox", [d.x - width/8, d.y - height/8, width/4, height/4]);

            // Delay navigation
            setTimeout(() => {
              if (d.isPage) {
                onProjectSelect(d.projectId, true);
              } else {
                onProjectSelect(d.projectId, false);
              }
            }, 3200);

          } else if (d.isSubSun && onSubcategorySelect) {
            onSubcategorySelect(d.id);
          }
        });`;

content = content.replace(targetClick, replaceClick);
fs.writeFileSync('/app/applet/src/main.jsx', content);
