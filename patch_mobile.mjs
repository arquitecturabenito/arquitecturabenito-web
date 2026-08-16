import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const oldMobile = `{/* Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-20 flex bg-black/50 backdrop-blur-sm p-2 overflow-x-auto hide-scrollbar border-b border-white/10">
        <div className="flex space-x-2 items-center px-4 w-max mx-auto md:mx-0">`;

const newMobile = `{/* Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-20 bg-black/50 backdrop-blur-sm border-b border-white/10 overflow-x-auto hide-scrollbar text-center whitespace-nowrap">
        <div className="inline-flex space-x-2 items-center px-4 py-2 min-w-min">`;

content = content.replace(oldMobile, newMobile);

fs.writeFileSync('src/main.jsx', content);
