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

      <div className="flex flex-1 overflow-hidden relative">
        {/* Only show Sidebar if we are NOT on a login/signup page */}
        {!isAuthPage && (
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 bg-[#f9f9f9]
          ${!isAuthPage && isSidebarOpen ? 'ml-64' : 'ml-20'} 
          ${isAuthPage ? 'ml-0' : ''}`}>
          <Outlet context={{ isSidebarOpen }} />
        </main>
      </div>
    </div>
  )
}

export default App
