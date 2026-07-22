const InterviewSession = require('../models/InterviewSession');

// @desc    Get session history and dashboard statistics
// @route   GET /api/dashboard/history
// @access  Private
const getHistory = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Find all sessions for the user, sorted by date (newest first)
    const sessions = await InterviewSession.find({ userId }).sort({ createdAt: -1 });

    // Compute stats
    const totalSessions = sessions.length;
    const completedSessionsList = sessions.filter(s => s.overallScore !== null);
    const completedSessionsCount = completedSessionsList.length;

    let averageScore = 0;
    if (completedSessionsCount > 0) {
      const sum = completedSessionsList.reduce((acc, s) => acc + s.overallScore, 0);
      averageScore = Math.round(sum / completedSessionsCount);
    }

    // Role breakdown
    const roleCounts = {};
    sessions.forEach(s => {
      roleCounts[s.targetRole] = (roleCounts[s.targetRole] || 0) + 1;
    });

    // Mode breakdown
    const modeCounts = {
      Technical: 0,
      Behavioral: 0,
      Mixed: 0
    };
    sessions.forEach(s => {
      if (modeCounts[s.mode] !== undefined) {
        modeCounts[s.mode]++;
      }
    });

    res.status(200).json({
      sessions,
      stats: {
        totalSessions,
        completedSessions: completedSessionsCount,
        averageScore,
        roleBreakdown: roleCounts,
        modeBreakdown: modeCounts
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistory
};
