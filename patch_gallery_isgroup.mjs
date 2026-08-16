import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const titleGroupTarget = `<h3
                  className="text-center text-white/95 group-hover:text-cyan-400 uppercase font-serif font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider leading-tight px-3 sm:px-6 select-none transition-colors duration-300 relative z-10"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.title}
                </h3>`;

const titleGroupReplacement = `<h3
                  className={\`text-center uppercase font-serif font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider leading-tight px-3 sm:px-6 select-none transition-colors duration-300 relative z-10 \${isDesignMode ? "text-[#FFCC00] group-hover:text-[#FF0000]" : "text-white/95 group-hover:text-cyan-400"}\`}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.title}
                </h3>`;

content = content.replace(titleGroupTarget, titleGroupReplacement);

// Let's also fix the svg colors for category hover rings if in design mode:
const svgTarget = `                        <circle
                          cx="50"
                          cy="50"
                          r="49"
                          fill="none"
                          stroke="rgba(34, 211, 238, 0.8)"
                          strokeWidth="1"
                          strokeDasharray="30 400"
                          strokeLinecap="round"
                        />`;

const svgReplacement = `                        <circle
                          cx="50"
                          cy="50"
                          r="49"
                          fill="none"
                          stroke={isDesignMode ? "rgba(255, 0, 0, 0.8)" : "rgba(34, 211, 238, 0.8)"}
                          strokeWidth={isDesignMode ? "3" : "1"}
                          strokeDasharray="30 400"
                          strokeLinecap="round"
                        />`;
content = content.replace(svgTarget, svgReplacement);

fs.writeFileSync('src/main.jsx', content);
