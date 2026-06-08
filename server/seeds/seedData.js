const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('../models/User');
const CropPrice = require('../models/CropPrice');
const Scheme = require('../models/Scheme');
const Article = require('../models/Article');
const Question = require('../models/Question');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected for seeding...');
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await CropPrice.deleteMany({});
    await Scheme.deleteMany({});
    await Article.deleteMany({});
    await Question.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      mobile: '9999999999',
      password: 'admin123',
      district: 'Hyderabad',
      state: 'Telangana',
      language: 'en',
      role: 'admin'
    });

    // Create expert user
    const expert = await User.create({
      name: 'Dr. Rajesh Kumar',
      mobile: '9888888888',
      password: 'expert123',
      village: 'Agricultural University Campus',
      district: 'Hyderabad',
      state: 'Telangana',
      language: 'en',
      role: 'expert'
    });

    // Create sample farmers
    const farmers = await User.insertMany([
      { name: 'Ramesh Patel', mobile: '9876543210', password: await bcrypt.hash('farmer123', 10), village: 'Kotha Guda', district: 'Warangal', state: 'Telangana', language: 'te' },
      { name: 'Suresh Reddy', mobile: '9876543211', password: await bcrypt.hash('farmer123', 10), village: 'Lingampally', district: 'Rangareddy', state: 'Telangana', language: 'te' },
      { name: 'Lakshmi Devi', mobile: '9876543212', password: await bcrypt.hash('farmer123', 10), village: 'Sadasivpet', district: 'Medak', state: 'Telangana', language: 'hi' },
      { name: 'Kumar Swamy', mobile: '9876543213', password: await bcrypt.hash('farmer123', 10), village: 'Mancherial', district: 'Mancherial', state: 'Telangana', language: 'te' },
      { name: 'Anjali Singh', mobile: '9876543214', password: await bcrypt.hash('farmer123', 10), village: 'Barabanki', district: 'Lucknow', state: 'Uttar Pradesh', language: 'hi' }
    ]);

    console.log('👤 Created users');

    // Seed Crop Prices
    const generatePriceHistoryData = (startPrice, days = 30) => {
      const history = [];
      let currentPrice = startPrice;
      const today = new Date();
      
      for (let i = days; i > 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(12, 0, 0, 0);
        
        // Random fluctuation between -2.5% and +3.5%
        const changePercent = (Math.random() * 6.0 - 2.5) / 100;
        currentPrice = Math.round(currentPrice * (1 + changePercent));
        
        history.push({
          date,
          price: currentPrice
        });
      }
      
      // Today's price
      const todayDate = new Date(today);
      todayDate.setHours(12, 0, 0, 0);
      const changePercent = (Math.random() * 6.0 - 2.5) / 100;
      currentPrice = Math.round(currentPrice * (1 + changePercent));
      history.push({
        date: todayDate,
        price: currentPrice
      });

      return history;
    };

    const cropDefinitions = [
      { cropName: 'Rice (Paddy)', category: 'Cereals', market: 'Warangal', district: 'Warangal', state: 'Telangana', startPrice: 2100, unit: '₹/Quintal' },
      { cropName: 'Rice (Paddy)', category: 'Cereals', market: 'Nizamabad', district: 'Nizamabad', state: 'Telangana', startPrice: 2080, unit: '₹/Quintal' },
      { cropName: 'Wheat', category: 'Cereals', market: 'Delhi', district: 'New Delhi', state: 'Delhi', startPrice: 2150, unit: '₹/Quintal' },
      { cropName: 'Wheat', category: 'Cereals', market: 'Indore', district: 'Indore', state: 'Madhya Pradesh', startPrice: 2120, unit: '₹/Quintal' },
      { cropName: 'Maize', category: 'Cereals', market: 'Karimnagar', district: 'Karimnagar', state: 'Telangana', startPrice: 1950, unit: '₹/Quintal' },
      { cropName: 'Maize', category: 'Cereals', market: 'Davangere', district: 'Davangere', state: 'Karnataka', startPrice: 2000, unit: '₹/Quintal' },
      { cropName: 'Cotton', category: 'Cash Crops', market: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', startPrice: 6800, unit: '₹/Quintal' },
      { cropName: 'Cotton', category: 'Cash Crops', market: 'Adilabad', district: 'Adilabad', state: 'Telangana', startPrice: 6750, unit: '₹/Quintal' },
      { cropName: 'Groundnut', category: 'Pulses', market: 'Junagadh', district: 'Junagadh', state: 'Gujarat', startPrice: 5100, unit: '₹/Quintal' },
      { cropName: 'Groundnut', category: 'Pulses', market: 'Kurnool', district: 'Kurnool', state: 'Andhra Pradesh', startPrice: 5200, unit: '₹/Quintal' },
      { cropName: 'Tomato', category: 'Vegetables', market: 'Madanapalle', district: 'Chittoor', state: 'Andhra Pradesh', startPrice: 1500, unit: '₹/Quintal' },
      { cropName: 'Tomato', category: 'Vegetables', market: 'Kolar', district: 'Kolar', state: 'Karnataka', startPrice: 1600, unit: '₹/Quintal' },
      { cropName: 'Onion', category: 'Vegetables', market: 'Nashik', district: 'Nashik', state: 'Maharashtra', startPrice: 1300, unit: '₹/Quintal' },
      { cropName: 'Onion', category: 'Vegetables', market: 'Kurnool', district: 'Kurnool', state: 'Andhra Pradesh', startPrice: 1250, unit: '₹/Quintal' },
      { cropName: 'Potato', category: 'Vegetables', market: 'Agra', district: 'Agra', state: 'Uttar Pradesh', startPrice: 1100, unit: '₹/Quintal' },
      { cropName: 'Potato', category: 'Vegetables', market: 'Hooghly', district: 'Hooghly', state: 'West Bengal', startPrice: 1150, unit: '₹/Quintal' },
      { cropName: 'Chilli', category: 'Spices', market: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', startPrice: 11000, unit: '₹/Quintal' },
      { cropName: 'Chilli', category: 'Spices', market: 'Khammam', district: 'Khammam', state: 'Telangana', startPrice: 10800, unit: '₹/Quintal' },
      { cropName: 'Mango', category: 'Fruits', market: 'Vijayawada', district: 'Krishna', state: 'Andhra Pradesh', startPrice: 60, unit: '₹/Kg' },
      { cropName: 'Mango', category: 'Fruits', market: 'Ratnagiri', district: 'Ratnagiri', state: 'Maharashtra', startPrice: 150, unit: '₹/Kg' },
      { cropName: 'Soybean', category: 'Cash Crops', market: 'Indore', district: 'Indore', state: 'Madhya Pradesh', startPrice: 4400, unit: '₹/Quintal' },
      { cropName: 'Turmeric', category: 'Spices', market: 'Nizamabad', district: 'Nizamabad', state: 'Telangana', startPrice: 7900, unit: '₹/Quintal' },
      { cropName: 'Sugarcane', category: 'Cash Crops', market: 'Kolhapur', district: 'Kolhapur', state: 'Maharashtra', startPrice: 310, unit: '₹/Quintal' },
      { cropName: 'Mustard', category: 'Cash Crops', market: 'Alwar', district: 'Alwar', state: 'Rajasthan', startPrice: 4800, unit: '₹/Quintal' },
      { cropName: 'Jowar (Sorghum)', category: 'Cereals', market: 'Solapur', district: 'Solapur', state: 'Maharashtra', startPrice: 2800, unit: '₹/Quintal' },
      { cropName: 'Bajra (Pearl Millet)', category: 'Cereals', market: 'Jaipur', district: 'Jaipur', state: 'Rajasthan', startPrice: 1800, unit: '₹/Quintal' },
      { cropName: 'Ragi (Finger Millet)', category: 'Cereals', market: 'Bangalore', district: 'Bangalore Rural', state: 'Karnataka', startPrice: 3200, unit: '₹/Quintal' },
      { cropName: 'Barley', category: 'Cereals', market: 'Sirsa', district: 'Sirsa', state: 'Haryana', startPrice: 1900, unit: '₹/Quintal' },
      { cropName: 'Gram (Chana)', category: 'Pulses', market: 'Akola', district: 'Akola', state: 'Maharashtra', startPrice: 4600, unit: '₹/Quintal' },
      { cropName: 'Tur (Arhar)', category: 'Pulses', market: 'Kalaburagi', district: 'Kalaburagi', state: 'Karnataka', startPrice: 7000, unit: '₹/Quintal' },
      { cropName: 'Moong (Green Gram)', category: 'Pulses', market: 'Jalgaon', district: 'Jalgaon', state: 'Maharashtra', startPrice: 6800, unit: '₹/Quintal' },
      { cropName: 'Urad (Black Gram)', category: 'Pulses', market: 'Latur', district: 'Latur', state: 'Maharashtra', startPrice: 6900, unit: '₹/Quintal' },
      { cropName: 'Sunflower', category: 'Cash Crops', market: 'Chitradurga', district: 'Chitradurga', state: 'Karnataka', startPrice: 5500, unit: '₹/Quintal' },
      { cropName: 'Garlic', category: 'Spices', market: 'Mandsaur', district: 'Mandsaur', state: 'Madhya Pradesh', startPrice: 6000, unit: '₹/Quintal' },
      { cropName: 'Ginger', category: 'Spices', market: 'Wayanad', district: 'Wayanad', state: 'Kerala', startPrice: 80, unit: '₹/Kg' },
      { cropName: 'Coriander', category: 'Spices', market: 'Kota', district: 'Kota', state: 'Rajasthan', startPrice: 6500, unit: '₹/Quintal' },
      { cropName: 'Apple', category: 'Fruits', market: 'Shimla', district: 'Shimla', state: 'Himachal Pradesh', startPrice: 100, unit: '₹/Kg' },
      { cropName: 'Banana', category: 'Fruits', market: 'Jalgaon', district: 'Jalgaon', state: 'Maharashtra', startPrice: 15, unit: '₹/Kg' },
      { cropName: 'Orange', category: 'Fruits', market: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', startPrice: 40, unit: '₹/Kg' },
      { cropName: 'Pomegranate', category: 'Fruits', market: 'Nashik', district: 'Nashik', state: 'Maharashtra', startPrice: 90, unit: '₹/Kg' }
    ];

    const cropPricesToSeed = [];
    for (const def of cropDefinitions) {
      const history = generatePriceHistoryData(def.startPrice, 30);
      const prices = history.map(h => h.price);
      const price = prices[prices.length - 1];
      const previousPrice = prices[prices.length - 2];
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      let trend = 'stable';
      if (price > previousPrice) trend = 'up';
      else if (price < previousPrice) trend = 'down';

      cropPricesToSeed.push({
        cropName: def.cropName,
        market: def.market,
        district: def.district,
        state: def.state,
        category: def.category,
        price,
        previousPrice,
        unit: def.unit,
        trend,
        minPrice,
        maxPrice,
        priceHistory: history,
        lastUpdated: new Date(),
        date: new Date()
      });
    }

    const cropPrices = await CropPrice.insertMany(cropPricesToSeed);

    console.log('🌾 Created crop prices');

    // Seed Government Schemes
    const schemes = await Scheme.insertMany([
      {
        title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
        description: 'Under this scheme, the government provides income support of ₹6,000 per year to all farmer families across the country. The amount is paid in three equal installments of ₹2,000 each, directly transferred to the bank accounts of the beneficiaries.',
        eligibility: 'All landholding farmer families with cultivable land. Certain categories are excluded: institutional landholders, farmer families holding constitutional posts, those serving/retired from government service, professionals like doctors, engineers, lawyers, chartered accountants, and income tax payers.',
        benefits: '₹6,000 per year in three installments of ₹2,000 each directly to bank account. No middlemen involved.',
        documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details', 'Mobile Number'],
        applicationProcess: 'Visit the nearest Common Service Centre (CSC) or register online at pmkisan.gov.in. Verification is done by State/UT governments.',
        applyLink: 'https://pmkisan.gov.in',
        category: 'subsidy',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        description: 'A crop insurance scheme providing comprehensive risk coverage against crop loss due to natural calamities, pests, and diseases. Farmers pay a minimal premium while the government subsidizes the remaining amount.',
        eligibility: 'All farmers including sharecroppers and tenant farmers growing notified crops in notified areas. Both loanee and non-loanee farmers can enroll.',
        benefits: 'Premium rates: 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops. Full sum insured in case of total crop loss.',
        documents: ['Land Records / Land Lease Agreement', 'Aadhaar Card', 'Bank Passbook', 'Sowing Certificate', 'Crop Details'],
        applicationProcess: 'Apply through your bank, Common Service Centre (CSC), or online at pmfby.gov.in before the cut-off date for the season.',
        applyLink: 'https://pmfby.gov.in',
        category: 'insurance',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        title: 'Soil Health Card Scheme',
        description: 'The Soil Health Card Scheme provides soil health cards to farmers carrying crop-wise recommendations of nutrients and fertilizers required for individual farms. This helps farmers to improve productivity through judicious use of inputs.',
        eligibility: 'All farmers across India. Soil samples are collected from farms and tested in laboratories.',
        benefits: 'Free soil testing, nutrient recommendations, fertilizer advice for each crop type. Helps reduce input costs and improve yields.',
        documents: ['Aadhaar Card', 'Land Details', 'Contact Information'],
        applicationProcess: 'Contact your nearest Krishi Vigyan Kendra (KVK) or Agriculture Department office. Soil samples will be collected and analyzed.',
        applyLink: 'https://soilhealth.dac.gov.in',
        category: 'other',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        title: 'Kisan Credit Card (KCC)',
        description: 'Kisan Credit Card provides farmers with timely and adequate credit support for their cultivation and other needs. It offers short-term credit for crop production, post-harvest expenses, and consumption requirements.',
        eligibility: 'All farmers – individuals or joint borrowers who are owner cultivators, tenant farmers, oral lessees, or sharecroppers.',
        benefits: 'Credit limit up to ₹3 lakh at subsidized interest rate of 4% (with prompt repayment). Crop insurance cover, accident insurance of ₹50,000.',
        documents: ['Identity Proof (Aadhaar/Voter ID)', 'Address Proof', 'Land Documents', 'Passport Size Photos', 'Application Form'],
        applicationProcess: 'Apply at any commercial bank, cooperative bank, or Regional Rural Bank. Can also apply online through bank portals.',
        applyLink: 'https://pmkisan.gov.in/KCC.aspx',
        category: 'loan',
        ministry: 'Ministry of Finance'
      },
      {
        title: 'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
        description: 'Aimed at ensuring access to protective irrigation for every farm ("Har Khet Ko Pani") and improving water use efficiency ("Per Drop More Crop"). Provides support for micro-irrigation systems.',
        eligibility: 'All farmers with focus on small and marginal farmers. Priority given to drought-prone and water-scarce areas.',
        benefits: 'Subsidy of 55% for small/marginal farmers and 45% for other farmers on drip and sprinkler irrigation systems.',
        documents: ['Land Records', 'Aadhaar Card', 'Bank Account', 'Caste Certificate (if applicable)', 'Farm Map'],
        applicationProcess: 'Apply through District Agriculture Office or online through the state agriculture portal.',
        applyLink: 'https://pmksy.gov.in',
        category: 'subsidy',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        title: 'National Mission on Sustainable Agriculture (NMSA)',
        description: 'Focuses on making agriculture more productive, sustainable, remunerative, and climate resilient by promoting location-specific integrated farming systems.',
        eligibility: 'Farmers and farmer groups interested in sustainable agriculture practices including organic farming, soil health management, and water use efficiency.',
        benefits: 'Financial assistance for organic farming inputs, vermicompost units, water harvesting structures, and training programs.',
        documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details', 'Farming Details'],
        applicationProcess: 'Contact the State Agriculture Department or District Agriculture Officer.',
        applyLink: 'https://nmsa.dac.gov.in',
        category: 'subsidy',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      }
    ]);

    console.log('🏛️  Created government schemes');

    // Seed Articles
    const articles = await Article.insertMany([
      {
        title: 'Complete Guide to Rice (Paddy) Farming in India',
        content: `Rice is the most important staple food crop in India. Here is a comprehensive guide to successful rice farming:\n\n## Land Preparation\n- Plow the field 2-3 times to get fine tilth\n- Level the field for uniform water distribution\n- Apply 10-12 tonnes of well-decomposed FYM per hectare\n\n## Seed Selection\n- Choose high-yielding varieties suited to your region\n- Popular varieties: Sona Masuri, BPT 5204, IR 64, Pusa Basmati\n- Seed rate: 20-25 kg/hectare for transplanting\n\n## Nursery Management\n- Raise nursery in wet beds\n- Sow seeds 20-25 days before transplanting\n- Apply recommended fertilizers to nursery\n\n## Transplanting\n- Transplant 20-25 day old seedlings\n- Maintain 20x15 cm spacing\n- Plant 2-3 seedlings per hill\n\n## Water Management\n- Maintain 5 cm standing water after transplanting\n- Drain field before harvesting\n- Use alternate wetting and drying method to save water\n\n## Fertilizer Schedule\n- Basal: 60 kg N + 30 kg P2O5 + 30 kg K2O per hectare\n- Top dressing: 30 kg N at tillering, 30 kg N at panicle initiation\n\n## Pest Management\n- Monitor regularly for stem borer, leaf folder, and BPH\n- Use integrated pest management practices\n- Apply pesticides only when pest population exceeds ETL`,
        summary: 'Learn everything about rice farming from land preparation to harvesting with detailed steps for Indian conditions.',
        category: 'crop-cultivation',
        subcategory: 'Rice Farming',
        tags: ['rice', 'paddy', 'kharif', 'staple crop'],
        author: 'Dr. Rajesh Kumar'
      },
      {
        title: 'Cotton Farming: Best Practices for Maximum Yield',
        content: `Cotton is one of the most important commercial crops in India. Follow these practices for high yields:\n\n## Climate Requirements\n- Temperature: 21-30°C during growing season\n- Rainfall: 600-1200mm well distributed\n- Frost-free period of at least 200 days\n\n## Soil Requirements\n- Deep black cotton soils are ideal\n- pH: 6.0-8.0\n- Good drainage is essential\n\n## Varieties\n- Bt Cotton hybrids are widely grown\n- Choose varieties resistant to bollworm\n- Popular: Bollgard II, RCH varieties\n\n## Sowing Time\n- Kharif season: May-June (with onset of monsoon)\n- Irrigated: April-May\n\n## Spacing\n- 90-120 cm between rows\n- 45-60 cm between plants\n\n## Nutrient Management\n- Apply 120:60:60 NPK kg/ha\n- Split nitrogen into 3 doses\n- Foliar spray of micronutrients at flowering\n\n## Irrigation\n- Critical stages: flowering and boll development\n- Drip irrigation gives best results\n- Avoid waterlogging`,
        summary: 'Master cotton farming with expert tips on varieties, spacing, nutrients, and pest management for Indian farmers.',
        category: 'crop-cultivation',
        subcategory: 'Cotton Farming',
        tags: ['cotton', 'commercial crop', 'kharif'],
        author: 'AgriConnect Expert'
      },
      {
        title: 'Organic Farming: Natural Fertilizers and Pesticides',
        content: `Organic farming is sustainable and profitable. Here is your guide to going organic:\n\n## Benefits of Organic Farming\n- Higher market price for organic produce\n- Reduced input costs over time\n- Better soil health\n- Environmental sustainability\n- Healthier food\n\n## Natural Fertilizers\n\n### Vermicompost\n- Use earthworms to convert organic waste into compost\n- Apply 5-10 tonnes per hectare\n- Rich in NPK and micronutrients\n\n### Jeevamrutha\n- Mix 10 kg cow dung + 10 liters cow urine + 2 kg jaggery + 2 kg pulse flour + handful of soil in 200 liters water\n- Ferment for 3-5 days\n- Apply to soil every 15 days\n\n### Green Manure\n- Grow leguminous crops like dhaincha, sunhemp\n- Incorporate into soil before flowering\n- Adds 40-60 kg nitrogen per hectare\n\n## Natural Pesticides\n\n### Neem-based Solutions\n- Neem seed kernel extract (NSKE) 5%\n- Neem oil 2-3 ml/liter\n- Effective against most sucking pests\n\n### Panchagavya\n- Traditional preparation from cow products\n- Growth promoter and disease preventive\n- Spray at 3% concentration`,
        summary: 'Complete guide to organic farming including natural fertilizers like vermicompost, jeevamrutha, and organic pesticides.',
        category: 'organic-farming',
        tags: ['organic', 'natural farming', 'sustainable'],
        author: 'AgriConnect Expert'
      },
      {
        title: 'Drip Irrigation: Save Water, Increase Yield',
        content: `Drip irrigation is the most efficient method of watering crops. Here is everything you need to know:\n\n## What is Drip Irrigation?\nA system that delivers water directly to the root zone of plants through a network of pipes, valves, and emitters.\n\n## Benefits\n- Saves 30-60% water compared to flood irrigation\n- Increases yield by 20-40%\n- Reduces weed growth\n- Enables fertigation (fertilizer through drip)\n- Suitable for hilly and undulating terrain\n\n## Components\n1. Water source (well, borewell, tank)\n2. Pump and filtration system\n3. Main line (PVC pipes)\n4. Sub-main lines\n5. Lateral lines (LLDPE pipes)\n6. Emitters/drippers\n\n## Government Subsidy\n- 55% subsidy for small and marginal farmers\n- 45% for other farmers\n- Apply through PMKSY scheme\n\n## Suitable Crops\n- Vegetables: Tomato, chilli, capsicum, brinjal\n- Fruits: Mango, pomegranate, banana, papaya\n- Commercial: Cotton, sugarcane, turmeric\n\n## Maintenance Tips\n- Clean filters regularly\n- Flush laterals monthly\n- Check for clogged emitters\n- Protect from rodent damage`,
        summary: 'Learn about drip irrigation systems, benefits, government subsidies, and maintenance for Indian farming conditions.',
        category: 'modern-farming',
        subcategory: 'Drip Irrigation',
        tags: ['irrigation', 'water saving', 'modern farming', 'drip'],
        author: 'AgriConnect Expert'
      },
      {
        title: 'Tomato Farming: From Seed to Market',
        content: `Tomato is one of the most profitable vegetable crops. Here is a complete guide:\n\n## Climate\n- Temperature: 20-25°C (optimum)\n- Can tolerate 15-35°C\n- Frost sensitive\n\n## Varieties\n- Hybrid: Arka Rakshak, NS 501, TO-1057\n- Determinate varieties for processing\n- Indeterminate for fresh market\n\n## Nursery\n- Sow seeds in protray or raised beds\n- Transplant 25-30 day old seedlings\n- Harden seedlings before transplanting\n\n## Spacing\n- 60x45 cm (open field)\n- 45x30 cm (polyhouse)\n\n## Staking\n- Essential for indeterminate varieties\n- Use bamboo stakes or GI wire\n- Improves fruit quality and reduces diseases\n\n## Common Diseases\n1. **Leaf Blight** - Brown spots on leaves\n2. **Fusarium Wilt** - Yellowing and wilting\n3. **Bacterial Wilt** - Sudden wilting without yellowing\n4. **Tomato Leaf Curl Virus** - Curling of leaves, stunted growth\n\n## Harvesting\n- Start 60-70 days after transplanting\n- Pick at breaker stage for distant markets\n- At red ripe stage for local markets\n\n## Yield\n- Open field: 40-60 tonnes/hectare\n- Polyhouse: 80-120 tonnes/hectare`,
        summary: 'Complete tomato farming guide covering varieties, nursery management, diseases, and yield expectations.',
        category: 'crop-cultivation',
        subcategory: 'Tomato Farming',
        tags: ['tomato', 'vegetable', 'profitable crop'],
        author: 'Dr. Rajesh Kumar'
      },
      {
        title: 'Understanding Soil Health: pH, Nutrients, and Testing',
        content: `Healthy soil is the foundation of successful farming. Learn about soil testing and management:\n\n## Why Soil Testing?\n- Know your soil nutrient status\n- Apply right fertilizers in right amounts\n- Save money on unnecessary inputs\n- Improve crop productivity\n\n## Key Soil Parameters\n\n### pH (Acidity/Alkalinity)\n- **Acidic (< 6.5)**: Add lime to correct\n- **Neutral (6.5-7.5)**: Ideal for most crops\n- **Alkaline (> 7.5)**: Add gypsum to correct\n\n### Major Nutrients\n- **Nitrogen (N)**: Leaf growth, green color\n- **Phosphorus (P)**: Root development, flowering\n- **Potassium (K)**: Fruit quality, disease resistance\n\n### Secondary Nutrients\n- Calcium, Magnesium, Sulphur\n\n### Micronutrients\n- Iron, Zinc, Boron, Manganese, Copper, Molybdenum\n\n## Soil Types in India\n1. **Alluvial Soil**: Most fertile, found in Indo-Gangetic plains\n2. **Black Soil**: Best for cotton, found in Deccan plateau\n3. **Red Soil**: Good for millets, found in southern India\n4. **Laterite Soil**: Acidic, needs amendment\n\n## How to Collect Soil Sample\n1. Collect from 15 cm depth\n2. Take samples from 8-10 spots\n3. Mix all samples thoroughly\n4. Take 500g representative sample\n5. Air dry and send to lab`,
        summary: 'Understanding soil health including pH levels, nutrients, soil types, and proper soil testing procedures.',
        category: 'soil-health',
        tags: ['soil', 'testing', 'nutrients', 'pH'],
        author: 'AgriConnect Expert'
      },
      {
        title: 'Hydroponics: Growing Crops Without Soil',
        content: `Hydroponics is a revolutionary farming technique that grows plants without soil using nutrient-rich water solutions.\n\n## What is Hydroponics?\nA method of growing plants in water-based, nutrient-rich solutions without soil. The roots are supported using inert media like perlite, clay pellets, or rockwool.\n\n## Types of Systems\n1. **Deep Water Culture (DWC)**: Plants float on nutrient solution\n2. **NFT (Nutrient Film Technique)**: Thin film of nutrients flows over roots\n3. **Drip System**: Nutrient solution dripped to each plant\n4. **Ebb and Flow**: Periodic flooding and draining\n\n## Advantages\n- 90% less water usage\n- 3-10x higher yields\n- No soil-borne diseases\n- Year-round production\n- Less space required\n\n## Suitable Crops\n- Leafy greens: Lettuce, spinach, basil\n- Herbs: Mint, coriander, parsley\n- Vegetables: Tomato, cucumber, capsicum\n- Strawberries\n\n## Investment\n- Small setup (100 sq ft): ₹50,000 - ₹1,00,000\n- Medium setup (500 sq ft): ₹2,00,000 - ₹5,00,000\n- Commercial (1000+ sq ft): ₹10,00,000+\n\n## ROI\n- Break-even: 1-2 years\n- Premium pricing for hydroponic produce\n- Growing market demand in Indian cities`,
        summary: 'Introduction to hydroponic farming including systems, suitable crops, investment details, and ROI for Indian farmers.',
        category: 'modern-farming',
        subcategory: 'Hydroponics',
        tags: ['hydroponics', 'soilless', 'modern farming', 'technology'],
        author: 'AgriConnect Expert'
      },
      {
        title: 'Integrated Pest Management (IPM) for Indian Crops',
        content: `IPM is a sustainable approach to manage pests by combining biological, cultural, physical, and chemical tools.\n\n## Principles of IPM\n1. **Prevention**: Use resistant varieties, proper spacing, crop rotation\n2. **Monitoring**: Regular field scouting for pest detection\n3. **Identification**: Correctly identify pest before treatment\n4. **Action**: Use appropriate control method\n\n## Biological Control\n- **Trichogramma**: Parasitoid for bollworm control\n- **Chrysoperla**: Predator for aphids and whiteflies\n- **Trichoderma**: Biocontrol agent for soil-borne diseases\n- **Pseudomonas**: Biological fungicide\n\n## Cultural Control\n- Crop rotation\n- Intercropping\n- Trap crops\n- Timely sowing and harvesting\n- Field sanitation\n\n## Physical Control\n- Yellow sticky traps for whiteflies\n- Pheromone traps for moths\n- Light traps for nocturnal insects\n- Bird perches for predatory birds\n\n## Chemical Control (Last Resort)\n- Use only when pest population exceeds ETL\n- Choose selective pesticides\n- Follow recommended dosage\n- Observe waiting period before harvest`,
        summary: 'Complete guide to Integrated Pest Management combining biological, cultural, and chemical methods for Indian agriculture.',
        category: 'pest-management',
        tags: ['pest management', 'IPM', 'biological control'],
        author: 'Dr. Rajesh Kumar'
      }
    ]);

    console.log('📚 Created articles');

    // Seed Questions
    await Question.insertMany([
      {
        userId: farmers[0]._id,
        question: 'My tomato plants are turning yellow. What should I do?',
        description: 'The lower leaves of my tomato plants are turning yellow and falling off. The plants are about 45 days old.',
        category: 'disease',
        answer: 'Yellowing of lower leaves in tomatoes can be caused by: 1) Nitrogen deficiency - Apply urea at 10g per plant, 2) Fusarium wilt - If wilting accompanies yellowing, uproot affected plants and apply Trichoderma, 3) Overwatering - Ensure proper drainage. Check for any spots on leaves which could indicate fungal infection.',
        answeredBy: expert._id,
        status: 'answered'
      },
      {
        userId: farmers[1]._id,
        question: 'Which fertilizer is best for cotton at flowering stage?',
        description: 'My cotton crop is at 60 days and starting to flower. What fertilizer should I apply now?',
        category: 'fertilizer',
        answer: 'At flowering stage of cotton, apply: 1) 30 kg Nitrogen per hectare as top dressing, 2) Foliar spray of 2% DAP (Di-ammonium Phosphate), 3) Micronutrient mixture containing Zinc and Boron. Avoid excess nitrogen as it promotes vegetative growth at the expense of bolls.',
        answeredBy: expert._id,
        status: 'answered'
      },
      {
        userId: farmers[2]._id,
        question: 'How to control whitefly in chilli crop?',
        description: 'My chilli plants have heavy whitefly infestation. Leaves are curling up.',
        category: 'pest',
        status: 'pending'
      },
      {
        userId: farmers[3]._id,
        question: 'Best time to sow maize in Telangana?',
        description: 'I want to grow maize in my field. When is the best time to sow in our region?',
        category: 'general',
        status: 'pending'
      }
    ]);

    console.log('❓ Created questions');
    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: mobile=9999999999, password=admin123');
    console.log('Expert: mobile=9888888888, password=expert123');
    console.log('Farmer: mobile=9876543210, password=farmer123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
