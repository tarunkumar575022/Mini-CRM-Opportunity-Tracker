import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import OpportunityForm from '../components/OpportunityForm';
import { opportunityAPI } from '../services/api';

const CreateOpportunity = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    requirement: '',
    estimatedValue: 0,
    stage: 'New',
    priority: 'Medium',
    nextFollowUpDate: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await opportunityAPI.create(formData);
      toast.success('Opportunity created!');
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.errors?.[0] || error.response?.data?.message || 'Failed to create opportunity';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 font-medium mb-6">
          <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-900">New Opportunity</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Opportunity</h1>
          <p className="text-gray-500 mt-1">Enter the details for your new deal.</p>
        </div>

        <div className="animate-slide-up">
          <OpportunityForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
};

export default CreateOpportunity;
