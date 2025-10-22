import React from 'react';
import OrbitalGallery from '../components/OrbitalGallery';
import { allProjectsData } from '../data/projects';
import { Project } from '../data/projects';

interface DesignPageProps {
  onProjectClick: (projectId: string) => void;
  onBack: () => void;
}

const DesignPage: React.FC<DesignPageProps> = ({ onProjectClick, onBack }) => {
  const designProjects: Project[] = allProjectsData.filter(p => p.category === 'design');

  return (
    <div className="w-full h-screen bg-black text-white animate-fade-in relative">
      <div style={{position: 'fixed', top: 0, left: 0, background: 'blue', color: 'white', padding: '10px', zIndex: 9999, fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}>
        <span>TEST 2: DESIGN PAGE</span>
        <img src="/imagenes/diseño_silla_1.png" alt="Test Image 2" style={{height: '40px', border: '1px solid white'}} />
      </div>
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-30 text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300"
      >
        &larr; Volver
      </button>

      <OrbitalGallery projects={designProjects} onProjectClick={onProjectClick} />
       <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 z-10">
          © 2024 Benito G. Quiñones
      </footer>
    </div>
  );
};

export default DesignPage;