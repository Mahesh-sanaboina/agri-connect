const express = require('express');
const router = express.Router();
const {
  getCropPrices,
  getCropPrice,
  createCropPrice,
  updateCropPrice,
  deleteCropPrice,
  getCropNames,
  getCropPriceHistory,
  compareCropPrices,
  getCropStats
} = require('../controllers/cropController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/names/list', getCropNames);
router.get('/stats', getCropStats);
router.get('/compare', compareCropPrices);
router.get('/:id/history', getCropPriceHistory);

router.route('/')
  .get(getCropPrices)
  .post(protect, adminOnly, createCropPrice);

router.route('/:id')
  .get(getCropPrice)
  .put(protect, adminOnly, updateCropPrice)
  .delete(protect, adminOnly, deleteCropPrice);

module.exports = router;
