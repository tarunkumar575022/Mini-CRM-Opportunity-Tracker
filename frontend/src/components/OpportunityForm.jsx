import React from 'react';
import { Link } from 'react-router-dom';

const OpportunityForm = ({ formData, setFormData, onSubmit, isLoading, isEditing = false }) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col md:flex-row">

        {/* Left Column - Customer Info */}
        <div className="flex-1 p-6 md:p-8 md:border-r border-gray-200 bg-gray-50/30">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center text-xs">1</span>
            Customer Info
          </h3>

          <div className="space-y-5">
            <div>
              <label className="label" htmlFor="customerName">Company / Customer Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 size={18} className="text-gray-400" />
                </div>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  required
                  className="input-field pl-10"
                  placeholder="Acme Corp"
                  value={formData.customerName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="contactName">Contact Person Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  className="input-field pl-10"
                  placeholder="Jane Doe"
                  value={formData.contactName || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label" htmlFor="contactEmail">Contact Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    className="input-field pl-10"
                    placeholder="jane@acme.com"
                    value={formData.contactEmail || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="contactPhone">Contact Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    className="input-field pl-10"
                    placeholder="+1 (555) 000-0000"
                    value={formData.contactPhone || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Deal Details */}
        <div className="flex-1 p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center text-xs">2</span>
            Deal Details
          </h3>

          <div className="space-y-5">
            <div>
              <label className="label" htmlFor="requirement">Requirement / Need Summary *</label>
              <textarea
                id="requirement"
                name="requirement"
                required
                rows={3}
                className="input-field resize-none"
                placeholder="Briefly describe what they are looking for..."
                value={formData.requirement}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label" htmlFor="estimatedValue">Estimated Value (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">₹</span>
                  </div>
                  <input
                    id="estimatedValue"
                    name="estimatedValue"
                    type="number"
                    min="0"
                    className="input-field pl-8"
                    placeholder="0"
                    value={formData.estimatedValue}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="nextFollowUpDate">Next Follow-up Date</label>
                <input
                  id="nextFollowUpDate"
                  name="nextFollowUpDate"
                  type="date"
                  className="input-field"
                  value={formData.nextFollowUpDate ? formData.nextFollowUpDate.split('T')[0] : ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label" htmlFor="stage">Stage *</label>
                <select
                  id="stage"
                  name="stage"
                  required
                  className="input-field"
                  value={formData.stage}
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="label">Priority *</label>
                <div className="flex items-center gap-4 mt-2">
                  {['Low', 'Medium', 'High'].map(p => (
                    <label key={p} className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={p}
                          checked={formData.priority === p}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-700 font-medium">{p}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="label" htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                className="input-field resize-none"
                placeholder="Any other details..."
                value={formData.notes || ''}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
        <Link to="/dashboard" className="btn btn-secondary px-6">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary px-8 min-w-[160px]"
        >
          {isLoading ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
          ) : (
            isEditing ? 'Update Opportunity' : 'Create Opportunity'
          )}
        </button>
      </div>
    </form>
  );
};

export default OpportunityForm;
