
import React, { useState } from 'react';
import { ViewType, UserRole } from './modules/types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import SupplierDataView from './views/SupplierDataView';
import TravelAdvisoryView from './views/TravelAdvisoryView';
import SupplierBView from './views/SupplierBView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('TravelAdvisories');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024);
  const [currentRole, setCurrentRole] = useState<UserRole>('SCIC Contributor');

  const renderView = () => {
    switch (activeView) {
      case 'SupplierData':
        return <SupplierDataView />;
      case 'TravelAdvisories':
        return <TravelAdvisoryView />;
      case 'Suppliers':
        return <SupplierBView currentUserRole={currentRole} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 font-sans">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
