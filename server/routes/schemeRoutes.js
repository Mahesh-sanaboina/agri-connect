const express = require('express');
const router = express.Router();
const { getSchemes, getScheme, createScheme, updateScheme, deleteScheme } = require('../controllers/schemeController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/').get(getSchemes).post(protect, adminOnly, createScheme);
router.route('/:id').get(getScheme).put(protect, adminOnly, updateScheme).delete(protect, adminOnly, deleteScheme);

module.exports = router;
