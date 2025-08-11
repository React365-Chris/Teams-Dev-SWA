import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onToggleSidebar?: () => void;
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, onToggleSidebar, actions }) => {
  return (
    <header className="w-full sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center h-16 px-4 justify-between">
        <div className="flex items-center space-x-4">
          {typeof onToggleSidebar === 'function' && (
            <button
              onClick={onToggleSidebar}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Open sidebar menu"
              aria-label="Open sidebar menu"
            >
              <Menu size={22} />
            </button>
          )}
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">{title}</h1>
        </div>
        {actions && (
          <div className="flex items-center space-x-3">{actions}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
