import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import OpportunityForm from '../components/OpportunityForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { opportunityAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const EditOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
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

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await opportunityAPI.getById(id);
        const opp = response.data.data;
        
        if (!opp.isOwner) {
          toast.error("You cannot edit this opportunity");
          navigate('/dashboard');
          return;
        }

        setFormData({
          customerName: opp.customerName || '',
          contactName: opp.contactName || '',
          contactEmail: opp.contactEmail || '',
          contactPhone: opp.contactPhone || '',
          requirement: opp.requirement || '',
          estimatedValue: opp.estimatedValue || 0,
          stage: opp.stage || 'New',
          priority: opp.priority || 'Medium',
          nextFollowUpDate: opp.nextFollowUpDate || '',
          notes: opp.notes || ''
        });
      } catch (error) {
        toast.error("Opportunity not found");
        navigate('/dashboard');
      } finally {
        setIsFetching(false);
      }
    };

    fetchOpportunity();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await opportunityAPI.update(id, formData);
      toast.success('Opportunity updated!');
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.errors?.[0] || error.response?.data?.message || 'Failed to update opportunity';
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
        <Navbar />
        <LoadingSpinner fullPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 font-medium mb-6">
          <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-900">Edit Opportunity</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Opportunity</h1>
          <p className="text-gray-500 mt-1">Update details for {formData.customerName}</p>
        </div>

        <div className="animate-slide-up">
          <OpportunityForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleSubmit} 
            isLoading={isUpdating} 
            isEditing={true}
          />
        </div>
      </main>
    </div>
  );
};

export default EditOpportunity;
