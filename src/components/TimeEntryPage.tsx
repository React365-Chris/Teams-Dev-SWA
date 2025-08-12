import React from 'react';


const TimeEntryPage: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Time Entry</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700">Fill out the form to create a new time entry. (Form is a placeholder)</p>
        <form className="mt-4 space-y-4">
          <input type="text" placeholder="Entry Title" className="w-full p-2 border rounded" />
          <input type="text" placeholder="Entry Description" className="w-full p-2 border rounded" />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
        </form>
      </div>
    </div>
  );
};

export default TimeEntryPage;
