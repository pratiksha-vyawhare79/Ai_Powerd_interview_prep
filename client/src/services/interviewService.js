import api from './api';

const startSession = async (targetRole, mode) => {
  const response = await api.post('/interview/start', { targetRole, mode });
  return response.data;
};

const submitAnswer = async (sessionId, questionIndex, userAnswer, answerType) => {
  const response = await api.post('/interview/submit-answer', {
    sessionId,
    questionIndex,
    userAnswer,
    answerType,
  });
  return response.data;
};

const getReport = async (sessionId) => {
  const response = await api.get(`/interview/report/${sessionId}`);
  return response.data;
};

const getHistory = async () => {
  const response = await api.get('/dashboard/history');
  return response.data;
};

const interviewService = {
  startSession,
  submitAnswer,
  getReport,
  getHistory,
};

export default interviewService;
