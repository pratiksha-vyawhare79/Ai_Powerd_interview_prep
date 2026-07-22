import React from 'react';

const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">
        <span>Interview Progress</span>
        <span>{percentage}% ({current} of {total})</span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
