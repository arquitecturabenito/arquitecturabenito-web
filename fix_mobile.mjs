import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

// Fix toggle buttons on mobile to not overflow
const toggleTarget = `            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-gray-700/50 shadow-2xl">
              <button
                onClick={() => !isNavigatingMode && isGalleryMode && toggleGalleryMode()}
                className={\`px-4 sm:px-6 py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 \${!isGalleryMode ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-400/30 shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-gray-500 hover:text-gray-300'} \${isNavigatingMode ? 'opacity-50 cursor-not-allowed' : ''}\`}
              >
                Constelación
              </button>
              <button
                onClick={() => !isNavigatingMode && !isGalleryMode && toggleGalleryMode()}
                className={\`px-4 sm:px-6 py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 \${isGalleryMode ? 'bg-gray-800 text-white border border-gray-600 shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-gray-300'} \${isNavigatingMode ? 'opacity-50 cursor-not-allowed' : ''}\`}
              >`;

const toggleReplace = `            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-1 sm:gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-gray-700/50 shadow-2xl w-[90vw] sm:w-auto max-w-[340px] justify-between">
              <button
                onClick={() => !isNavigatingMode && isGalleryMode && toggleGalleryMode()}
                className={\`flex-1 sm:flex-none px-2 sm:px-6 py-1.5 rounded-full text-[9px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 \${!isGalleryMode ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-400/30 shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-gray-500 hover:text-gray-300'} \${isNavigatingMode ? 'opacity-50 cursor-not-allowed' : ''}\`}
              >
                Constelación
              </button>
              <button
                onClick={() => !isNavigatingMode && !isGalleryMode && toggleGalleryMode()}
                className={\`flex-1 sm:flex-none px-2 sm:px-6 py-1.5 rounded-full text-[9px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 \${isGalleryMode ? 'bg-gray-800 text-white border border-gray-600 shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-gray-300'} \${isNavigatingMode ? 'opacity-50 cursor-not-allowed' : ''}\`}
              >`;

content = content.replace(toggleTarget, toggleReplace);

// Fix OrbitalText size for mobile so it fits
const orbitalTextTarget = `          .attr("fill", category === "design" ? "#ff0000" : "#fff")
          .style("font-size", isMobile ? "1.8rem" : "2.5rem")`;
          
const orbitalTextReplace = `          .attr("fill", category === "design" ? "#ff0000" : "#fff")
          .style("font-size", isMobile ? (d.id === "ESCENOGRAFÍAS" ? "1.3rem" : "1.8rem") : "2.5rem")`;

content = content.replace(orbitalTextTarget, orbitalTextReplace);

// Fix top bar padding on mobile so it doesn't clip
const topBarTarget = `      {/* Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-20 flex space-x-2 bg-black/50 backdrop-blur-sm p-2 overflow-x-auto hide-scrollbar items-start">`;

const topBarReplace = `      {/* Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-20 flex space-x-2 bg-black/50 backdrop-blur-sm p-2 px-4 overflow-x-auto hide-scrollbar items-start">`;

content = content.replace(topBarTarget, topBarReplace);

// Fix info text so it doesn't overlap on mobile
const infoTextTarget = `                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 md:bottom-auto md:top-20 md:right-8 md:left-auto md:translate-x-0 p-3 bg-black/40 backdrop-blur-md rounded-xl md:rounded-lg border border-white/10 text-white/70 text-[10px] md:text-xs font-mono tracking-wider pointer-events-none opacity-70 animate-pulse text-center whitespace-pre-line z-50">`;

const infoTextReplace = `                <div className="fixed top-14 left-1/2 -translate-x-1/2 md:bottom-auto md:top-20 md:right-8 md:left-auto md:translate-x-0 p-2 sm:p-3 bg-black/40 backdrop-blur-md rounded-xl md:rounded-lg border border-white/10 text-white/70 text-[9px] sm:text-[10px] md:text-xs font-mono tracking-wider pointer-events-none opacity-70 animate-pulse text-center whitespace-pre-line z-50 min-w-max">`;

content = content.replace(infoTextTarget, infoTextReplace);

fs.writeFileSync('src/main.jsx', content);
