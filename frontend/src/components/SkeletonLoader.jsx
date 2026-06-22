import React from 'react';

export const CardSkeleton = () => (
  <div className="card p-5 bg-white border border-gray-200 animate-pulse">
    <div className="flex justify-between items-start mb-3">
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    
    <div className="h-6 w-3/4 bg-gray-200 rounded mb-3 mt-4"></div>
    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
    <div className="h-4 w-4/5 bg-gray-200 rounded mb-5"></div>
    
    <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-gray-100 pt-4">
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
      <div className="h-4 w-28 bg-gray-200 rounded"></div>
      <div className="h-4 w-32 bg-gray-200 rounded"></div>
      <div className="h-4 w-20 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export const KanbanSkeleton = () => (
  <div className="flex gap-4 overflow-x-hidden pb-4 kanban-scroll h-[calc(100vh-300px)] min-h-[500px]">
    {[1, 2, 3, 4, 5].map((col) => (
      <div key={col} className="flex-shrink-0 w-80 rounded-xl bg-gray-50 border border-gray-200 flex flex-col p-3 animate-pulse">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-5 w-8 bg-gray-200 rounded-full"></div>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3].map((card) => (
            <div key={card} className="bg-white p-3 rounded-lg border border-gray-200 h-28">
              <div className="flex justify-between mb-3">
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded mb-1.5"></div>
              <div className="h-3 w-4/5 bg-gray-200 rounded mb-3"></div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
