import React from 'react';
import { HelpCircle } from 'lucide-react';

const QuestionCard = ({ questionText, currentIndex, totalQuestions }) => {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 glow-primary mb-6">
      <div className="flex items-center gap-2 mb-4 text-primary-400">
        <HelpCircle className="h-5 w-5 shrink-0" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
        {questionText}
      </h3>
    </div>
  );
};

export default QuestionCard;
