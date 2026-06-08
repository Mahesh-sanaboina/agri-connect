const User = require('../models/User');
const CropPrice = require('../models/CropPrice');
const Scheme = require('../models/Scheme');
const Article = require('../models/Article');
const Question = require('../models/Question');
const Product = require('../models/Product');

// @desc    Get dashboard analytics
// @route   GET /api/admin/dashboard
const getDashboard = async (req, res) => {
  try {
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const totalCrops = await CropPrice.countDocuments();
    const totalSchemes = await Scheme.countDocuments({ isActive: true });
    const totalArticles = await Article.countDocuments({ isPublished: true });
    const pendingQuestions = await Question.countDocuments({ status: 'pending' });
    const activeListings = await Product.countDocuments({ status: 'active' });

    // Recent registrations (last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newFarmers = await User.countDocuments({
      role: 'farmer',
      createdAt: { $gte: weekAgo }
    });

    // Popular crops
    const popularCrops = await CropPrice.aggregate([
      { $group: { _id: '$cropName', avgPrice: { $avg: '$price' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // User growth (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // State distribution
    const stateDistribution = await User.aggregate([
      { $group: { _id: '$state', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalFarmers,
          totalCrops,
          totalSchemes,
          totalArticles,
          pendingQuestions,
          activeListings,
          newFarmers
        },
        popularCrops,
        userGrowth,
        stateDistribution
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, total, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboard, getUsers };
