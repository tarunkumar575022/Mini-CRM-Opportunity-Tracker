import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-primary animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading data...</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="p-12 flex justify-center w-full">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
