import React, { useState } from 'react';
import { DEFAULT_ROLES, INTERVIEW_MODES } from '../../../utils/constants';
import Button from '../../common/Button/Button';
import { Code2, Compass, HeartHandshake, Sparkles } from 'lucide-react';

const RoleSelector = ({ onStartSession, loading }) => {
  const [role, setRole] = useState(DEFAULT_ROLES[0]);
  const [customRole, setCustomRole] = useState('');
  const [mode, setMode] = useState(INTERVIEW_MODES[0]);
  const [isCustomMode, setIsCustomMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRole = isCustomMode ? customRole.trim() : role;
    if (!finalRole) return;
    onStartSession(finalRole, mode);
  };

  const getModeIcon = (modeName) => {
    switch (modeName) {
      case 'Technical':
        return <Code2 className="h-5 w-5 text-primary-400" />;
      case 'Behavioral':
        return <HeartHandshake className="h-5 w-5 text-emerald-400" />;
      case 'Mixed':
        return <Sparkles className="h-5 w-5 text-indigo-400" />;
      default:
        return <Compass className="h-5 w-5" />;
    }
  };

  const getModeDesc = (modeName) => {
    switch (modeName) {
      case 'Technical':
        return 'Algorithms, architectural patterns, code design, and system concepts.';
      case 'Behavioral':
        return 'Situational challenges, teamwork, problem-solving, and communication.';
      case 'Mixed':
        return 'A comprehensive balance of technical knowledge and soft skills.';
      default:
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Role Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Target Role
        </label>
        
        {!isCustomMode ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:ring-primary-500 focus:border-primary-500 rounded-lg text-slate-100 transition-all duration-200 focus:outline-none focus:ring-2"
            >
              {DEFAULT_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              onClick={() => setIsCustomMode(true)}
              className="shrink-0"
            >
              Custom Role
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              required
              placeholder="e.g. Senior Machine Learning Engineer"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:ring-primary-500 focus:border-primary-500 rounded-lg text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2"
            />
            <Button
              variant="outline"
              onClick={() => {
                setIsCustomMode(false);
                setCustomRole('');
              }}
              className="shrink-0"
            >
              Use Standard List
            </Button>
          </div>
        )}
      </div>

      {/* Mode Selection cards */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          Interview Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INTERVIEW_MODES.map((m) => {
            const isSelected = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-800/80 border-primary-500 shadow-md shadow-primary-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700/60'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-slate-700' : 'bg-slate-800'}`}>
                    {getModeIcon(m)}
                  </div>
                  <span className="font-bold text-slate-200 text-sm">{m}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{getModeDesc(m)}</p>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        fullWidth
        className="mt-6"
      >
        Launch AI Mock Interview
      </Button>
    </form>
  );
};

export default RoleSelector;
