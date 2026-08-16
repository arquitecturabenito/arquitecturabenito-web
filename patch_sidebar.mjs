import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const sidebarCode = `
const ConstellationSidebars = ({ currentFilter, onProjectSelect }) => {
  // Only display on desktop
  const validProjects = window.allProjectsData.filter(
    (p) => !p.isCategoryNode && p.id !== "CENTRAL_HUB" && !p.isPage
  );

  let displayedProjects = validProjects;
  if (currentFilter !== "all" && currentFilter !== "home") {
    displayedProjects = validProjects.filter((p) => {
      if (currentFilter === "escenografias") return p.category === "scenography";
      return p.category === currentFilter;
    });
  }

  // Split into left and right
  const mid = Math.ceil(displayedProjects.length / 2);
  const leftProjects = displayedProjects.slice(0, mid);
  const rightProjects = displayedProjects.slice(mid);

  return (
    <div className="hidden lg:block pointer-events-none">
      {/* Top Right Brand */}
      <div className="fixed top-8 right-8 z-30 text-right">
        <h1 className="text-2xl xl:text-3xl font-mono text-white tracking-widest uppercase" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          Benito G.<br/>Quiñones
        </h1>
        <p className="text-xs xl:text-sm text-gray-400 font-mono tracking-[0.2em] uppercase mt-2">
          Portfolio
        </p>
      </div>

      {/* Left Sidebar */}
      <div className="fixed top-1/2 -translate-y-1/2 left-8 z-20 flex flex-col gap-3 xl:gap-4 h-[70vh] overflow-y-auto hide-scrollbar w-48 xl:w-56" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
        <div className="py-10 flex flex-col gap-3 xl:gap-4">
          {leftProjects.map(p => (
            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}
              className="text-left text-[10px] xl:text-xs text-gray-500 font-mono uppercase tracking-widest hover:text-cyan-400 transition-colors pointer-events-auto"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="fixed top-1/2 -translate-y-1/2 right-8 z-20 flex flex-col gap-3 xl:gap-4 h-[70vh] overflow-y-auto hide-scrollbar w-48 xl:w-56" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
        <div className="py-10 flex flex-col gap-3 xl:gap-4 text-right">
          {rightProjects.map(p => (
            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}
              className="text-right text-[10px] xl:text-xs text-gray-500 font-mono uppercase tracking-widest hover:text-cyan-400 transition-colors pointer-events-auto w-full"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
`;

const appTarget = `const App = () => {`;
content = content.replace(appTarget, sidebarCode + '\n' + appTarget);

fs.writeFileSync('src/main.jsx', content);
