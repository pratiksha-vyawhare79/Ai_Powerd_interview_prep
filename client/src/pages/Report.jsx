import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import interviewService from '../services/interviewService';
import ScoreCard from '../components/report/ScoreCard/ScoreCard';
import FeedbackBlock from '../components/report/FeedbackBlock/FeedbackBlock';
import SuggestedAnswer from '../components/report/SuggestedAnswer/SuggestedAnswer';
import Loader from '../components/common/Loader/Loader';
import Button from '../components/common/Button/Button';
import { ArrowLeft, CheckCircle, BarChart3, HelpCircle } from 'lucide-react';

const Report = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await interviewService.getReport(sessionId);
        setSession(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch the interview assessment report.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [sessionId]);

  if (loading) {
    return <Loader size="lg" message="Loading interview report..." fullScreen />;
  }

  if (error || !session) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl">
        <h3 className="text-lg font-bold text-red-400 mb-2">Error Loading Report</h3>
        <p className="text-sm text-slate-400 mb-6">{error || 'Session not found.'}</p>
        <Button onClick={() => navigate('/dashboard')} fullWidth>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors text-sm mb-2 font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <h2 className="text-3xl font-extrabold text-white">Interview Assessment</h2>
          <p className="text-sm text-slate-400 mt-1">
            {session.targetRole} • {session.mode} Interview
          </p>
        </div>
        <Button onClick={() => navigate('/interview')} className="flex items-center gap-2">
          Start Another Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ScoreCard Block (Left/Top) */}
        <div className="lg:col-span-1">
          <ScoreCard score={session.overallScore} />
        </div>

        {/* Detailed Question breakdown (Right/Bottom) */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            Detailed Question Feedback
          </h3>
          
          {session.questions.map((q, idx) => (
            <div key={q._id || idx} className="space-y-2">
              <FeedbackBlock question={q} index={idx} />
              {q.suggestedAnswer && (
                <div className="ml-0 sm:ml-4 mb-8">
                  <SuggestedAnswer suggestedAnswer={q.suggestedAnswer} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
