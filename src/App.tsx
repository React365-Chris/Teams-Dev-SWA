import  { useState, useEffect } from 'react';
import { useChat } from './hooks/useChat';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/SearchPage';
import PromptCoachPage from './components/PromptCoach';
import Header from './components/Header';
import DesignAgentPage from './components/DesignAgentPage';
import { Plus } from 'lucide-react';
import { useTeamsTheme } from './hooks/useTeamsTheme';
import TimeEntryPage from './components/TimeEntryPage';

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
  const [route, setRoute] = useState<'chat' | 'profile' | 'agents' | 'conversations' | 'designagent' | 'search' | 'promptcoach' | 'timeentry'>('chat');
  // Sync app theme with system/Teams
  useTeamsTheme();

  // Chat state and actions
  const chat = useChat();

  const toggleSidebar = () => {
    setSidebarOpen(true);
    setSidebarCollapsed(false);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarCollapsed(true);
  };
  const collapseSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches) {
      setSidebarOpen(false);
    }
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
    <div className="h-screen flex app-surface overflow-hidden relative">
      {/* Sidebar and expand button */}
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onToggle={closeSidebar}
          onCollapse={collapseSidebar}
          onNavigate={setRoute}
        />
      <div className="flex-1 flex flex-col min-w-0 app-surface max-w-full">
        {/* Shared Header for all pages */}
        <Header
          title={
            route === 'chat' ? 'Secure Chat'
            : route === 'profile' ? 'Secure Profile'
            : route === 'conversations' ? 'Conversations'
            : route === 'designagent' ? 'Design Agent'
            : ''
          }
          onToggleSidebar={toggleSidebar}
          actions={route === 'chat' ? (
            <>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Protected</span>
              </div>
              <button
                className="ml-4 p-2 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-200 rounded-full border border-gray-300 dark:border-neutral-700 transition-colors"
                title="Start a new chat"
                aria-label="Start a new chat"
                onClick={chat.startNewConversation}
              >
                <Plus size={20} />
              </button>
            </>
          ) : <div />}
        />
        {/* Page content below header */}
        <div className="flex-1 flex flex-col min-w-0">
          {route === 'chat' && <ChatInterface {...chat} />}
          {route === 'profile' && <ProfilePage user={user} />}
          {route === 'designagent' && <DesignAgentPage />}
          {route === 'search' && <SearchPage />}
          {route === 'promptcoach' && <PromptCoachPage />}
          {route === 'timeentry' && <TimeEntryPage />}
        </div>
      </div>
    </div>
  );
}

export default App;