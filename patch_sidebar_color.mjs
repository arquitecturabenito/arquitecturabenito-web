import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetSidebar1 = `              className="text-left text-[10px] xl:text-xs text-gray-500 font-mono uppercase tracking-widest hover:text-cyan-400 transition-colors pointer-events-auto"`;
const replaceSidebar1 = `              className={\`text-left text-[10px] xl:text-xs \${currentFilter === 'design' ? 'text-[#ffcc00] hover:text-[#ff0000]' : 'text-gray-500 hover:text-cyan-400'} font-mono uppercase tracking-widest transition-colors pointer-events-auto\`}`;

content = content.replace(targetSidebar1, replaceSidebar1);

const targetSidebar2 = `              className="text-right text-[10px] xl:text-xs text-gray-500 font-mono uppercase tracking-widest hover:text-cyan-400 transition-colors pointer-events-auto w-full"`;
const replaceSidebar2 = `              className={\`text-right text-[10px] xl:text-xs \${currentFilter === 'design' ? 'text-[#ffcc00] hover:text-[#ff0000]' : 'text-gray-500 hover:text-cyan-400'} font-mono uppercase tracking-widest transition-colors pointer-events-auto w-full\`}`;

content = content.replace(targetSidebar2, replaceSidebar2);
fs.writeFileSync('/app/applet/src/main.jsx', content);
