import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

// 1. Remove InteractiveGridBackground logic to just return null
const gridTarget = `const InteractiveGridBackground = ({ theme = "dark" }) => {
  const [centerPos, setCenterPos] = React.useState({ x: -9999, y: -9999 });`;
const gridReplace = `const InteractiveGridBackground = ({ theme = "dark" }) => {
  return null;
  const [centerPos, setCenterPos] = React.useState({ x: -9999, y: -9999 });`;
content = content.replace(gridTarget, gridReplace);

// 2. Fix the instructions overlap. It appears inside App render logic.
const instructionsTarget = `className="fixed top-14 left-1/2 -translate-x-1/2 md:bottom-auto md:top-20 md:right-8 md:left-auto md:translate-x-0 p-2 sm:p-3 bg-black/40 backdrop-blur-md rounded-xl md:rounded-lg border border-white/10 text-white/70 text-[9px] sm:text-[10px] md:text-xs font-mono tracking-wider pointer-events-none opacity-70 animate-pulse text-center whitespace-pre-line z-50 min-w-max"`;
const instructionsReplace = `className="fixed bottom-24 left-1/2 -translate-x-1/2 p-2 sm:p-3 bg-black/40 backdrop-blur-md rounded-xl md:rounded-lg border border-white/10 text-white/70 text-[9px] sm:text-[10px] md:text-xs font-mono tracking-wider pointer-events-none opacity-70 animate-pulse text-center whitespace-pre-line z-50 min-w-max"`;
content = content.replace(instructionsTarget, instructionsReplace);

fs.writeFileSync('/app/applet/src/main.jsx', content);
