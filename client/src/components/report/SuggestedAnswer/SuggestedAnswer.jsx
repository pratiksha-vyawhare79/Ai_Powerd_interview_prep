import React from 'react';
import { Lightbulb } from 'lucide-react';

const SuggestedAnswer = ({ suggestedAnswer }) => {
  if (!suggestedAnswer) return null;

  return (
    <div className="mt-4 bg-slate-900/60 border border-primary-500/20 rounded-xl p-4 glow-primary">
      <div className="flex items-center gap-2 mb-2 text-primary-400">
        <Lightbulb className="h-4 w-4 shrink-0 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider">Suggested Exemplary Answer</span>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed italic whitespace-pre-line">
        {suggestedAnswer}
      </p>
    </div>
  );
};

export default SuggestedAnswer;
