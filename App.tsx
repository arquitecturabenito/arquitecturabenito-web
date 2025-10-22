import React, { useState } from 'react';
import NetworkGraph from './components/NetworkGraph';
import EyeIcon from './components/EyeIcon';
import ArchitecturePage from './pages/ArchitecturePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DesignPage from './pages/DesignPage';
import ContactPage from './pages/ContactPage';
import { allProjectsData } from './data/projects';
import { NodeData } from './types';
import HomeButton from './components/HomeButton';

type Page = 'home' | 'architecture' | 'design' | 'contact' | 'project';
interface ViewState {
  page: Page;
  projectId?: string;
  previousPage?: Page;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>({ page: 'home' });

  const handleNodeClick = (node: NodeData) => {
    if (node.isProject && node.projectId) {
      const project = allProjectsData.find(p => p.id === node.projectId);
      const previousPage = project?.category === 'design' ? 'design' : 'architecture';
      setCurrentView({ page: 'project', projectId: node.projectId, previousPage });
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
    const previousPage = currentView.page as Page;
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
        return <ProjectDetailPage projectId={currentView.projectId!} onBack={handleBack} />;
      default:
        return null;
    }
  }

  return (
    <div className="bg-black w-full h-full">
      {currentView.page !== 'home' && <HomeButton onClick={handleGoHome} />}
      {renderContent()}
    </div>
  );
};

export default App;