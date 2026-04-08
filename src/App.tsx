import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Transactions } from './components/Transactions';
import { Reports } from './components/Reports';
import { StockOpnameView } from './components/StockOpname';
import { View } from './types';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'transactions':
        return <Transactions />;
      case 'reports':
        return <Reports />;
      case 'stock-opname':
        return <StockOpnameView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Layout currentView={currentView} setCurrentView={setCurrentView}>
        {renderView()}
      </Layout>
      <Toaster position="top-right" />
    </div>
  );
}
