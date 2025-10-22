import React from 'react';
import NetworkGraph from './components/NetworkGraph';

const App: React.FC = () => {
  return (
    <div className="relative w-screen h-screen bg-black text-gray-300 overflow-hidden">
      <NetworkGraph />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-500 z-20">
        Portfolio d3 benito
      </div>
    </div>
  );
};

export default App;
