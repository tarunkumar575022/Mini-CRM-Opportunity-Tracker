import React from 'react';

const priorities = {
  'High': { style: 'bg-red-100 text-red-700 border border-red-200', icon: '🔥' },
  'Medium': { style: 'bg-yellow-100 text-yellow-700 border border-yellow-200', icon: '⚡' },
  'Low': { style: 'bg-green-100 text-green-700 border border-green-200', icon: '📌' },
};

const PriorityTag = ({ priority }) => {
  const data = priorities[priority] || priorities['Medium'];

  return (
    <span 
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${data.style} inline-flex items-center gap-1`}
      title={`${priority} Priority`}
    >
      <span>{data.icon}</span> {priority}
    </span>
  );
};

export default PriorityTag;
