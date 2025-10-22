import React, { useState, useEffect } from 'react';
import { NetworkGraph } from './components/NetworkGraph';
import { EyeIcon } from './components/EyeIcon';
import { HomeButton } from './components/HomeButton';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { DesignPage } from './pages/DesignPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { allProjectsData } from './data/projects';
import { D3Node } from './types';

type ViewState =
  | { page: 'home' }
  | { page: 'architecture' }
  | { page: 'design' }
  | { page: 'contact' }
  | { page: 'project'; projectId: string; previousPage: 'architecture' | 'design' | 'home' };

export const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>({ page: 'home' });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (currentView.page === 'home') {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      html.style.overflow = 'auto';
      body.style.overflow = 'auto';
    }

    return () => {
      html.style.overflow = 'auto';
      body.style.overflow = 'auto';
    };
  }, [currentView.page]);

  const handleNodeClick = (node: D3Node) => {
    if (node.isProject && node.projectId) {
      const project = allProjectsData.find(p => p.id === node.projectId);
      const previousPage = project?.category === 'design' ? 'design' : 'architecture';
      setCurrentView({ page: 'project', projectId: node.projectId, previousPage: previousPage || 'home' });
      return;
    }

    switch (node.id) {
      case 'ARQUITECTURA':
        setCurrentView({ page: 'architecture' });
        break;
      case 'DISEÑO':
        setCurrentView({ page: 'design' });
        break;
      case 'CONTACTO':
        setCurrentView({ page: 'contact' });
        break;
      default:
        break;
    }
  };

  const handleProjectClick = (projectId: string) => {
    const previousPage = currentView.page === 'architecture' || currentView.page === 'design' ? currentView.page : 'home';
    setCurrentView({ page: 'project', projectId, previousPage });
  };

  const handleBack = () => {
    if (currentView.page === 'project' && currentView.previousPage) {
      setCurrentView({ page: currentView.previousPage });
    } else {
      setCurrentView({ page: 'home' });
    }
  };

  const handleGoHome = () => {
    setCurrentView({ page: 'home' });
  };

  const renderContent = () => {
    switch (currentView.page) {
      case 'home':
        return (
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="central-eye absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              <EyeIcon />
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <NetworkGraph onNodeClick={handleNodeClick} />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-500 z-20">
              Portfolio d3 benito
            </div>
          </div>
        );
      case 'architecture':
        return <ArchitecturePage onBack={handleBack} onProjectClick={handleProjectClick} />;
      case 'design':
        return <DesignPage onBack={handleBack} onProjectClick={handleProjectClick} />;
      case 'contact':
        return <ContactPage onBack={handleBack} />;
      case 'project':
        return <ProjectDetailPage projectId={currentView.projectId} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-black w-full h-full">
      {currentView.page !== 'home' && <HomeButton onClick={handleGoHome} />}
      {renderContent()}
    </div>
  );
};
