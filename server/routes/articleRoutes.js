const express = require('express');
const router = express.Router();
const { getArticles, getArticle, createArticle, updateArticle, deleteArticle, getCategories } = require('../controllers/articleController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/categories/list', getCategories);
router.route('/').get(getArticles).post(protect, adminOnly, createArticle);
router.route('/:id').get(getArticle).put(protect, adminOnly, updateArticle).delete(protect, adminOnly, deleteArticle);

module.exports = router;
