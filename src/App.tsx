import  { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ProfilePage from './components/ProfilePage';
import Header from './components/Header';
import SearchPage from './components/SearchPage';
import CreateAgentPage from './components/CreateAgentPage';
import { Plus } from 'lucide-react';

function App() {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile); // open on desktop, collapsed on mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);

  // Responsive: update sidebar state on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.matchMedia('(max-width: 640px)').matches;
      setSidebarOpen(!mobile);
      setSidebarCollapsed(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [route, setRoute] = useState<'chat' | 'profile' | 'search' | 'agents' | 'conversations' | 'createAgent'>('chat');

  const toggleSidebar = () => {
    setSidebarOpen(true);
    setSidebarCollapsed(false);
  };
  const collapseSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Example user data, replace with real M365 info
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@m365.com',
    isAdmin: true,
    avatarUrl: '',
    m365Id: '123456789',
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden relative">
      {/* Sidebar and expand button */}
      <Sidebar 
        isOpen={sidebarOpen} 
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        onCollapse={collapseSidebar}
        onNavigate={setRoute}
      />
      <div className="flex-1 flex flex-col min-w-0 bg-white max-w-full">
        {/* Shared Header for all pages */}
        <Header
          title={
            route === 'chat' ? 'Secure Chat'
            : route === 'profile' ? 'Secure Profile'
            : route === 'search' ? 'Search'
            : route === 'conversations' ? 'Conversations'
            : route === 'createAgent' ? 'Create Agent'
            : ''
          }
          onToggleSidebar={toggleSidebar}
          actions={route === 'chat' ? (
            <>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Protected</span>
              </div>
              <button
                className="ml-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-300 transition-colors"
                title="Start a new chat"
                aria-label="Start a new chat"
                onClick={() => {/* Add new chat logic here if needed */}}
              >
                <Plus size={20} />
              </button>
            </>
          ) : <div />}
        />
        {/* Page content below header */}
        <div className="flex-1 flex flex-col min-w-0">
          {route === 'chat' && <ChatInterface />}
          {route === 'profile' && <ProfilePage user={user} />}
          {route === 'search' && <SearchPage />}
          {route === 'createAgent' && <CreateAgentPage />}
        </div>
      </div>
    </div>
  );
}

export default App;