import React from 'react';
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

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full border" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={32} className="text-gray-500" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          {user.m365Id && (
            <p className="text-xs text-gray-400">M365 ID: {user.m365Id}</p>
          )}
        </div>
        {user.isAdmin && (
          <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs flex items-center">
            <Shield size={14} className="mr-1" /> Admin
          </span>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">App Data</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>Recent activity</li>
            <li>Saved forms</li>
            <li>Chat history</li>
            {/* Add more app-specific data here */}
          </ul>
        </div>
        {user.isAdmin && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Admin Options</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              <li>Manage users</li>
              <li>View audit logs</li>
              <li>App settings</li>
              {/* Add more admin options here */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
