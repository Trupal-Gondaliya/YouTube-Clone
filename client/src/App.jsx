import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Suspense } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { darkMode } = useSelector(state => state.user)

  // Define paths where the sidebar should be hidden
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex flex-col h-screen transition-colors duration-300 bg-white dark:bg-black">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex flex-1 overflow-hidden relative">
          {/* Only show Sidebar if we are NOT on a login/signup page */}
          {!isAuthPage && (
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          )}

          {/* Main Content Area */}
          <main className={`flex-1 overflow-y-auto transition-all duration-300 bg-[#f9f9f9] text-black dark:bg-black dark:text-white
            ${!isAuthPage && isSidebarOpen ? 'ml-60' : 'ml-20'} 
            ${isAuthPage ? 'ml-0' : ''}`}
          >
            <Suspense fallback={<div className="p-10 text-center">Loading Page...</div>}>
              <Outlet context={{ isSidebarOpen }} />
            </Suspense>            
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
