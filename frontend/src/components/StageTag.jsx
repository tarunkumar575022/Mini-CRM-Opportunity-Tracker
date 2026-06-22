import React from 'react';

const colors = {
  'New': 'bg-gray-100 text-gray-700 border border-gray-200',
  'Contacted': 'bg-blue-100 text-blue-700 border border-blue-200',
  'Qualified': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  'Proposal Sent': 'bg-orange-100 text-orange-700 border border-orange-200',
  'Won': 'bg-green-100 text-green-700 border border-green-200',
  'Lost': 'bg-red-100 text-red-700 border border-red-200',
};

const StageTag = ({ stage }) => {
  const colorClass = colors[stage] || colors['New'];

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass} inline-flex items-center`}>
      {stage}
    </span>
  );
};

export default StageTag;
