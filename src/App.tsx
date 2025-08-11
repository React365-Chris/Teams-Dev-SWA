import  { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ProfilePage from './components/ProfilePage';

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
  const [route, setRoute] = useState<'chat' | 'profile'>('chat');

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
        {route === 'chat' ? (
          <ChatInterface onToggleSidebar={toggleSidebar} />
        ) : (
          <ProfilePage user={user} />
        )}
      </div>
    </div>
  );
}

export default App;