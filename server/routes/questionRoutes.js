const express = require('express');
const router = express.Router();
const { getQuestions, askQuestion, answerQuestion, getMyQuestions, deleteQuestion } = require('../controllers/questionController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/').get(getQuestions).post(protect, askQuestion);
router.get('/my', protect, getMyQuestions);
router.put('/:id/answer', protect, answerQuestion);
router.delete('/:id', protect, deleteQuestion);

module.exports = router;
