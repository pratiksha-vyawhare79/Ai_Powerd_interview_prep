import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm/RegisterForm';
import { Mic } from 'lucide-react';

const Register = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary-600/5 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-primary-600 rounded-2xl shadow-lg shadow-primary-500/25 mb-3">
            <Mic className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create Account</h2>
          <p className="text-sm text-slate-400 mt-1">Get custom AI feedback on your skills</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-slate-800/80 shadow-xl">
          <RegisterForm />
          
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-400 hover:text-primary-300">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
