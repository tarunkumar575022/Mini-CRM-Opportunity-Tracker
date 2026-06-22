import React from 'react';
import KanbanCard from './KanbanCard';

const columns = [
  { id: 'New', title: 'New', color: 'bg-gray-100', dot: 'bg-gray-400' },
  { id: 'Contacted', title: 'Contacted', color: 'bg-blue-50', dot: 'bg-blue-500' },
  { id: 'Qualified', title: 'Qualified', color: 'bg-yellow-50', dot: 'bg-yellow-500' },
  { id: 'Proposal Sent', title: 'Proposal Sent', color: 'bg-orange-50', dot: 'bg-orange-500' },
  { id: 'Won', title: 'Won', color: 'bg-green-50', dot: 'bg-green-500' },
  { id: 'Lost', title: 'Lost', color: 'bg-red-50', dot: 'bg-red-500' },
];

const KanbanBoard = ({ opportunities, onStageChange }) => {
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('opportunityId', id);
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('opportunityId');
    if (id) {
      onStageChange(id, targetStage);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 kanban-scroll h-[calc(100vh-300px)] min-h-[500px]">
      {columns.map((col) => {
        const colOpps = opportunities.filter((o) => o.stage === col.id);
        const colValue = colOpps.reduce((sum, o) => sum + (o.estimatedValue || 0), 0);

        return (
          <div
            key={col.id}
            className={`flex-shrink-0 w-80 rounded-xl ${col.color} border border-gray-200 flex flex-col`}
            onDrop={(e) => handleDrop(e, col.id)}
            onDragOver={handleDragOver}
          >
            <div className="p-3 border-b border-gray-200/60 bg-white/50 backdrop-blur-sm rounded-t-xl sticky top-0 z-10">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${col.dot}`}></div>
                  <h3 className="font-bold text-gray-800">{col.title}</h3>
                </div>
                <span className="bg-white px-2 py-0.5 rounded-full text-xs font-semibold text-gray-500 border border-gray-200 shadow-sm">
                  {colOpps.length}
                </span>
              </div>
              <div className="text-xs font-medium text-gray-500 pl-4.5">
                ₹{colValue.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="flex-1 p-3 overflow-y-auto kanban-scroll flex flex-col gap-3">
              {colOpps.map((opp) => (
                <KanbanCard 
                  key={opp._id} 
                  opportunity={opp} 
                  onDragStart={handleDragStart} 
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
