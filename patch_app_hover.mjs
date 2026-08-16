import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetState = `  const [isGalleryMode, setIsGalleryMode] = React.useState(false);
  const [isNavigatingMode, setIsNavigatingMode] = React.useState(false);`;

const replaceState = `  const [isGalleryMode, setIsGalleryMode] = React.useState(false);
  const [isNavigatingMode, setIsNavigatingMode] = React.useState(false);
  const [highlightNodeId, setHighlightNodeId] = React.useState(null);`;

content = content.replace(targetState, replaceState);

const targetNetworkGraph = `<NetworkGraph
                  onNodeClick={handleNodeClick}
                  filter={filter}
                  disruptSignal={disruptSignal}
                  zoomTarget={zoomTarget}
                />`;

const replaceNetworkGraph = `<NetworkGraph
                  onNodeClick={handleNodeClick}
                  filter={filter}
                  disruptSignal={disruptSignal}
                  zoomTarget={zoomTarget}
                  highlightNodeId={highlightNodeId}
                />`;

content = content.replace(targetNetworkGraph, replaceNetworkGraph);

const targetSidebarApp = `<ConstellationSidebars 
            currentFilter={filter} 
            onProjectSelect={handleProjectSelect} 
          />`;

const replaceSidebarApp = `<ConstellationSidebars 
            currentFilter={filter} 
            onProjectSelect={handleProjectSelect} 
            onProjectHover={setHighlightNodeId}
          />`;

content = content.replace(targetSidebarApp, replaceSidebarApp);

fs.writeFileSync('/app/applet/src/main.jsx', content);
