import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  BarChart3, 
  ClipboardCheck,
  Menu,
  X,
  User
} from 'lucide-react';
import { View } from '../types';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setCurrentView: (view: View) => void;
}

export function Layout({ children, currentView, setCurrentView }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventori', icon: Package },
    { id: 'transactions', label: 'Transaksi', icon: ArrowLeftRight },
    { id: 'stock-opname', label: 'Stock Opname', icon: ClipboardCheck },
    { id: 'reports', label: 'Laporan', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-card border-r transition-all duration-300 flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="text-primary-foreground w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">SIBERAS</span>
            </div>
          )}
          {!isSidebarOpen && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Package className="text-primary-foreground w-5 h-5" />
            </div>
          )}
        </div>

        <ScrollArea className="flex-1 px-3">
          <nav className="space-y-2 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as View)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  currentView === item.id 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg bg-muted/50",
            !isSidebarOpen && "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">DigiScript Admin</p>
                <p className="text-xs text-muted-foreground truncate">Management</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-muted/30">
        <header className="h-16 border-bottom bg-card flex items-center justify-between px-6 shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">DigiScript Management</p>
              <p className="text-xs text-muted-foreground">Sistem Penjualan Beras</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
