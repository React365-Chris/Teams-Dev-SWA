import React from 'react';

const SearchPage: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Search</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700">Search for anything here. (Placeholder results)</p>
        <ul className="mt-4 space-y-2">
          <li className="bg-white p-2 rounded shadow">Result 1</li>
          <li className="bg-white p-2 rounded shadow">Result 2</li>
          <li className="bg-white p-2 rounded shadow">Result 3</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
