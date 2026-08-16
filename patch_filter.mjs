import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const t1 = `  const filters = [
    { key: "all", label: "Todos" },
    { key: "architecture", label: "Arquitectura" },
    { key: "design", label: "Diseño" },
    { key: "escenografias", label: "Escenografías" },
  ];`;

const r1 = `  const filters = [
    { key: "all", label: "Todos" },
    { key: "architecture", label: "Arquitectura" },
    { key: "design", label: "Diseño" },
    { key: "escenografias", label: "Escenografías" },
    { key: "contact", label: "Contacto" },
  ];`;

content = content.replace(t1, r1);

// Also remove the "Probar suerte" button on mobile
const btnTarget = `            <button
              onClick={handleRandomProject}
              className="absolute bottom-8 right-4 md:right-8 z-30 px-4 py-2 sm:px-5 sm:py-2.5 bg-black bg-opacity-50 rounded-full border border-gray-700 text-gray-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center hover:bg-white/10 hover:border-gray-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
              title="Abre un proyecto al azar"
            >
              Probar suerte
            </button>`;

const btnReplacement = `            <button
              onClick={handleRandomProject}
              className="hidden md:flex absolute bottom-8 right-4 md:right-8 z-30 px-4 py-2 sm:px-5 sm:py-2.5 bg-black bg-opacity-50 rounded-full border border-gray-700 text-gray-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider items-center justify-center hover:bg-white/10 hover:border-gray-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
              title="Abre un proyecto al azar"
            >
              Probar suerte
            </button>`;

content = content.replace(btnTarget, btnReplacement);

fs.writeFileSync('src/main.jsx', content);
