import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { LayoutList, Columns } from 'lucide-react';
import { opportunityAPI } from '../services/api';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import FilterBar from '../components/FilterBar';
import OpportunityCard from '../components/OpportunityCard';
import KanbanBoard from '../components/KanbanBoard';
import LoadingSpinner from '../components/LoadingSpinner';
import { CardSkeleton, KanbanSkeleton } from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import DeleteModal from '../components/DeleteModal';

const Dashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' | 'kanban'
  const [totalResults, setTotalResults] = useState(0);
  
  // Filtering and Sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    stage: '',
    priority: '',
    sortBy: '',
    order: 'desc'
  });

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    opportunity: null,
    isDeleting: false
  });

  const fetchOpportunities = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        ...filters,
        search: searchTerm,
        limit: 100 // Loading max for demo, real app would use pagination in list view
      };
      
      const response = await opportunityAPI.getAll(params);
      setOpportunities(response.data.data.opportunities);
      setTotalResults(response.data.data.total);
    } catch (error) {
      toast.error('Failed to load opportunities');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, searchTerm]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOpportunities();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, filters, fetchOpportunities]);

  const handleStageChange = async (id, newStage) => {
    // Optimistic update
    const previousOpps = [...opportunities];
    setOpportunities(opportunities.map(opp => 
      opp._id === id ? { ...opp, stage: newStage } : opp
    ));

    try {
      await opportunityAPI.update(id, { stage: newStage });
      toast.success('Stage updated');
    } catch (error) {
      // Revert on failure
      setOpportunities(previousOpps);
      toast.error(error.response?.data?.message || 'Failed to update stage');
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    try {
      await opportunityAPI.delete(deleteModal.opportunity._id);
      setOpportunities(opportunities.filter(o => o._id !== deleteModal.opportunity._id));
      setTotalResults(prev => prev - 1);
      toast.success('Opportunity deleted!');
      setDeleteModal({ isOpen: false, opportunity: null, isDeleting: false });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete opportunity');
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const hasActiveFilters = filters.stage !== '' || filters.priority !== '' || searchTerm !== '';

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <SummaryCards opportunities={opportunities} />
        
        <FilterBar 
          filters={filters} 
          setFilters={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalResults={totalResults}
        />

        <div className="mb-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Pipeline</h2>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                {totalResults} {totalResults === 1 ? 'deal' : 'deals'}
              </span>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1 shadow-inner">
              <button
                onClick={() => setView('list')}
                className={`p-1.5 rounded-md flex items-center transition-all ${view === 'list' ? 'bg-white text-primary shadow-sm font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                title="List View"
              >
                <LayoutList size={18} />
              </button>
              <button
                onClick={() => setView('kanban')}
                className={`p-1.5 rounded-md flex items-center transition-all ${view === 'kanban' ? 'bg-white text-primary shadow-sm font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                title="Kanban View"
              >
                <Columns size={18} />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          view === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              {[1, 2, 3, 4, 5, 6].map(i => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="animate-fade-in">
              <KanbanSkeleton />
            </div>
          )
        ) : opportunities.length === 0 ? (
          <EmptyState 
            hasFilters={hasActiveFilters} 
            clearFilters={() => {
              setSearchTerm('');
              setFilters({ stage: '', priority: '', sortBy: '', order: 'desc' });
            }} 
          />
        ) : view === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {opportunities.map(opp => (
              <OpportunityCard 
                key={opp._id} 
                opportunity={opp} 
                onDelete={(opp) => setDeleteModal({ isOpen: true, opportunity: opp, isDeleting: false })}
              />
            ))}
          </div>
        ) : (
          <div className="animate-fade-in">
            <KanbanBoard 
              opportunities={opportunities} 
              onStageChange={handleStageChange}
            />
          </div>
        )}
      </main>

      <DeleteModal 
        isOpen={deleteModal.isOpen}
        opportunity={deleteModal.opportunity}
        isDeleting={deleteModal.isDeleting}
        onClose={() => setDeleteModal({ isOpen: false, opportunity: null, isDeleting: false })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Dashboard;
