import React, { useState, useEffect } from 'react';
import NetworkGraph from './components/NetworkGraph';
import EyeIcon from './components/EyeIcon';
import ArchitecturePage from './pages/ArchitecturePage';
import DesignPage from './pages/DesignPage';
import ContactPage from './pages/ContactPage';
import { NodeData } from './types';
import HomeButton from './components/HomeButton';

type Page = 'home' | 'architecture' | 'design' | 'contact';
interface ViewState {
  page: Page;
}

const App: React.FC = () => {
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

    // Cleanup function to ensure styles are reset on component unmount
    return () => {
      html.style.overflow = 'auto';
      body.style.overflow = 'auto';
    };
  }, [currentView.page]);

  const handleNodeClick = (node: NodeData) => {
    if (node.isProject && node.projectId) {
      window.location.href = `/${node.projectId}.html`;
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
        return <ArchitecturePage onBack={handleGoHome} />;
      case 'design':
        return <DesignPage onBack={handleGoHome} />;
      case 'contact':
        return <ContactPage onBack={handleGoHome} />;
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