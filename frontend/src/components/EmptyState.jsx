import React from 'react';
import { Briefcase, FilterX } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ hasFilters, clearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 min-h-[450px] shadow-sm relative overflow-hidden">
      {/* Decorative Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl z-0"></div>
      
      <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 text-primary rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-blue-100/50 transform rotate-3">
        {hasFilters ? <FilterX size={48} className="-rotate-3" /> : <Briefcase size={48} className="-rotate-3" />}
      </div>
      
      <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-3">
        {hasFilters ? 'No results for current filters' : 'Your pipeline is empty'}
      </h3>
      
      <p className="text-gray-500 mb-8 max-w-sm">
        {hasFilters 
          ? "Try adjusting your search or filters to find what you're looking for." 
          : "You haven't created any opportunities yet. Add your first deal to get started."}
      </p>
      
      {hasFilters ? (
        <button onClick={clearFilters} className="btn btn-secondary">
          Clear Filters
        </button>
      ) : (
        <Link to="/opportunities/new" className="btn btn-primary">
          Create your first opportunity
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
