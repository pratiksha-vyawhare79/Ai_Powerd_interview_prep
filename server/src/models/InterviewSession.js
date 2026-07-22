const mongoose = require('mongoose');

const QuestionDetailSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  userAnswer: {
    type: String,
    default: '',
  },
  answerType: {
    type: String,
    enum: ['text', 'voice', ''],
    default: '',
  },
  aiScore: {
    type: Number,
    min: 0,
    max: 100,
    default: null,
  },
  aiFeedback: {
    type: String,
    default: '',
  },
  suggestedAnswer: {
    type: String,
    default: '',
  },
});

const InterviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetRole: {
    type: String,
    required: true,
    trim: true,
  },
  mode: {
    type: String,
    required: true,
    enum: ['Technical', 'Behavioral', 'Mixed'],
    default: 'Technical',
  },
  questions: [QuestionDetailSchema],
  overallScore: {
    type: Number,
    min: 0,
    max: 100,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('InterviewSession', InterviewSessionSchema);
