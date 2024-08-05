import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        <p className="text-gray-500">Please wait while we fetch the latest data.</p>
      </div>
    </div>
  );
};

export default Loading;
