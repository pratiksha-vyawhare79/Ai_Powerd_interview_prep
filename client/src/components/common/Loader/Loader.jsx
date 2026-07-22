import React from 'react';

const Loader = ({ size = 'md', message = '', fullScreen = false }) => {
  const spinnerSizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  const containerStyle = fullScreen
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-50'
    : 'flex flex-col items-center justify-center p-6';

  return (
    <div className={containerStyle}>
      <div
        className={`animate-spin rounded-full border-t-primary-500 border-r-transparent border-b-primary-500/30 border-l-transparent ${spinnerSizes[size]}`}
      ></div>
      {message && <p className="mt-4 text-sm font-medium text-slate-400 tracking-wide">{message}</p>}
    </div>
  );
};

export default Loader;
