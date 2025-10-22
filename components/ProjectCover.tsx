import React from 'react';

interface ProjectCoverProps {
  id: string;
  title: string;
  normalImage: string;
  rolloverImage: string;
  onProjectClick: (projectId: string) => void;
}

const ProjectCover: React.FC<ProjectCoverProps> = ({ id, title, normalImage, rolloverImage, onProjectClick }) => {
  return (
    <div 
      onClick={() => onProjectClick(id)}
      className="group relative block aspect-square overflow-hidden bg-gray-200 cursor-pointer"
      aria-label={`Ver proyecto ${title}`}
    >
      {/* Normal Image */}
      <img
        src={normalImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
      />
      {/* Rollover Image */}
      <img
        src={rolloverImage}
        alt={`${title} - rollover view`}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
      />
      {/* Project Title Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
         <div className="absolute top-4 left-4 text-black font-semibold text-lg flex items-center -rotate-90 origin-top-left">
            <span className="text-2xl font-thin mr-2">+</span>
            <span className="tracking-widest uppercase text-sm whitespace-nowrap">{title}</span>
         </div>
      </div>
    </div>
  );
};

export default ProjectCover;