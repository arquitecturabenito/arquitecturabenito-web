import React from 'react';
import OrbitalGallery from '../components/OrbitalGallery';
import { allProjectsData } from '../data/projects';
import { Project } from '../data/projects';

interface DesignPageProps {
  onBack: () => void;
}

const DesignPage: React.FC<DesignPageProps> = ({ onBack }) => {
  const designProjects: Project[] = allProjectsData.filter(p => p.category === 'design');

  return (
    <div className="w-full h-screen bg-black text-white animate-fade-in relative">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-30 text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300"
      >
        &larr; Volver
      </button>

      <OrbitalGallery projects={designProjects} />
       <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 z-10">
          © 2024 Benito G. Quiñones
      </footer>
    </div>
  );
};

export default DesignPage;
