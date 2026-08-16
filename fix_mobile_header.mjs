import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const oldMobile = `<div className="md:hidden fixed top-0 left-0 w-full z-20 flex justify-center bg-black/50 backdrop-blur-sm p-2 px-2 overflow-x-auto hide-scrollbar border-b border-white/10">
        <div className="flex space-x-2 items-center mx-auto w-max px-2">`;
const newMobile = `<div className="md:hidden fixed top-0 left-0 w-full z-20 flex bg-black/50 backdrop-blur-sm p-2 overflow-x-auto hide-scrollbar border-b border-white/10">
        <div className="flex space-x-2 items-center px-4 w-max mx-auto md:mx-0">`;
        
content = content.replace(oldMobile, newMobile);
fs.writeFileSync('src/main.jsx', content);
