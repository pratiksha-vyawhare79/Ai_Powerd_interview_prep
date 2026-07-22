const express = require('express');
const { startSession, submitAnswer, getReport } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/start', protect, startSession);
router.post('/submit-answer', protect, submitAnswer);
router.get('/report/:sessionId', protect, getReport);

module.exports = router;
