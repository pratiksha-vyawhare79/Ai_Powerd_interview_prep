import React from 'react';
import { PlayCircle, Award, CheckCircle, BarChart3 } from 'lucide-react';

const StatsSummary = ({ stats }) => {
  const { totalSessions = 0, completedSessions = 0, averageScore = 0 } = stats || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Sessions Card */}
      <div className="glass-card p-6 rounded-2xl flex items-center justify-between glow-primary">
        <div>
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
            Total Sessions
          </span>
          <h3 className="text-3xl font-extrabold text-white mt-1">{totalSessions}</h3>
          <p className="text-xs text-slate-500 mt-1">Interviews started</p>
        </div>
        <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
          <PlayCircle className="h-6 w-6 text-primary-400" />
        </div>
      </div>

      {/* Average Score Card */}
      <div className="glass-card p-6 rounded-2xl flex items-center justify-between glow-primary">
        <div>
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
            Average Score
          </span>
          <h3 className="text-3xl font-extrabold text-white mt-1">
            {totalSessions > 0 && completedSessions > 0 ? `${averageScore}%` : 'N/A'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Based on evaluations</p>
        </div>
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <Award className="h-6 w-6 text-emerald-400" />
        </div>
      </div>

      {/* Completed Interviews Card */}
      <div className="glass-card p-6 rounded-2xl flex items-center justify-between glow-primary">
        <div>
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
            Completed
          </span>
          <h3 className="text-3xl font-extrabold text-white mt-1">{completedSessions}</h3>
          <p className="text-xs text-slate-500 mt-1">Fully evaluated by AI</p>
        </div>
        <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
          <CheckCircle className="h-6 w-6 text-indigo-400" />
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
