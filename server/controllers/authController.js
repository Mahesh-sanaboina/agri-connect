const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

// @desc    Register a new farmer
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, mobile, password, village, district, state, language } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this mobile number already exists' });
    }

    const user = await User.create({
      name, mobile, password, village, district, state, language
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        district: user.district,
        state: user.state,
        language: user.language,
        role: user.role,
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid mobile number or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid mobile number or password' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        district: user.district,
        state: user.state,
        language: user.language,
        role: user.role,
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedSchemes');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const { name, village, district, state, language, favoriteCrops } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (village) user.village = village;
    if (district) user.district = district;
    if (state) user.state = state;
    if (language) user.language = language;
    if (favoriteCrops) user.favoriteCrops = favoriteCrops;

    await user.save();
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, getProfile, updateProfile };
