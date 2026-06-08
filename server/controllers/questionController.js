const Question = require('../models/Question');

// @desc    Get all questions
// @route   GET /api/questions
const getQuestions = async (req, res) => {
  try {
    const { status, category } = req.query;
    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;

    const questions = await Question.find(query)
      .populate('userId', 'name district')
      .populate('answeredBy', 'name role')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Ask a question
// @route   POST /api/questions
const askQuestion = async (req, res) => {
  try {
    const { question, description, category, images } = req.body;
    const newQuestion = await Question.create({
      userId: req.user._id,
      question,
      description,
      category,
      images
    });

    const populatedQuestion = await Question.findById(newQuestion._id)
      .populate('userId', 'name district');

    res.status(201).json({ success: true, data: populatedQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Answer a question (Expert/Admin)
// @route   PUT /api/questions/:id/answer
const answerQuestion = async (req, res) => {
  try {
    const { answer } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    question.answer = answer;
    question.answeredBy = req.user._id;
    question.status = 'answered';
    await question.save();

    const populated = await Question.findById(question._id)
      .populate('userId', 'name district')
      .populate('answeredBy', 'name role');

    res.json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my questions
// @route   GET /api/questions/my
const getMyQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user._id })
      .populate('answeredBy', 'name role')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    // Only owner or admin can delete
    if (question.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Question.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getQuestions, askQuestion, answerQuestion, getMyQuestions, deleteQuestion };
