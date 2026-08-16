import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const desktopTarget = `<div className="hidden md:flex fixed top-4 left-4 z-20 space-x-2 bg-black/30 backdrop-blur-sm p-1 rounded-full items-start">`;
const desktopReplace = `<div className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-20 space-x-2 bg-black/30 backdrop-blur-sm p-1.5 rounded-full items-center justify-center border border-white/10 shadow-lg">`;
content = content.replace(desktopTarget, desktopReplace);

const mobileTarget = `<div className="md:hidden fixed top-0 left-0 w-full z-20 flex space-x-2 bg-black/50 backdrop-blur-sm p-2 px-4 overflow-x-auto hide-scrollbar items-start">`;
const mobileReplace = `<div className="md:hidden fixed top-0 left-0 w-full z-20 flex justify-center bg-black/50 backdrop-blur-sm p-2 px-2 overflow-x-auto hide-scrollbar border-b border-white/10">
        <div className="flex space-x-2 items-center mx-auto w-max px-2">`;
content = content.replace(mobileTarget, mobileReplace);

// We need to close the extra div we just added for mobile
const mobileCloseTarget = `            {currentFilter === filter.key && currentSubcategory && (
              <div className="absolute top-[105%] mt-1 flex justify-center w-full pointer-events-none">
                <span
                  className="text-gray-300 font-mono text-[8.5px] uppercase tracking-widest px-2 py-0.5 whitespace-nowrap"
                  style={{
                    border: "1px dashed rgba(255, 255, 255, 0.4)",
                    borderRadius: "100px",
                  }}
                >
                  {currentSubcategory}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>`;
const mobileCloseReplace = `            {currentFilter === filter.key && currentSubcategory && (
              <div className="absolute top-[105%] mt-1 flex justify-center w-full pointer-events-none">
                <span
                  className="text-gray-300 font-mono text-[8.5px] uppercase tracking-widest px-2 py-0.5 whitespace-nowrap"
                  style={{
                    border: "1px dashed rgba(255, 255, 255, 0.4)",
                    borderRadius: "100px",
                  }}
                >
                  {currentSubcategory}
                </span>
              </div>
            )}
          </div>
        ))}
        </div>
      </div>`;
content = content.replace(mobileCloseTarget, mobileCloseReplace);

fs.writeFileSync('src/main.jsx', content);
