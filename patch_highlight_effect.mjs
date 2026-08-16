import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetState = `  const [isLoaded, setIsLoaded] = React.useState(true);
  const eyeRef = React.useRef(null);`;

const replaceState = `  const [isLoaded, setIsLoaded] = React.useState(true);
  const eyeRef = React.useRef(null);
  const [highlightLinks, setHighlightLinks] = React.useState(new Set());
  const [highlightNodes, setHighlightNodes] = React.useState(new Set());

  React.useEffect(() => {
    const newHighlightNodes = new Set();
    const newHighlightLinks = new Set();

    if (highlightNodeId) {
      const targetNode = graphData.nodes.find(n => n.id === highlightNodeId || n.projectId === highlightNodeId);
      if (targetNode) {
        newHighlightNodes.add(targetNode);
        
        let current = targetNode;
        while(current && current.id !== "CENTRAL_HUB") {
          const link = graphData.links.find(l => 
            (typeof l.target === 'object' ? l.target.id === current.id : l.target === current.id)
          );
          if (link) {
            newHighlightLinks.add(link);
            const source = typeof link.source === 'object' ? link.source : graphData.nodes.find(n => n.id === link.source);
            if (source) {
              newHighlightNodes.add(source);
              current = source;
            } else {
              break;
            }
          } else {
            break;
          }
        }
      }
    }
    
    setHighlightNodes(newHighlightNodes);
    setHighlightLinks(newHighlightLinks);

    // Direct THREE object updates
    graphData.nodes.forEach(node => {
      if (node.__nodeMat && node.__sprite && node.__mesh) {
        const isHighlighted = newHighlightNodes.has(node);
        if (isHighlighted) {
          node.__nodeMat.color.setHex(0x00ffff);
          node.__nodeMat.opacity = 0.9;
          node.__sprite.color = "#00ffff";
          node.__sprite.textHeight = node.__baseTextHeight * 1.5;
          node.__mesh.scale.set(1.5, 1.5, 1.5);
          node.__sprite.position.y = (node.__baseRadius * 1.5) + 2;
        } else {
          node.__nodeMat.color.set(node.__baseColor);
          node.__nodeMat.opacity = 0.5;
          node.__sprite.color = node.__baseTextColor;
          node.__sprite.textHeight = node.__baseTextHeight;
          node.__mesh.scale.set(1, 1, 1);
          node.__sprite.position.y = node.__baseRadius + 2;
        }
      }
    });
    
  }, [highlightNodeId, graphData]);`;

content = content.replace(targetState, replaceState);

// Now update linkColor and linkWidth and add directional particles
const linkColorTarget = `        linkWidth={(d) => (d.value === 1 ? 2.5 : d.value === 2 ? 1.5 : 0.8)}
        linkColor={(link) => {
          if (filter === "design") {
            return "rgba(255,0,0,0.7)";
          }
          return link.value > 2 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)";
        }}`;

const linkColorReplace = `        linkWidth={(link) => highlightLinks.has(link) ? 3 : (link.value === 1 ? 2.5 : link.value === 2 ? 1.5 : 0.8)}
        linkColor={(link) => {
          if (highlightLinks.has(link)) return "rgba(0,255,255,1)";
          if (filter === "design") {
            return "rgba(255,0,0,0.7)";
          }
          return link.value > 2 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)";
        }}
        linkDirectionalParticles={(link) => highlightLinks.has(link) ? 4 : 0}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.01}`;

content = content.replace(linkColorTarget, linkColorReplace);

fs.writeFileSync('/app/applet/src/main.jsx', content);
