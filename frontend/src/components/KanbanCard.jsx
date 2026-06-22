import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { IndianRupee } from 'lucide-react';
import PriorityTag from './PriorityTag';

const KanbanCard = ({ opportunity, onDragStart }) => {
  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, opportunity._id)}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:border-primary/30 hover:shadow transition-all group relative animate-fade-in"
    >
      {opportunity.isOwner && (
        <div className="w-1.5 h-full bg-primary absolute left-0 top-0 rounded-l-lg opacity-80" />
      )}
      
      <div className="pl-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-gray-900 text-sm">{opportunity.customerName}</h4>
          <PriorityTag priority={opportunity.priority} />
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{opportunity.requirement}</p>
        
        <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-2">
          <div className="flex items-center font-medium text-gray-700">
            <IndianRupee size={12} className="mr-0.5 text-gray-400" />
            {opportunity.estimatedValue?.toLocaleString('en-IN') || 0}
          </div>
          <div className="text-gray-400">
            {formatDistanceToNow(new Date(opportunity.createdAt))} ago
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
