import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Define paths where the sidebar should be hidden
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Only show Sidebar if we are NOT on a login/signup page */}
        {!isAuthPage && (
          <Sidebar 
            isOpen={isSidebarOpen} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          />
        )}
        
        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto ${!isAuthPage && isSidebarOpen ? 'ml-0' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
