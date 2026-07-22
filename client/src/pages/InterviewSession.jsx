import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import interviewService from '../services/interviewService';
import RoleSelector from '../components/interview/RoleSelector/RoleSelector';
import QuestionCard from '../components/interview/QuestionCard/QuestionCard';
import AnswerInput from '../components/interview/AnswerInput/AnswerInput';
import ProgressBar from '../components/interview/ProgressBar/ProgressBar';
import Loader from '../components/common/Loader/Loader';
import { MessageSquare, ArrowLeft, ShieldAlert } from 'lucide-react';
import Button from '../components/common/Button/Button';

const InterviewSession = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [error, setError] = useState('');

  // Start interview session
  const handleStartSession = async (role, mode) => {
    setLoading(true);
    setError('');
    try {
      const newSession = await interviewService.startSession(role, mode);
      setSession(newSession);
      setCurrentQuestionIndex(0);
    } catch (err) {
      console.error(err);
      setError('Failed to start interview session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Submit current answer
  const handleSubmitAnswer = async (answerType) => {
    if (!userAnswer.trim() || !session) return;
    
    setSubmittingAnswer(true);
    setError('');
    try {
      const response = await interviewService.submitAnswer(
        session._id,
        currentQuestionIndex,
        userAnswer,
        answerType
      );

      // If all questions are answered, navigate to report
      if (response.allQuestionsAnswered) {
        navigate(`/report/${session._id}`);
      } else {
        // Move to next question, clear input text
        setCurrentQuestionIndex((prev) => prev + 1);
        setUserAnswer('');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit response. Please try again.');
    } finally {
      setSubmittingAnswer(false);
    }
  };

  if (loading) {
    return <Loader size="lg" message="AI is preparing custom questions..." fullScreen />;
  }

  if (submittingAnswer) {
    return (
      <Loader
        size="lg"
        message="AI is analyzing your response for relevance, clarity, and scoring..."
        fullScreen
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => {
          if (session && !window.confirm('Are you sure you want to exit? Your progress in this session will not be completed.')) {
            return;
          }
          navigate('/dashboard');
        }}
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors text-sm mb-6 font-semibold uppercase tracking-wider"
      >
        <ArrowLeft className="h-4 w-4" />
        Exit Session
      </button>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 bg-red-900/30 border border-red-500/30 rounded-xl text-red-200 text-sm">
          <ShieldAlert className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!session ? (
        // Setup Stage
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 mb-4 text-primary-400">
            <MessageSquare className="h-6 w-6" />
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wide">
              Configure Mock Interview
            </h2>
          </div>
          <p className="text-sm text-slate-400 mb-6">
            Choose your target professional title and selection style. PrepAI will build custom questions matching real-world screening contexts.
          </p>
          <RoleSelector onStartSession={handleStartSession} loading={loading} />
        </div>
      ) : (
        // In Progress Stage
        <div className="space-y-6">
          <ProgressBar current={currentQuestionIndex + 1} total={session.questions.length} />

          <QuestionCard
            questionText={session.questions[currentQuestionIndex].questionText}
            currentIndex={currentQuestionIndex}
            totalQuestions={session.questions.length}
          />

          <AnswerInput
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={handleSubmitAnswer}
            isSubmitting={submittingAnswer}
          />
        </div>
      )}
    </div>
  );
};

export default InterviewSession;
