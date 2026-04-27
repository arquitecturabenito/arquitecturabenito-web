const fs = require('fs');

const missingCode = `
            .force('link', d3.forceLink(linksData).id(d => d.id).distance(d => {
              if (isMobile) return d.value === 1 ? 200 : (d.value === 5 ? 80 : 120);
              return d.value === 1 ? 300 : (d.value === 5 ? 120 : 180);
            }))
            .force('charge', d3.forceManyBody().strength(d => d.isCentral ? -1000 : (isMobile ? -200 : -400)))
            .force('center', d3.forceCenter(0, 0));
          
          simulationRef.current = simulation;
          simulation.alphaTarget(0.01); // Keep simulation active for continuous orbit

          svg.append('circle').attr('cx', 0).attr('cy', 0).attr('r', Math.min(width, height) / 2 - 40).attr('stroke', 'rgba(255, 255, 255, 0.1)').attr('stroke-width', 1).attr('fill', 'none');

          const link1 = svg.append('g').attr('stroke', '#666').attr('stroke-opacity', 0).selectAll('line').data(linksData).join('line').attr('class', 'animated-link').attr('stroke-width', d => d.value === 5 ? 0.5 : Math.sqrt(d.value));
          link1.transition().duration(1000).delay(500).attr('stroke-opacity', 0.6);

          const node1 = svg.append('g').selectAll('g').data(visibleNodes).join('g')
            .style('cursor', d => d.isNavLink ? 'pointer' : 'default')
            .on('click', (event, d) => {
                if (!d.isNavLink) return;
                event.preventDefault();
                event.stopPropagation();
                onNodeClick(d);
            })
            .call(d3.drag()
                .on('start', (event, d) => { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
                .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
                .on('end', (event, d) => { if (!event.active) simulation.alphaTarget(0.01); d.fx = null; d.fy = null; }));

          const getNodeColor = (d) => d.isNavLink && !d.isProject ? '#fff' : (d.isProject ? '#aaa' : '#777');

          node1.on('mouseover', function(event, d) {
            if (d.isNavLink) {
              d3.select(this).select('text').transition().duration(200).attr('fill', '#00ffff');
              d3.select(this).select('circle').transition().duration(200).attr('fill', '#00ffff').attr('r', d.isNavLink && !d.isProject ? 10 : (d.isProject ? 7 : 8));
            }
          }).on('mouseout', function(event, d) {
            if (d.isNavLink) {
              d3.select(this).select('text').transition().duration(200).attr('fill', d.isProject ? '#aaa' : '#fff');
              d3.select(this).select('circle').transition().duration(200).attr('fill', getNodeColor(d)).attr('r', d.isNavLink && !d.isProject ? 8 : (d.isProject ? 5 : 6));
            }
          });

          node1.append('circle').attr('r', d => d.isNavLink && !d.isProject ? 8 : (d.isProject ? 5 : 6)).attr('fill', getNodeColor).attr('stroke', '#000').attr('stroke-width', 2);
          
          node1.append('text').text(d => d.id)
            .attr('x', 12)
            .attr('y', 4)
            .attr('fill', d => d.isProject ? '#aaa' : '#fff')
            .style('font-size', isMobile ? '0.8rem' : '0.9rem')
            .style('text-transform', 'uppercase')
            .style('letter-spacing', '0.05em')
            .style('font-weight', d => d.isProject ? 'normal' : 'bold')
            .style('opacity', d => d.isProject ? 0.7 : 1);

          simulation.on('tick', () => {
            const margin = isMobile ? 10 : 20;
            const leftBound = -width / 2 + margin;
            const rightBound = width / 2 - margin;
            const topBound = -height / 2 + margin;
            const bottomBound = height / 2 - margin;
            
            node1.each(d => {
                d.x = Math.max(leftBound, Math.min(rightBound, d.x));
                d.y = Math.max(topBound, Math.min(bottomBound, d.y));
            });

            link1.attr('x1', d => d.source.x || 0).attr('y1', d => d.source.y || 0).attr('x2', d => d.target.x || 0).attr('y2', d => d.target.y || 0);
            node1.attr('transform', d => \`translate(\${d.x || 0}, \${d.y || 0})\`);
          });

          return () => simulation.stop();
        }, [filter, disruptSignal, onNodeClick]);

        return (
            <div className="w-full h-full relative">
                <svg ref={svgRef} className="w-full h-full bg-transparent relative z-10" />
            </div>
        );
      };
      
      const OrbitalPage = ({ category, subcategory, title, onProjectSelect, onSubcategorySelect, onProjectHover = () => {}, showEye = false, mousePosition }) => {
        const svgRef = React.useRef(null);
        const [tooltip, setTooltip] = React.useState({ visible: false, content: '', x: 0, y: 0 });

        const onProjectHoverRef = React.useRef(onProjectHover);
        React.useEffect(() => {
            onProjectHoverRef.current = onProjectHover;
        }, [onProjectHover]);

        const simulationCallback = React.useCallback((category, subcategory, title, onProjectSelect, onSubcategorySelect) => {
            if (!svgRef.current) return;
            
            let projects = allProjectsData.filter(p => p.category === category);
            if (subcategory) {
                projects = projects.filter(p => p.subcategory === subcategory);
            }
            
            const isMobile = window.innerWidth < 768;
            const width = window.innerWidth;
            const height = window.innerHeight;

            const baseNodes = [
                { id: title, isSun: true, fx: 0, fy: 0 }
            ];

            const subcategories = subcategory ? [] : [...new Set(projects.map(p => p.subcategory).filter(Boolean))];
            const subcategoryNodes = subcategories.map(sub => ({ id: sub, isSubSun: true, sun: title }));

            const projectNodes = projects.map(p => ({ 
                id: p.title, 
                isProject: true, 
                isPage: !!p.isPage || !!p.isCategoryNode, 
                isCategoryNode: !!p.isCategoryNode,
                projectId: p.id, 
                sun: subcategory ? title : (p.subcategory || title) 
            }));
            
            projectNodes.forEach(node => {
                node.x = 0;
                node.y = 0;
            });
            subcategoryNodes.forEach(node => {
                node.x = 0;
                node.y = 0;
            });
            
            const nodesData = [...baseNodes, ...subcategoryNodes, ...projectNodes];
            const linksData = [
                ...subcategoryNodes.map(sub => ({ source: title, target: sub.id })),
                ...projectNodes.map(p => ({ source: p.sun, target: p.id }))
            ];

            const svg = d3.select(svgRef.current)
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', [-width / 2, -height / 2, width, height]);
            svg.selectAll("*").remove(); 

            const simulation = d3.forceSimulation(nodesData)
                .force('link', d3.forceLink(linksData).id(d => d.id).distance(d => {
                    if (d.target.isSubSun || d.target.isPage || d.target.isCategoryNode) return isMobile ? 220 : 320;
                    return isMobile ? 120 : 150;
                }).strength(0.5))
                .force('charge', d3.forceManyBody().strength(d => {
                    if (d.isSun) return isMobile ? -2500 : -3500;
                    if (d.isSubSun || d.isPage || d.isCategoryNode) return isMobile ? -1000 : -1500;
                    return isMobile ? -300 : -300;
                }))`;

let code = fs.readFileSync('index.html', 'utf8');

const regex = /\.force\('link', d3\.forceLink\(linksData\)\.id\(d => d\.id\)\.distance\(d => \{\s*if \(d\.target\.isSubSun \|\| d\.target\.isPage \|\| d\.target\.isCategoryNode\) return isMobile \? 220 : 320;\s*return isMobile \? 120 : 150;\s*\}\)\.strength\(0\.5\)\)\s*\.force\('charge', d3\.forceManyBody\(\)\.strength\(d => \{\s*if \(d\.isSun\) return isMobile \? -2500 : -3500;\s*if \(d\.isSubSun \|\| d\.isPage \|\| d\.isCategoryNode\) return isMobile \? -1000 : -1500;\s*return isMobile \? -300 : -300;\s*\}\)\)/m;

if (code.match(regex)) {
    code = code.replace(regex, missingCode.trim());
    fs.writeFileSync('index.html', code);
    console.log("Restored properly!");
} else {
    console.log("Regex didn't match.");
}
