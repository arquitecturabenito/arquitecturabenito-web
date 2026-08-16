import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetClick = `  const handleNodeClick = React.useCallback(
    (node) => {
      if (view.page === "home") {
        setZoomTarget(node.projectId || node.id);
        setTimeout(() => {`;

const replaceClick = `  const handleNodeClick = React.useCallback(
    (node) => {
      if (view.page === "home") {
        setZoomTarget(node.projectId || node.id);
        setHighlightNodeId(node.projectId || node.id);
        setTimeout(() => {`;

content = content.replace(targetClick, replaceClick);

const targetTimeout = `          }
          setZoomTarget(null);
        }, 3200);
        return;
      }`;

const replaceTimeout = `          }
          setZoomTarget(null);
          setHighlightNodeId(null);
        }, 3200);
        return;
      }`;

content = content.replace(targetTimeout, replaceTimeout);

fs.writeFileSync('/app/applet/src/main.jsx', content);
