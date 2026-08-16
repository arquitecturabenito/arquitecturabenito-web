import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetLeft = `{leftProjects.map(p => (
            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}
              className="text-left text-[10px] xl:text-xs text-gray-500 font-mono uppercase tracking-widest hover:text-cyan-400 transition-colors pointer-events-auto"
            >
              {p.title}
            </button>
          ))}`;

const replaceLeft = `{leftProjects.map(p => (
            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}
              onMouseEnter={() => onProjectHover && onProjectHover(p.id)}
              onMouseLeave={() => onProjectHover && onProjectHover(null)}
              className="text-left text-[10px] xl:text-xs text-gray-500 font-mono uppercase tracking-widest hover:text-cyan-400 transition-colors pointer-events-auto"
            >
              {p.title}
            </button>
          ))}`;
          
const targetRight = `{rightProjects.map(p => (
            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}
              className="text-right text-[10px] xl:text-xs text-gray-500 font-mono uppercase tracking-widest hover:text-cyan-400 transition-colors pointer-events-auto w-full"
            >
              {p.title}
            </button>
          ))}`;

const replaceRight = `{rightProjects.map(p => (
            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}
              onMouseEnter={() => onProjectHover && onProjectHover(p.id)}
              onMouseLeave={() => onProjectHover && onProjectHover(null)}
              className="text-right text-[10px] xl:text-xs text-gray-500 font-mono uppercase tracking-widest hover:text-cyan-400 transition-colors pointer-events-auto w-full"
            >
              {p.title}
            </button>
          ))}`;

content = content.replace(targetLeft, replaceLeft);
content = content.replace(targetRight, replaceRight);

fs.writeFileSync('/app/applet/src/main.jsx', content);
