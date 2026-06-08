const CropPrice = require('../models/CropPrice');

// @desc    Get all crop prices with filters
// @route   GET /api/crops
const getCropPrices = async (req, res) => {
  try {
    const { search, state, district, market, category, sort } = req.query;
    let query = {};

    if (search) {
      query.cropName = { $regex: search, $options: 'i' };
    }
    if (state) {
      query.state = { $regex: state, $options: 'i' };
    }
    if (district) {
      query.district = { $regex: district, $options: 'i' };
    }
    if (market) {
      query.market = { $regex: market, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    let sortOption = { lastUpdated: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    if (sort === 'price-desc') sortOption = { price: -1 };
    if (sort === 'name') sortOption = { cropName: 1 };

    const crops = await CropPrice.find(query).sort(sortOption).limit(200);
    res.json({ success: true, count: crops.length, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single crop price
// @route   GET /api/crops/:id
const getCropPrice = async (req, res) => {
  try {
    const crop = await CropPrice.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop price not found' });
    }
    res.json({ success: true, data: crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get price history for charts
// @route   GET /api/crops/:id/history
const getCropPriceHistory = async (req, res) => {
  try {
    const crop = await CropPrice.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop price not found' });
    }
    // Sort history chronologically
    const history = crop.priceHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json({ success: true, cropName: crop.cropName, market: crop.market, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Compare prices across markets for same crop
// @route   GET /api/crops/compare
const compareCropPrices = async (req, res) => {
  try {
    const { cropName } = req.query;
    if (!cropName) {
      return res.status(400).json({ success: false, message: 'cropName query parameter is required' });
    }
    const crops = await CropPrice.find({ cropName: { $regex: `^${cropName}$`, $options: 'i' } }).sort({ price: 1 });
    res.json({ success: true, count: crops.length, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get aggregate stats
// @route   GET /api/crops/stats
const getCropStats = async (req, res) => {
  try {
    const totalCrops = (await CropPrice.distinct('cropName')).length;
    const totalMarkets = (await CropPrice.distinct('market')).length;
    const allCrops = await CropPrice.find({});
    
    // Sort all crops by percentage change to find top gainers and losers
    const cropsWithChange = allCrops.map(crop => {
      const diff = crop.price - crop.previousPrice;
      const pctChange = crop.previousPrice > 0 ? (diff / crop.previousPrice) * 100 : 0;
      return {
        _id: crop._id,
        cropName: crop.cropName,
        market: crop.market,
        state: crop.state,
        district: crop.district,
        price: crop.price,
        previousPrice: crop.previousPrice,
        pctChange: parseFloat(pctChange.toFixed(2)),
        changeAmount: diff,
        unit: crop.unit,
        trend: crop.trend
      };
    });

    const upCrops = cropsWithChange.filter(c => c.changeAmount > 0).length;
    const downCrops = cropsWithChange.filter(c => c.changeAmount < 0).length;
    const stableCrops = cropsWithChange.filter(c => c.changeAmount === 0).length;

    const topGainers = [...cropsWithChange]
      .filter(c => c.changeAmount > 0)
      .sort((a, b) => b.pctChange - a.pctChange)
      .slice(0, 5);

    const topLosers = [...cropsWithChange]
      .filter(c => c.changeAmount < 0)
      .sort((a, b) => a.pctChange - b.pctChange) // most negative first
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        totalCrops,
        totalMarkets,
        trends: { up: upCrops, down: downCrops, stable: stableCrops },
        topGainers,
        topLosers
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create crop price (Admin)
// @route   POST /api/crops
const createCropPrice = async (req, res) => {
  try {
    const { cropName, market, district, state, category, price, unit } = req.body;
    
    const existing = await CropPrice.findOne({ cropName, market, district, state });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Crop price entry already exists for this market. Please edit instead.' });
    }

    const priceNum = Number(price);
    const initialHistory = [{ date: new Date(), price: priceNum }];
    
    const crop = new CropPrice({
      cropName,
      market,
      district,
      state,
      category: category || 'Others',
      price: priceNum,
      previousPrice: priceNum,
      unit: unit || '₹/Quintal',
      minPrice: priceNum,
      maxPrice: priceNum,
      priceHistory: initialHistory,
      lastUpdated: new Date(),
      date: new Date()
    });

    await crop.save();
    res.status(201).json({ success: true, data: crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update crop price (Admin)
// @route   PUT /api/crops/:id
const updateCropPrice = async (req, res) => {
  try {
    const { price, cropName, market, district, state, category, unit } = req.body;
    const crop = await CropPrice.findById(req.params.id);
    
    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop price not found' });
    }

    if (price !== undefined) {
      const newPrice = Number(price);
      if (newPrice !== crop.price) {
        crop.previousPrice = crop.price;
        crop.price = newPrice;
        
        // Update price bounds
        if (crop.minPrice === undefined || newPrice < crop.minPrice) crop.minPrice = newPrice;
        if (crop.maxPrice === undefined || newPrice > crop.maxPrice) crop.maxPrice = newPrice;

        // Check if there is already a price history entry for today (ignore time part)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayIdx = crop.priceHistory.findIndex(h => {
          const d = new Date(h.date);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === today.getTime();
        });

        if (todayIdx >= 0) {
          crop.priceHistory[todayIdx].price = newPrice;
        } else {
          crop.priceHistory.push({ date: new Date(), price: newPrice });
        }
      }
    }

    // Update other details if provided
    if (cropName !== undefined) crop.cropName = cropName;
    if (market !== undefined) crop.market = market;
    if (district !== undefined) crop.district = district;
    if (state !== undefined) crop.state = state;
    if (category !== undefined) crop.category = category;
    if (unit !== undefined) crop.unit = unit;

    await crop.save();
    res.json({ success: true, data: crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete crop price (Admin)
// @route   DELETE /api/crops/:id
const deleteCropPrice = async (req, res) => {
  try {
    const crop = await CropPrice.findByIdAndDelete(req.params.id);
    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop price not found' });
    }
    res.json({ success: true, message: 'Crop price deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get crop names for search autocomplete
// @route   GET /api/crops/names/list
const getCropNames = async (req, res) => {
  try {
    const names = await CropPrice.distinct('cropName');
    res.json({ success: true, data: names });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCropPrices,
  getCropPrice,
  createCropPrice,
  updateCropPrice,
  deleteCropPrice,
  getCropNames,
  getCropPriceHistory,
  compareCropPrices,
  getCropStats
};
