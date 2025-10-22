import React, { useRef } from 'react';
import ProjectCover from '../components/ProjectCover';
import { allProjectsData } from '../data/projects';

interface ArchitecturePageProps {
  onBack: () => void;
  onProjectClick: (projectId: string) => void;
}

// Reusable scroll arrow component defined locally
const ScrollDownArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce p-2 transition-opacity hover:opacity-70"
      aria-label="Desplazarse hacia abajo"
    >
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  );
};

const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onBack, onProjectClick }) => {
  const architectureProjects = allProjectsData.filter(p => p.category === 'architecture');
  const mainContentRef = useRef<HTMLElement>(null);

  const handleScrollDown = () => {
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-white text-black animate-fade-in overflow-y-auto">
      {/* Masthead Section */}
      <div 
        className="relative h-[80vh] md:h-screen flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: "url('imagenes/portada2.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wider uppercase">UNA ARQUITECTURA PARA JUGAR</h1>
          <a href="#" className="mt-4 inline-block text-sm uppercase tracking-widest border-b border-white pb-1">
            más sobre benito
          </a>
        </div>
        <ScrollDownArrow onClick={handleScrollDown} />
      </div>
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                  <div 
                    className="text-md sm:text-lg font-bold tracking-wider cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={onBack}
                    aria-label="Volver a la página principal"
                  >
                      ARQUITECTURA BENITO
                  </div>
              </div>
          </div>
      </header>

      {/* Main Content */}
      <main ref={mainContentRef} className="w-full">
        <section className="project-covers py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {architectureProjects.map((project) => (
                    <ProjectCover 
                      key={project.id} 
                      onProjectClick={onProjectClick}
                      {...project} 
                    />
                ))}
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center p-6 text-xs">
          © 2024 Benito G. Quiñones - Todos los derechos reservados - arquitectuabenito@gmail.com
      </footer>
    </div>
  );
};

export default ArchitecturePage;