import React from 'react';
import { allProjectsData } from '../data/projects';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId, onBack }) => {
  const project = allProjectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-black animate-fade-in">
        <h2 className="text-2xl mb-4">Proyecto no encontrado</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-black text-white uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-black animate-fade-in overflow-y-auto">
      <header className="sticky top-0 z-30 w-full bg-white bg-opacity-90 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
                onClick={onBack}
                className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
                &larr; Volver a Proyectos
            </button>
          </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          {project.description}
        </p>

        <div className="space-y-4 sm:space-y-8">
          {project.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`${project.title} - Imagen ${index + 1}`} 
              className="w-full h-auto object-cover"
            />
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 text-gray-600 text-center p-6 text-xs mt-12">
        © 2024 Benito G. Quiñones - Todos los derechos reservados - arquitectuabenito@gmail.com
      </footer>
    </div>
  );
};

export default ProjectDetailPage;