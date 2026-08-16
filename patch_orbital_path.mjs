import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetPath = `      d3.select(this)
        .transition().duration(200)
        .attr("stroke", isHighlighted ? "#00ffff" : (isDesign ? "rgba(255,0,0,0.7)" : "#fff"))
        .attr("stroke-width", isHighlighted ? 3 : (d.target.isSubSun ? 3 : 1.5))
        .attr("stroke-opacity", isHighlighted ? 1 : (d.target.isSubSun ? 1 : 0.7));`;

const replacePath = `      d3.select(this)
        .transition().duration(200)
        .attr("stroke", isHighlighted ? (isDesign ? "#ffcc00" : "#00ffff") : (isDesign ? "rgba(255,0,0,0.7)" : "#fff"))
        .attr("stroke-width", isHighlighted ? 3 : (d.target.isSubSun ? 3 : 1.5))
        .attr("stroke-opacity", isHighlighted ? 1 : (d.target.isSubSun ? 1 : 0.7));`;

content = content.replace(targetPath, replacePath);
fs.writeFileSync('/app/applet/src/main.jsx', content);
