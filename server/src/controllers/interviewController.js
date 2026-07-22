const InterviewSession = require('../models/InterviewSession');
const openaiService = require('../services/openaiService');

// @desc    Start a new interview session (generates questions)
// @route   POST /api/interview/start
// @access  Private
const startSession = async (req, res, next) => {
  const { targetRole, mode } = req.body;
  const userId = req.user.id;

  try {
    if (!targetRole || !mode) {
      res.status(400);
      throw new Error('Target role and mode are required');
    }

    // Generate questions using OpenAI
    const questionTexts = await openaiService.generateQuestions(targetRole, mode);

    const questions = questionTexts.map(text => ({
      questionText: text,
      userAnswer: '',
      answerType: '',
      aiScore: null,
      aiFeedback: '',
      suggestedAnswer: ''
    }));

    // Create session in Database
    const session = await InterviewSession.create({
      userId,
      targetRole,
      mode,
      questions,
      overallScore: null
    });

    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

// @desc    Submit user answer for a question and evaluate
// @route   POST /api/interview/submit-answer
// @access  Private
const submitAnswer = async (req, res, next) => {
  const { sessionId, questionIndex, userAnswer, answerType } = req.body;

  try {
    if (sessionId === undefined || questionIndex === undefined || userAnswer === undefined) {
      res.status(400);
      throw new Error('sessionId, questionIndex, and userAnswer are required');
    }

    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      res.status(404);
      throw new Error('Interview session not found');
    }

    // Check ownership
    if (session.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Not authorized to access this session');
    }

    if (questionIndex < 0 || questionIndex >= session.questions.length) {
      res.status(400);
      throw new Error('Invalid question index');
    }

    const question = session.questions[questionIndex];
    
    // Evaluate answer using OpenAI Service
    const evaluation = await openaiService.evaluateAnswer(question.questionText, userAnswer);

    // Update question details in DB
    question.userAnswer = userAnswer;
    question.answerType = answerType || 'text';
    question.aiScore = evaluation.overall || 0;
    question.aiFeedback = evaluation.feedback || '';
    question.suggestedAnswer = evaluation.suggestedAnswer || '';

    // Check if session is completed (all questions answered)
    const allQuestionsAnswered = session.questions.every(q => q.aiScore !== null);
    
    if (allQuestionsAnswered) {
      // Calculate overall score as average
      const totalScore = session.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0);
      session.overallScore = Math.round(totalScore / session.questions.length);
    }

    await session.save();

    res.status(200).json({
      evaluation,
      allQuestionsAnswered,
      overallScore: session.overallScore,
      session
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get report of an interview session
// @route   GET /api/interview/report/:sessionId
// @access  Private
const getReport = async (req, res, next) => {
  const { sessionId } = req.params;

  try {
    const session = await InterviewSession.findById(sessionId);

    if (!session) {
      res.status(404);
      throw new Error('Interview session not found');
    }

    // Check ownership
    if (session.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Not authorized to access this session');
    }

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startSession,
  submitAnswer,
  getReport
};
