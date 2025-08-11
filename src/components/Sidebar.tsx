import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Users, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  Plus, 
  User,
  Bot,
  Clock,
  X
} from 'lucide-react';

type SidebarRoute = 'chat' | 'profile' | 'search' | 'agents' | 'conversations' | 'createAgent';

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  isCollapsed?: boolean;
  onToggle: () => void;
  onCollapse?: () => void;
  onNavigate?: (route: SidebarRoute) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '', isOpen, isCollapsed = false, onToggle, onCollapse, onNavigate }) => {
  // Auto-close sidebar overlay on route change (mobile)
  React.useEffect(() => {
    if (window.matchMedia('(max-width: 640px)').matches && isOpen && onCollapse) {
      onCollapse();
    }
    // eslint-disable-next-line
  }, [window.location.pathname]);
  // Helper: collapse sidebar after navigation (for mobile)
  const handleNavigate = (route: SidebarRoute) => {
    if (onNavigate) onNavigate(route);
    if (window.matchMedia('(max-width: 640px)').matches && onCollapse) {
      onCollapse();
    }
  };
  const [agentsExpanded, setAgentsExpanded] = useState(false);
  const [conversationsExpanded, setConversationsExpanded] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <aside className={`
        ${isOpen && !isCollapsed ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800
        flex flex-col transition-transform duration-300 ease-in-out ${className}
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden absolute top-4 right-4 z-10">
          <button
            onClick={onToggle}
            title='Close sidebar'
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded flex items-center justify-center bg-[var(--color-accent)]">
            <span className="text-white font-semibold text-sm">M</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Teams-Dev</h1>
        </div>
        {/* Collapse button */}
        <button
          onClick={onCollapse}
          className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Navigation */}
  <nav className={`flex-1 ${isCollapsed ? 'p-1' : 'p-2'}`}> 
        <div className="space-y-1">
          {/* Chat */}
          <button 
    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors`}
            onClick={() => {
              handleNavigate('chat');
              if (onCollapse) onCollapse();
            }}
          >
            <MessageSquare size={16} />
            {!isCollapsed && <span className="text-sm font-medium">Chat</span>}
          </button>

          {/* Search */}
          <button 
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors`}
            onClick={() => {
              if (onNavigate) onNavigate('search');
              if (onCollapse) onCollapse();
            }}
          >
            <Search size={16} />
            {!isCollapsed && <span className="text-sm font-medium">Search</span>}
          </button>

           {/* Agents Section */}
          <div className="mt-4">
            <button 
              onClick={() => setAgentsExpanded(!agentsExpanded)}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            >
              {agentsExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Users size={16} />
              <span className="text-sm font-medium">Agents</span>
            </button>
            
            {agentsExpanded && (
              <div className="ml-6 mt-1 space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bot size={12} className="text-purple-600" />
                  </div>
                  <span className="text-sm">Prompt Coach</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock size={12} className="text-purple-600" />
                  </div>
                  <span className="text-sm">Time Entry</span>
                </button>
                <button className="w-full flex items-start px-3 py-2 text-left">
                  <span className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">All agents</span>
                </button>
              </div>
            )}
          </div>

          {/* Conversations Section */}
          <div className="mt-2">
            <button 
              onClick={() => setConversationsExpanded(!conversationsExpanded)}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            >
              {conversationsExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <MessageSquare size={16} />
              <span className="text-sm font-medium">Conversations</span>
            </button>
          </div>

          {/* Create Agent */}
          <button 
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors`}
            onClick={() => {
              if (onNavigate) onNavigate('createAgent');
              if (onCollapse) onCollapse();
            }}
          >
            <Plus size={16} />
            {!isCollapsed && <span className="text-sm font-medium">Create Agent</span>}
          </button>

        </div>
      </nav>

      {/* Profile */}
    <div className="p-2 border-t border-gray-200 dark:border-neutral-800">
        <button 
      className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors`}
          onClick={() => {
            handleNavigate('profile');
            if (onCollapse) onCollapse();
          }}
        >
          <User size={16} />
          {!isCollapsed && <span className="text-sm font-medium">Profile</span>}
        </button>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;