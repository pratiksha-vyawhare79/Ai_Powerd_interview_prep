import React from 'react';
import { Sparkles, MessageSquare, ShieldAlert, Award } from 'lucide-react';

const FeedbackBlock = ({ question, index }) => {
  const { questionText, userAnswer, aiScore, aiFeedback } = question;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
    if (score >= 60) return 'text-sky-400 border-sky-500/20 bg-sky-500/5';
    return 'text-red-400 border-red-500/20 bg-red-500/5';
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800/80 mb-6 transition-all duration-200 hover:border-slate-700/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/60">
        <h4 className="font-bold text-slate-200 text-base">
          Question {index + 1}
        </h4>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-bold ${getScoreColor(aiScore)}`}>
          <Award className="h-4 w-4" />
          Score: {aiScore !== null ? `${aiScore}%` : 'Pending'}
        </span>
      </div>

      <p className="text-sm text-slate-300 font-semibold mb-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
        "{questionText}"
      </p>

      <div className="space-y-4">
        {/* User Answer */}
        <div>
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider flex items-center gap-1.5 mb-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            Your Answer:
          </span>
          <p className="text-sm text-slate-300 bg-slate-900/20 p-3 rounded-lg border border-slate-800/30 whitespace-pre-line italic">
            {userAnswer ? `"${userAnswer}"` : 'No answer provided.'}
          </p>
        </div>

        {/* AI Feedback */}
        <div>
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider flex items-center gap-1.5 mb-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary-400" />
            AI Feedback & Critique:
          </span>
          <div className="text-sm text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed whitespace-pre-line">
            {aiFeedback || 'Feedback loading or not generated.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackBlock;
