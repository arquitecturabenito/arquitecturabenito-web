import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetArgs = `const NetworkGraph = ({ onNodeClick, filter, disruptSignal, zoomTarget }) => {`;
const replaceArgs = `const NetworkGraph = ({ onNodeClick, filter, disruptSignal, zoomTarget, highlightNodeId }) => {`;

content = content.replace(targetArgs, replaceArgs);

fs.writeFileSync('/app/applet/src/main.jsx', content);
