import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import interviewService from '../services/interviewService';
import useAuth from '../hooks/useAuth';
import StatsSummary from '../components/dashboard/StatsSummary/StatsSummary';
import SessionHistoryTable from '../components/dashboard/SessionHistoryTable/SessionHistoryTable';
import Loader from '../components/common/Loader/Loader';
import Button from '../components/common/Button/Button';
import { PlayCircle, ShieldAlert, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState({ sessions: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const historyData = await interviewService.getHistory();
        setData(historyData);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader size="lg" message="Loading dashboard..." fullScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white">
            Welcome, {user?.name || 'Candidate'}!
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Track your performance and launch mock preparation sessions.
          </p>
        </div>
        <Button
          onClick={() => navigate('/interview')}
          className="flex items-center gap-2"
        >
          <PlayCircle className="h-5 w-5" />
          Start New Practice
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 bg-red-900/30 border border-red-500/30 rounded-xl text-red-200 text-sm">
          <ShieldAlert className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Statistics Block */}
      <StatsSummary stats={data.stats} />

      {/* History Table block */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary-400" />
          Session History
        </h3>
        <SessionHistoryTable sessions={data.sessions} />
      </div>
    </div>
  );
};

export default Dashboard;
