import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ProfilePage from './components/ProfilePage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // default to open on desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [route, setRoute] = useState<'chat' | 'profile'>('chat');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
      {sidebarCollapsed && (
        <button
          onClick={collapseSidebar}
          className="fixed left-2 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          style={{ minWidth: '36px', minHeight: '36px', top: '60px' }}
          title="Expand sidebar"
          aria-label="Expand sidebar"
        >
          <span className="sr-only">Expand sidebar</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
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