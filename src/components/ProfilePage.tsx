import React, { useState } from 'react';
import { User, Shield } from 'lucide-react';

interface ProfilePageProps {
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
    avatarUrl?: string;
    m365Id?: string;
  };
}

const TABS = [
  { key: 'personal', label: 'Personal Profile' },
  { key: 'org', label: 'Org Profile' },
  { key: 'app', label: 'App Data' },
  { key: 'admin', label: 'Admin Center' },
];

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
  <div className="w-full px-2 sm:px-4 md:px-8 mt-6">
      
      {/* Tabs - centered, minimal style */}
      <div className="flex justify-center mt-8 mb-8">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base
                ${activeTab === tab.key ? "bg-blue-600 text-white shadow" : "bg-gray-50 text-gray-700 hover:bg-blue-100"}
                ${tab.key === 'admin' && !user.isAdmin ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={tab.key === 'admin' && !user.isAdmin}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Main content - centered vertically and horizontally */}
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        {/* Profile Info - centered, minimal */}
        <div className="flex flex-col items-center mb-8">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full border mb-4" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User size={40} className="text-gray-500" />
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-gray-900">{user.name}</span>
            {user.isAdmin && (
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs flex items-center border border-blue-200">
                <Shield size={14} className="mr-1" /> Admin
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-1">{user.email}</p>
          {user.m365Id && (
            <p className="text-xs text-gray-400 mt-1">M365 ID: {user.m365Id}</p>
          )}
        </div>
        {/* Tab Content - centered */}
        <div className="w-full max-w-md">
          {activeTab === 'personal' && (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Personal Profile</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm text-left inline-block">
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                {user.m365Id && <li>M365 ID: {user.m365Id}</li>}
              </ul>
            </div>
          )}
          {activeTab === 'org' && (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Org Profile</h3>
              <p>Show organization profile details here.</p>
            </div>
          )}
          {activeTab === 'app' && (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">App Data</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm text-left inline-block">
                <li>Recent activity</li>
                <li>Saved forms</li>
                <li>Chat history</li>
                {/* Add more app-specific data here */}
              </ul>
            </div>
          )}
          {activeTab === 'admin' && user.isAdmin && (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Admin Center</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm text-left inline-block">
                <li>Manage users</li>
                <li>View audit logs</li>
                <li>App settings</li>
                {/* Add more admin options here */}
              </ul>
            </div>
          )}
          {activeTab === 'admin' && !user.isAdmin && (
            <div className="text-red-500 text-center">You do not have access to the Admin Center.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
