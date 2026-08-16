import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetForce = `      <ForceGraph3D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeLabel={() => ""}
        onNodeClick={(node) => {
          if (
            node.isNavLink ||
            node.isProject ||
            node.isPage ||
            node.isCategoryNode
          ) {
            setTimeout(() => {
              onNodeClick(node);
            }, 0);
          }
        }}
        nodeThreeObject={(node) => {`;

const replaceForce = `      <ForceGraph3D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeLabel={React.useCallback(() => "", [])}
        onNodeClick={React.useCallback((node) => {
          if (
            node.isNavLink ||
            node.isProject ||
            node.isPage ||
            node.isCategoryNode
          ) {
            setTimeout(() => {
              onNodeClick(node);
            }, 0);
          }
        }, [onNodeClick])}
        nodeThreeObject={(node) => {`;

content = content.replace(targetForce, replaceForce);
fs.writeFileSync('/app/applet/src/main.jsx', content);
