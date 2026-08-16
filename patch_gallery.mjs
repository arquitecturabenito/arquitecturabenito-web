import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const targetStr = `        {items.map((item) => {
          if (item.isGroup) {
            const isMainCategory = item.type === "category";`;

const replacementStr = `        {items.map((item, index) => {
          const isDesignMode = filter === "design";
          const organicRadii = [
            "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
            "rounded-[30%_60%_70%_40%/50%_60%_30%_60%]",
            "rounded-[50%_50%_20%_80%/25%_80%_20%_75%]",
            "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]",
            "rounded-[20%_80%_30%_70%/50%_40%_60%_40%]"
          ];
          const randomRadius = organicRadii[index % organicRadii.length];
          const designBorder = index % 2 === 0 ? "border-[#FF0000]" : "border-[#FFCC00]";
          const designColorGroup = isDesignMode ? \`border-[3px] bg-black/40 \${randomRadius} \${designBorder}\` : "";
          
          if (item.isGroup) {
            const isMainCategory = item.type === "category";`;

content = content.replace(targetStr, replacementStr);

const shapeClassTarget = `            const shapeClass = isMainCategory
              ? "rounded-none border-2 sm:border-4 border-white/70 bg-white/5"
              : "rounded-full border border-white/10 bg-white/5";`;

const shapeClassReplacement = `            const shapeClass = isDesignMode 
              ? designColorGroup 
              : isMainCategory
              ? "rounded-none border-2 sm:border-4 border-white/70 bg-white/5"
              : "rounded-full border border-white/10 bg-white/5";`;

content = content.replace(shapeClassTarget, shapeClassReplacement);

const normalCardTarget = `            <div
              key={item.id}
              className="group relative border border-dashed border-gray-700 hover:border-white hover:bg-gray-900/50 p-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-square"
              onClick={() => onProjectSelect(item.id)}
            >`;

const normalCardReplacement = `            <div
              key={item.id}
              className={\`group relative cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-square \${isDesignMode ? "p-4 " + designColorGroup + " hover:bg-[#0000ff]/20" : "border border-dashed border-gray-700 hover:border-white hover:bg-gray-900/50 p-2"}\`}
              onClick={() => onProjectSelect(item.id)}
            >`;

content = content.replace(normalCardTarget, normalCardReplacement);

const imgContainerTarget = `              {item.normalImage && (
                <div className="absolute inset-2 sm:inset-3 overflow-hidden grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                  <img`;

const imgContainerReplacement = `              {item.normalImage && (
                <div className={\`absolute \${isDesignMode ? "inset-3 sm:inset-5 " + randomRadius : "inset-2 sm:inset-3"} overflow-hidden grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-500 pointer-events-none\`}>
                  <img`;
                  
content = content.replace(imgContainerTarget, imgContainerReplacement);

const titleTarget = `              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-black/70 backdrop-blur-sm pt-1 pb-1.5 z-10 border-t border-gray-800 pointer-events-none">
                <h3 className="text-center font-mono text-[9px] sm:text-xs tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors truncate px-1">`;
                
const titleReplacement = `              <div className={\`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-black/70 backdrop-blur-sm pt-1 pb-1.5 z-10 \${isDesignMode ? "border-none rounded-full" : "border-t border-gray-800"} pointer-events-none\`}>
                <h3 className={\`text-center font-mono text-[9px] sm:text-xs tracking-widest uppercase transition-colors truncate px-1 \${isDesignMode ? "text-[#FFCC00] group-hover:text-[#FF0000] font-bold" : "text-gray-300 group-hover:text-white"}\`}>`;
                
content = content.replace(titleTarget, titleReplacement);

const bgColorTarget = `    let bgColor = "#000"; // default dark
    if (view.page === "project") {`;
    
const bgColorReplacement = `    let bgColor = "#000"; // default dark
    if (view.page === "design" || filter === "design") {
      bgColor = "#0000ff"; // electric blue
    } else if (view.page === "project") {`;

content = content.replace(bgColorTarget, bgColorReplacement);

const effectDepTarget = `    };
  }, [view.page, view.projectId]);`;

const effectDepReplacement = `    };
  }, [view.page, view.projectId, filter]);`;

content = content.replace(effectDepTarget, effectDepReplacement);

const nodeColorTarget = `          if (
            node.isCategoryNode ||
            ["ARQUITECTURA", "DISEÑO", "ESCENOGRAFÍAS", "CONTACTO"].includes(
              node.id,
            )
          ) {
            color = 0x00ffff;
            textColor = "#00ffff";
            radius = 6;
            textHeight = 5;
          }`;
          
const nodeColorReplacement = `          if (
            node.isCategoryNode ||
            ["ARQUITECTURA", "DISEÑO", "ESCENOGRAFÍAS", "CONTACTO"].includes(
              node.id,
            )
          ) {
            color = 0x00ffff;
            textColor = "#00ffff";
            radius = 6;
            textHeight = 5;
            
            if (filter === "design" && node.id === "DISEÑO") {
              color = "#ff0000";
              textColor = "#ff0000";
              radius = 8;
            }
          } else if (filter === "design" && (node.isSubcategory || node.isProject)) {
             color = Math.random() > 0.5 ? "#ff0000" : "#ffcc00";
             textColor = color;
          }`;

content = content.replace(nodeColorTarget, nodeColorReplacement);

const linkColorTarget = `        linkColor={(link) =>
          link.value > 2 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)"
        }`;

const linkColorReplacement = `        linkColor={(link) => {
          if (filter === "design") {
            return "rgba(255,0,0,0.7)";
          }
          return link.value > 2 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)";
        }}`;

content = content.replace(linkColorTarget, linkColorReplacement);

fs.writeFileSync('src/main.jsx', content);
