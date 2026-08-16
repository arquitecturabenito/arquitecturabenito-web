import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetDelay = `            // Zoom in
            svg.transition().duration(3200).ease(d3.easeCubicInOut)
               .attr("viewBox", [d.x - width/8, d.y - height/8, width/4, height/4]);

            // Delay navigation
            setTimeout(() => {
              if (d.isPage) {
                onProjectSelect(d.projectId, true);
              } else {
                onProjectSelect(d.projectId, false);
              }
            }, 3200);`;

const replaceDelay = `            // Disable pointer events during transition to prevent mouseout from resetting styles
            svg.style("pointer-events", "none");

            // Zoom in
            svg.transition().duration(3200).ease(window.d3 ? window.d3.easeCubicInOut : d3.easeCubicInOut)
               .attr("viewBox", \`\${d.x - width/8} \${d.y - height/8} \${width/4} \${height/4}\`);

            // Delay navigation
            setTimeout(() => {
              svg.style("pointer-events", "auto");
              if (d.isPage) {
                onProjectSelect(d.projectId, true);
              } else {
                onProjectSelect(d.projectId, false);
              }
            }, 3200);`;

content = content.replace(targetDelay, replaceDelay);
fs.writeFileSync('/app/applet/src/main.jsx', content);
