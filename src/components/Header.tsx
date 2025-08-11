import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onToggleSidebar?: () => void;
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, onToggleSidebar, actions }) => {
  return (
    <header className="w-full sticky top-0 z-10 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
      <div className="flex items-center h-14 sm:h-16 px-3 sm:px-4 justify-between">
        <div className="flex items-center gap-3">
          {typeof onToggleSidebar === 'function' && (
            <button
              onClick={onToggleSidebar}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
              title="Open sidebar menu"
              aria-label="Open sidebar menu"
            >
              <Menu size={20} />
            </button>
          )}
          <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">{title}</h1>
        </div>
        {actions && (
          <div className="flex items-center space-x-3">{actions}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
