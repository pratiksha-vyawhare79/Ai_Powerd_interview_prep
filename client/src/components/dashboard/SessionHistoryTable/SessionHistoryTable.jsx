import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Briefcase, Award, Eye } from 'lucide-react';
import Button from '../../common/Button/Button';

const SessionHistoryTable = ({ sessions }) => {
  const navigate = useNavigate();

  if (!sessions || sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-900/50 border border-slate-800/80 rounded-2xl">
        <Briefcase className="h-10 w-10 text-slate-500 mb-3" />
        <h3 className="text-lg font-semibold text-slate-300">No session history yet</h3>
        <p className="text-sm text-slate-500 max-w-sm mt-1">
          Start your first AI-guided interview session to see your progress and results here.
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getScoreColor = (score) => {
    if (score === null) return 'text-amber-400 bg-amber-400/10 border-amber-500/20';
    if (score >= 80) return 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20';
    if (score >= 60) return 'text-sky-400 bg-sky-400/10 border-sky-500/20';
    return 'text-red-400 bg-red-400/10 border-red-500/20';
  };

  return (
    <div className="w-full overflow-hidden border border-slate-800/80 rounded-2xl bg-slate-900/40">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80">
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Target Role</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Mode</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Date & Time</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Overall Score</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {sessions.map((session) => (
              <tr key={session._id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg shrink-0">
                      <Briefcase className="h-4 w-4 text-primary-400" />
                    </div>
                    <span className="font-semibold text-slate-200">{session.targetRole}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 rounded-full">
                    {session.mode}
                  </span>
                </td>
                <td className="p-4 text-slate-400 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(session.createdAt)}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold border rounded-full ${getScoreColor(session.overallScore)}`}>
                    <Award className="h-3.5 w-3.5" />
                    {session.overallScore !== null ? `${session.overallScore}%` : 'In Progress'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/report/${session._id}`)}
                    className="flex items-center gap-1 ml-auto"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Report
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionHistoryTable;
