import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { Edit, Trash2, IndianRupee, Calendar, Clock, User } from 'lucide-react';
import StageTag from './StageTag';
import PriorityTag from './PriorityTag';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

const stageColors = {
  'New': 'border-l-gray-400',
  'Contacted': 'border-l-blue-400',
  'Qualified': 'border-l-yellow-400',
  'Proposal Sent': 'border-l-orange-400',
  'Won': 'border-l-green-500',
  'Lost': 'border-l-red-500'
};

const OpportunityCard = ({ opportunity, onDelete }) => {
  const isOwner = opportunity.isOwner;

  return (
    <div className={`card p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group relative bg-white border-y border-r border-l-4 ${stageColors[opportunity.stage] || 'border-l-gray-200'}`}>
      {isOwner && (
        <div className="absolute top-0 right-0 flex items-center bg-gray-50 rounded-bl-xl border-b border-l border-gray-200 overflow-hidden">
          <div className="bg-primary/10 text-primary text-[10px] px-3 py-1 font-bold tracking-wider uppercase border-r border-gray-200">
            My Opportunity
          </div>
          <Link to={`/opportunities/${opportunity._id}/edit`} className="p-1.5 text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors" title="Edit">
            <Edit size={14} />
          </Link>
          <button onClick={() => onDelete(opportunity)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      )}
      
      <div className={`flex justify-between items-start mb-3 ${isOwner ? 'pr-24' : ''}`}>
        <div className="flex gap-2">
          <StageTag stage={opportunity.stage} />
          <PriorityTag priority={opportunity.priority} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-1">{opportunity.customerName}</h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-3 h-10">{opportunity.requirement}</p>

      {/* Contact Section */}
      {(opportunity.contactName || opportunity.contactEmail || opportunity.contactPhone) && (
        <div className="bg-gray-50 rounded-lg p-2.5 mb-4 text-xs text-gray-600 border border-gray-100 flex flex-col gap-1">
          {opportunity.contactName && <span className="font-semibold text-gray-800">{opportunity.contactName}</span>}
          <div className="flex items-center gap-3">
            {opportunity.contactEmail && <span className="truncate" title={opportunity.contactEmail}>{opportunity.contactEmail}</span>}
            {opportunity.contactPhone && <span>{opportunity.contactPhone}</span>}
          </div>
        </div>
      )}

      <div className={`grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 border-t border-gray-100 ${opportunity.contactName ? 'pt-3' : 'pt-4 mt-2'}`}>
        <div className="flex items-center gap-1.5 font-medium text-gray-800">
          <IndianRupee size={14} className="text-gray-400" />
          {formatCurrency(opportunity.estimatedValue)}
        </div>
        
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-gray-400" />
          {opportunity.nextFollowUpDate ? format(new Date(opportunity.nextFollowUpDate), 'MMM d, yyyy') : 'No date set'}
        </div>

        <div className="flex items-center gap-1.5">
          <User size={14} className="text-gray-400" />
          <span className="truncate">{opportunity.owner?.name}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <Clock size={14} className="text-gray-400" />
          {formatDistanceToNow(new Date(opportunity.createdAt), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
