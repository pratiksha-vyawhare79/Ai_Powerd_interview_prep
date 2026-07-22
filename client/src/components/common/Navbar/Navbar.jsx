import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Button from '../Button/Button';
import { LogOut, User as UserIcon, BarChart3, MessageSquarePlus, Mic } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
              <div className="p-2 bg-primary-600 rounded-xl shadow-md shadow-primary-500/30">
                <Mic className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
                PrepAI
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-1">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive('/dashboard')
                      ? 'bg-slate-800/80 text-white'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/interview"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive('/interview')
                      ? 'bg-slate-800/80 text-white'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                  }`}
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  New Interview
                </Link>
              </div>

              {/* User badge and logout */}
              <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="p-1.5 bg-slate-800 rounded-full border border-slate-700">
                    <UserIcon className="h-4 w-4 text-slate-300" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">{user?.name}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
