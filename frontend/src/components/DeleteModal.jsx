import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, opportunity, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        onClick={!isDeleting ? onClose : undefined}
      ></div>
      
      {/* Modal content */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative z-10 overflow-hidden animate-slide-up">
        <button 
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
            <AlertTriangle size={24} />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Opportunity?</h3>
          <p className="text-gray-600 mb-6">
            This action cannot be undone. The opportunity for <strong className="text-gray-900">{opportunity?.customerName}</strong> will be permanently deleted.
          </p>
          
          <div className="flex gap-3 justify-end">
            <button 
              onClick={onClose} 
              disabled={isDeleting}
              className="btn btn-secondary px-5"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              disabled={isDeleting}
              className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 px-5 flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
