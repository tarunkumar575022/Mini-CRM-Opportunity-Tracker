import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus, Activity, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-primary p-1.5 rounded-lg shadow-sm">
                <Activity size={26} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-2xl tracking-tight text-gray-900">Pipeline<span className="text-primary">IQ</span></span>
                <span className="hidden md:inline-block ml-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">CRM Dashboard</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Right Nav */}
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/opportunities/new" className="btn btn-primary text-sm gap-2 px-5">
              <Plus size={16} />
              <span>New Opportunity</span>
            </Link>
            
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 mr-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 shadow-sm border-2 border-white ring-2 ring-gray-100 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-gray-900 leading-tight">{user?.name}</span>
                  <span className="text-xs text-gray-500 leading-tight font-medium">{user?.email}</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fade-in">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link to="/opportunities/new" className="btn btn-primary text-sm p-2">
              <Plus size={18} />
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 shadow-lg px-4 pt-3 pb-5 space-y-4 absolute w-full animate-fade-in">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-900 leading-tight">{user?.name}</span>
              <span className="text-sm text-gray-500">{user?.email}</span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            Sign out of PipelineIQ
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
