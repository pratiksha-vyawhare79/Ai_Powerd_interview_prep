import React from 'react';

const ScoreCard = ({ score }) => {
  const getRating = (s) => {
    if (s >= 85) return { text: 'Excellent', color: 'text-emerald-400 border-emerald-500/20' };
    if (s >= 70) return { text: 'Proficient', color: 'text-sky-400 border-sky-500/20' };
    if (s >= 50) return { text: 'Average', color: 'text-amber-400 border-amber-500/20' };
    return { text: 'Needs Practice', color: 'text-red-400 border-red-500/20' };
  };

  const rating = getRating(score || 0);

  return (
    <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center border border-slate-800 glow-primary text-center">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
        Overall AI Rating
      </h3>

      <div className="relative flex items-center justify-center mb-4">
        {/* Progress Circle container */}
        <svg className="w-36 h-36 transform -rotate-90">
          <circle
            className="text-slate-800"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="60"
            cx="72"
            cy="72"
          />
          <circle
            className="text-primary-500"
            strokeWidth="8"
            strokeDasharray={376.9}
            strokeDashoffset={376.9 - (376.9 * (score || 0)) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="60"
            cx="72"
            cy="72"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white">{score !== null ? `${score}%` : 'N/A'}</span>
        </div>
      </div>

      <div className={`mt-2 px-4 py-1.5 text-sm font-bold uppercase tracking-widest rounded-full border bg-slate-900/60 ${rating.color}`}>
        {rating.text}
      </div>

      <p className="text-xs text-slate-500 mt-4 max-w-xs leading-relaxed">
        This evaluation is computed using detailed criteria including context relevance, correctness, and speech delivery.
      </p>
    </div>
  );
};

export default ScoreCard;
