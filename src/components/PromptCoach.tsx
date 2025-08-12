import React from 'react';

const PromptCoachPage: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Prompt Coach</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700"> (Form is a placeholder)</p>
        <form className="mt-4 space-y-4">
          <input type="text" placeholder="Agent Name" className="w-full p-2 border rounded" />
          <input type="text" placeholder="Agent Role" className="w-full p-2 border rounded" />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Design</button>
        </form>
      </div>
    </div>
  );
};

export default PromptCoachPage;
