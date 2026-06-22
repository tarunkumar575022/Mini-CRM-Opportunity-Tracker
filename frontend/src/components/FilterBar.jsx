import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

const FilterBar = ({ filters, setFilters, onSearchChange, searchTerm, totalResults }) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const hasActiveFilters = filters.stage !== '' || filters.priority !== '' || filters.sortBy !== '';

  const handleClear = () => {
    setFilters({ stage: '', priority: '', sortBy: '', order: 'desc' });
  };

  const stages = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
      {/* Top Row: Search and Mobile Toggle */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10 bg-gray-50/50 w-full"
            placeholder="Search opportunities by customer or company name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <button 
          className="md:hidden p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Filters Area (Collapsible on mobile) */}
      <div className={`flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${isMobileFiltersOpen ? 'block' : 'hidden md:flex'}`}>
        
        {/* Stage Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilters({...filters, stage: ''})}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${filters.stage === '' ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {stages.map(stage => (
            <button
              key={stage}
              onClick={() => setFilters({...filters, stage})}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${filters.stage === stage ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Right Side Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select 
            className="input-field py-1.5 px-3 text-sm min-w-[140px] bg-gray-50/50 rounded-lg"
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select 
            className="input-field py-1.5 px-3 text-sm min-w-[150px] bg-gray-50/50 rounded-lg"
            value={`${filters.sortBy}-${filters.order}`}
            onChange={(e) => {
              const [sortBy, order] = e.target.value.split('-');
              if(sortBy && order) {
                setFilters({...filters, sortBy, order});
              } else {
                setFilters({...filters, sortBy: '', order: 'desc'});
              }
            }}
          >
            <option value="-">Sort By</option>
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="estimatedValue-desc">Highest Value</option>
            <option value="estimatedValue-asc">Lowest Value</option>
          </select>

          {hasActiveFilters && (
            <button 
              onClick={handleClear}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 py-1.5 px-3 rounded-lg font-medium transition-colors border border-red-100"
            >
              <X size={14} /> Clear All
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500 font-medium">
        Showing <span className="text-gray-900 font-semibold">{totalResults}</span> {totalResults === 1 ? 'opportunity' : 'opportunities'}
      </div>
    </div>
  );
};

export default FilterBar;
