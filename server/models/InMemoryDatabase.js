const bcrypt = require('bcryptjs');

// In-Memory Collection Storage
const collections = {
  User: [],
  CropPrice: [],
  Scheme: [],
  Article: [],
  Question: [],
  Product: []
};

// Generates 24-char hex string similar to MongoDB ObjectId
const generateId = () => {
  return Math.random().toString(16).substring(2, 14).padEnd(12, '0') +
         Math.random().toString(16).substring(2, 14).padEnd(12, '0');
};

// Evaluates a document against a Mongoose-like query object
function matchQuery(doc, query) {
  if (!query) return true;
  for (const key in query) {
    const queryVal = query[key];
    const docVal = doc[key];
    
    if (queryVal && typeof queryVal === 'object') {
      if (queryVal.$regex !== undefined) {
        const flags = queryVal.$options || '';
        const regex = new RegExp(queryVal.$regex, flags);
        if (!regex.test(docVal || '')) return false;
      } else if (queryVal.$in !== undefined) {
        const arrayVal = Array.isArray(docVal) ? docVal : [docVal];
        const match = arrayVal.some(v => queryVal.$in.includes(v));
        if (!match) return false;
      }
    } else {
      // Direct comparison. Stringify ObjectIds/dates for robust comparisons
      const a = docVal !== null && docVal !== undefined ? docVal.toString() : docVal;
      const b = queryVal !== null && queryVal !== undefined ? queryVal.toString() : queryVal;
      if (a !== b) return false;
    }
  }
  return true;
}

// Sorts documents based on a sort object
function sortArray(arr, sortOption) {
  if (!sortOption) return arr;
  const sortField = Object.keys(sortOption)[0];
  const sortOrder = sortOption[sortField];
  
  return arr.sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    
    if (valA === undefined) return 1;
    if (valB === undefined) return -1;
    
    if (typeof valA === 'string') {
      return sortOrder === 1 ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (valA instanceof Date) {
      return sortOrder === 1 ? valA.getTime() - valB.getTime() : valB.getTime() - valA.getTime();
    }
    return sortOrder === 1 ? valA - valB : valB - valA;
  });
}

// Performs population of ObjectId references in documents
function populateDoc(doc, path, selectFields) {
  if (!doc) return;
  const val = doc[path];
  if (!val) return;

  let targetModelName = null;
  if (path === 'userId' || path === 'answeredBy') targetModelName = 'User';
  else if (path === 'savedSchemes') targetModelName = 'Scheme';

  if (!targetModelName) return;
  const targetCollection = collections[targetModelName] || [];

  if (Array.isArray(val)) {
    doc[path] = val.map(id => {
      const found = targetCollection.find(item => item._id.toString() === id.toString());
      if (found) return copyAndFilterFields(found, selectFields, targetModelName);
      return id;
    });
  } else {
    const found = targetCollection.find(item => item._id.toString() === val.toString());
    if (found) {
      doc[path] = copyAndFilterFields(found, selectFields, targetModelName);
    }
  }
}

function copyAndFilterFields(doc, selectFields, modelName) {
  const mockDoc = new MockDocument(modelName, doc);
  if (!selectFields) return mockDoc;
  
  const fields = selectFields.split(' ');
  const res = { _id: mockDoc._id };
  fields.forEach(f => {
    if (mockDoc[f] !== undefined) res[f] = mockDoc[f];
  });
  return res;
}

// Mock Document Instance class mimicking Mongoose Document
class MockDocument {
  constructor(modelName, data) {
    this._modelName = modelName;
    Object.assign(this, data);
    if (!this._id) {
      this._id = generateId();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    if (this._modelName === 'User') {
      this.matchPassword = async function(enteredPassword) {
        if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
          return await bcrypt.compare(enteredPassword, this.password);
        }
        return enteredPassword === this.password;
      };
    }
  }

  async save() {
    this.updatedAt = new Date();
    
    // Hash password if User model and password was updated
    if (this._modelName === 'User' && this.password && !this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    // Dynamic calculations for CropPrice
    if (this._modelName === 'CropPrice') {
      if (this.previousPrice !== undefined) {
        if (this.price > this.previousPrice) this.trend = 'up';
        else if (this.price < this.previousPrice) this.trend = 'down';
        else this.trend = 'stable';
      }
      this.lastUpdated = new Date();
    }

    const arr = collections[this._modelName];
    const idx = arr.findIndex(item => item._id.toString() === this._id.toString());
    
    const docData = { ...this };
    delete docData._modelName;
    delete docData.matchPassword;

    if (idx >= 0) {
      arr[idx] = docData;
    } else {
      arr.push(docData);
    }
    return this;
  }

  async deleteOne() {
    const arr = collections[this._modelName];
    const idx = arr.findIndex(item => item._id.toString() === this._id.toString());
    if (idx >= 0) {
      arr.splice(idx, 1);
    }
    return this;
  }
}

// Mock Query class to support Promise-like chaining (.sort, .limit, .populate, .select)
class MockQuery {
  constructor(modelName, resultsPromise) {
    this._modelName = modelName;
    this._promise = resultsPromise;
  }

  sort(sortOption) {
    this._promise = this._promise.then(results => {
      if (!Array.isArray(results)) return results;
      return sortArray(results, sortOption);
    });
    return this;
  }

  limit(n) {
    this._promise = this._promise.then(results => {
      if (!Array.isArray(results)) return results;
      return results.slice(0, n);
    });
    return this;
  }

  populate(path, selectFields) {
    this._promise = this._promise.then(results => {
      if (Array.isArray(results)) {
        results.forEach(doc => populateDoc(doc, path, selectFields));
      } else if (results) {
        populateDoc(results, path, selectFields);
      }
      return results;
    });
    return this;
  }

  select(selectOption) {
    return this;
  }

  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected);
  }

  catch(onRejected) {
    return this._promise.catch(onRejected);
  }
}

// Mock Model class implementing static Mongoose queries
class MockModel {
  constructor(modelName) {
    this._modelName = modelName;
  }

  find(query = {}) {
    const docs = (collections[this._modelName] || [])
      .filter(doc => matchQuery(doc, query))
      .map(doc => new MockDocument(this._modelName, doc));
    return new MockQuery(this._modelName, Promise.resolve(docs));
  }

  findOne(query = {}) {
    const doc = (collections[this._modelName] || [])
      .find(doc => matchQuery(doc, query));
    const result = doc ? new MockDocument(this._modelName, doc) : null;
    return new MockQuery(this._modelName, Promise.resolve(result));
  }

  findById(id) {
    if (!id) return new MockQuery(this._modelName, Promise.resolve(null));
    const doc = (collections[this._modelName] || [])
      .find(doc => doc._id.toString() === id.toString());
    const result = doc ? new MockDocument(this._modelName, doc) : null;
    return new MockQuery(this._modelName, Promise.resolve(result));
  }

  async create(data) {
    if (Array.isArray(data)) {
      const createdDocs = [];
      for (const item of data) {
        const doc = new MockDocument(this._modelName, item);
        await doc.save();
        createdDocs.push(doc);
      }
      return createdDocs;
    } else {
      const doc = new MockDocument(this._modelName, data);
      await doc.save();
      return doc;
    }
  }

  async insertMany(data) {
    return this.create(data);
  }

  async findByIdAndUpdate(id, update, options = {}) {
    const arr = collections[this._modelName] || [];
    const idx = arr.findIndex(doc => doc._id.toString() === id.toString());
    if (idx < 0) return null;

    const current = arr[idx];
    const updateFields = update.$set || update;
    const updatedData = { ...current, ...updateFields, updatedAt: new Date() };

    arr[idx] = updatedData;
    return new MockDocument(this._modelName, updatedData);
  }

  async findByIdAndDelete(id) {
    const arr = collections[this._modelName] || [];
    const idx = arr.findIndex(doc => doc._id.toString() === id.toString());
    if (idx < 0) return null;
    const deleted = arr.splice(idx, 1)[0];
    return new MockDocument(this._modelName, deleted);
  }

  async findOneAndDelete(query) {
    const arr = collections[this._modelName] || [];
    const idx = arr.findIndex(doc => matchQuery(doc, query));
    if (idx < 0) return null;
    const deleted = arr.splice(idx, 1)[0];
    return new MockDocument(this._modelName, deleted);
  }

  async deleteMany(query = {}) {
    const arr = collections[this._modelName] || [];
    if (Object.keys(query).length === 0) {
      collections[this._modelName] = [];
      return { deletedCount: arr.length };
    }
    const initialLength = arr.length;
    collections[this._modelName] = arr.filter(doc => !matchQuery(doc, query));
    return { deletedCount: initialLength - collections[this._modelName].length };
  }

  async countDocuments(query = {}) {
    const arr = collections[this._modelName] || [];
    return arr.filter(doc => matchQuery(doc, query)).length;
  }

  async distinct(field, query = {}) {
    const arr = collections[this._modelName] || [];
    const filtered = arr.filter(doc => matchQuery(doc, query));
    const vals = filtered.map(d => d[field]).filter(v => v !== undefined);
    return [...new Set(vals)];
  }
}

// Global initialization status
let initialized = false;

// Seed Generator Functions (extracted directly from seeds/seedData.js)
const generatePriceHistoryData = (startPrice, days = 30) => {
  const history = [];
  let currentPrice = startPrice;
  const today = new Date();
  
  for (let i = days; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(12, 0, 0, 0);
    
    const changePercent = (Math.random() * 6.0 - 2.5) / 100;
    currentPrice = Math.round(currentPrice * (1 + changePercent));
    
    history.push({ date, price: currentPrice });
  }
  
  const todayDate = new Date(today);
  todayDate.setHours(12, 0, 0, 0);
  const changePercent = (Math.random() * 6.0 - 2.5) / 100;
  currentPrice = Math.round(currentPrice * (1 + changePercent));
  history.push({ date: todayDate, price: currentPrice });

  return history;
};

async function initialize() {
  if (initialized) return;
  initialized = true;

  // Clear existing in-memory arrays
  Object.keys(collections).forEach(k => collections[k] = []);

  // Hash seed passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const expertPassword = await bcrypt.hash('expert123', 10);
  const farmerPassword = await bcrypt.hash('farmer123', 10);

  // 1. Seed Users
  const adminId = '6663f7d1b32d0f0017000001';
  const expertId = '6663f7d1b32d0f0017000002';
  const farmerIds = [
    '6663f7d1b32d0f0017000003',
    '6663f7d1b32d0f0017000004',
    '6663f7d1b32d0f0017000005',
    '6663f7d1b32d0f0017000006',
    '6663f7d1b32d0f0017000007'
  ];

  collections.User = [
    { _id: adminId, name: 'Admin', mobile: '9999999999', password: adminPassword, district: 'Hyderabad', state: 'Telangana', language: 'en', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
    { _id: expertId, name: 'Dr. Rajesh Kumar', mobile: '9888888888', password: expertPassword, village: 'Agricultural University Campus', district: 'Hyderabad', state: 'Telangana', language: 'en', role: 'expert', createdAt: new Date(), updatedAt: new Date() },
    { _id: farmerIds[0], name: 'Ramesh Patel', mobile: '9876543210', password: farmerPassword, village: 'Kotha Guda', district: 'Warangal', state: 'Telangana', language: 'te', role: 'farmer', createdAt: new Date(), updatedAt: new Date() },
    { _id: farmerIds[1], name: 'Suresh Reddy', mobile: '9876543211', password: farmerPassword, village: 'Lingampally', district: 'Rangareddy', state: 'Telangana', language: 'te', role: 'farmer', createdAt: new Date(), updatedAt: new Date() },
    { _id: farmerIds[2], name: 'Lakshmi Devi', mobile: '9876543212', password: farmerPassword, village: 'Sadasivpet', district: 'Medak', state: 'Telangana', language: 'hi', role: 'farmer', createdAt: new Date(), updatedAt: new Date() },
    { _id: farmerIds[3], name: 'Kumar Swamy', mobile: '9876543213', password: farmerPassword, village: 'Mancherial', district: 'Mancherial', state: 'Telangana', language: 'te', role: 'farmer', createdAt: new Date(), updatedAt: new Date() },
    { _id: farmerIds[4], name: 'Anjali Singh', mobile: '9876543214', password: farmerPassword, village: 'Barabanki', district: 'Lucknow', state: 'Uttar Pradesh', language: 'hi', role: 'farmer', createdAt: new Date(), updatedAt: new Date() }
  ];

  // 2. Seed Schemes
  const schemeIds = [
    '6663f7d1b32d0f0017000011',
    '6663f7d1b32d0f0017000012',
    '6663f7d1b32d0f0017000013',
    '6663f7d1b32d0f0017000014',
    '6663f7d1b32d0f0017000015',
    '6663f7d1b32d0f0017000016'
  ];

  collections.Scheme = [
    {
      _id: schemeIds[0],
      title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      description: 'Under this scheme, the government provides income support of ₹6,000 per year to all farmer families across the country. The amount is paid in three equal installments of ₹2,000 each, directly transferred to the bank accounts of the beneficiaries.',
      eligibility: 'All landholding farmer families with cultivable land. Certain categories are excluded: institutional landholders, farmer families holding constitutional posts, those serving/retired from government service, professionals like doctors, engineers, lawyers, chartered accountants, and income tax payers.',
      benefits: '₹6,000 per year in three installments of ₹2,000 each directly to bank account. No middlemen involved.',
      documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details', 'Mobile Number'],
      applicationProcess: 'Visit the nearest Common Service Centre (CSC) or register online at pmkisan.gov.in. Verification is done by State/UT governments.',
      applyLink: 'https://pmkisan.gov.in',
      category: 'subsidy',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: schemeIds[1],
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'A crop insurance scheme providing comprehensive risk coverage against crop loss due to natural calamities, pests, and diseases. Farmers pay a minimal premium while the government subsidizes the remaining amount.',
      eligibility: 'All farmers including sharecroppers and tenant farmers growing notified crops in notified areas. Both loanee and non-loanee farmers can enroll.',
      benefits: 'Premium rates: 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops. Full sum insured in case of total crop loss.',
      documents: ['Land Records / Land Lease Agreement', 'Aadhaar Card', 'Bank Passbook', 'Sowing Certificate', 'Crop Details'],
      applicationProcess: 'Apply through your bank, Common Service Centre (CSC), or online at pmfby.gov.in before the cut-off date for the season.',
      applyLink: 'https://pmfby.gov.in',
      category: 'insurance',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: schemeIds[2],
      title: 'Soil Health Card Scheme',
      description: 'The Soil Health Card Scheme provides soil health cards to farmers carrying crop-wise recommendations of nutrients and fertilizers required for individual farms. This helps farmers to improve productivity through judicious use of inputs.',
      eligibility: 'All farmers across India. Soil samples are collected from farms and tested in laboratories.',
      benefits: 'Free soil testing, nutrient recommendations, fertilizer advice for each crop type. Helps reduce input costs and improve yields.',
      documents: ['Aadhaar Card', 'Land Details', 'Contact Information'],
      applicationProcess: 'Contact your nearest Krishi Vigyan Kendra (KVK) or Agriculture Department office. Soil samples will be collected and analyzed.',
      applyLink: 'https://soilhealth.dac.gov.in',
      category: 'other',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: schemeIds[3],
      title: 'Kisan Credit Card (KCC)',
      description: 'Kisan Credit Card provides farmers with timely and adequate credit support for their cultivation and other needs. It offers short-term credit for crop production, post-harvest expenses, and consumption requirements.',
      eligibility: 'All farmers – individuals or joint borrowers who are owner cultivators, tenant farmers, oral lessees, or sharecroppers.',
      benefits: 'Credit limit up to ₹3 lakh at subsidized interest rate of 4% (with prompt repayment). Crop insurance cover, accident insurance of ₹50,000.',
      documents: ['Identity Proof (Aadhaar/Voter ID)', 'Address Proof', 'Land Documents', 'Passport Size Photos', 'Application Form'],
      applicationProcess: 'Apply at any commercial bank, cooperative bank, or Regional Rural Bank. Can also apply online through bank portals.',
      applyLink: 'https://pmkisan.gov.in/KCC.aspx',
      category: 'loan',
      ministry: 'Ministry of Finance',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: schemeIds[4],
      title: 'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
      description: 'Aimed at ensuring access to protective irrigation for every farm ("Har Khet Ko Pani") and improving water use efficiency ("Per Drop More Crop"). Provides support for micro-irrigation systems.',
      eligibility: 'All farmers with focus on small and marginal farmers. Priority given to drought-prone and water-scarce areas.',
      benefits: 'Subsidy of 55% for small/marginal farmers and 45% for other farmers on drip and sprinkler irrigation systems.',
      documents: ['Land Records', 'Aadhaar Card', 'Bank Account', 'Caste Certificate (if applicable)', 'Farm Map'],
      applicationProcess: 'Apply through District Agriculture Office or online through the state agriculture portal.',
      applyLink: 'https://pmksy.gov.in',
      category: 'subsidy',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: schemeIds[5],
      title: 'National Mission on Sustainable Agriculture (NMSA)',
      description: 'Focuses on making agriculture more productive, sustainable, remunerative, and climate resilient by promoting location-specific integrated farming systems.',
      eligibility: 'Farmers and farmer groups interested in sustainable agriculture practices including organic farming, soil health management, and water use efficiency.',
      benefits: 'Financial assistance for organic farming inputs, vermicompost units, water harvesting structures, and training programs.',
      documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details', 'Farming Details'],
      applicationProcess: 'Contact the State Agriculture Department or District Agriculture Officer.',
      applyLink: 'https://nmsa.dac.gov.in',
      category: 'subsidy',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // 3. Seed Articles
  collections.Article = [
    {
      _id: '6663f7d1b32d0f0017000021',
      title: 'Complete Guide to Rice (Paddy) Farming in India',
      content: `Rice is the most important staple food crop in India. Here is a comprehensive guide to successful rice farming:\n\n## Land Preparation\n- Plow the field 2-3 times to get fine tilth\n- Level the field for uniform water distribution\n- Apply 10-12 tonnes of well-decomposed FYM per hectare\n\n## Seed Selection\n- Choose high-yielding varieties suited to your region\n- Popular varieties: Sona Masuri, BPT 5204, IR 64, Pusa Basmati\n- Seed rate: 20-25 kg/hectare for transplanting\n\n## Nursery Management\n- Raise nursery in wet beds\n- Sow seeds 20-25 days before transplanting\n- Apply recommended fertilizers to nursery\n\n## Transplanting\n- Transplant 20-25 day old seedlings\n- Maintain 20x15 cm spacing\n- Plant 2-3 seedlings per hill\n\n## Water Management\n- Maintain 5 cm standing water after transplanting\n- Drain field before harvesting\n- Use alternate wetting and drying method to save water\n\n## Fertilizer Schedule\n- Basal: 60 kg N + 30 kg P2O5 + 30 kg K2O per hectare\n- Top dressing: 30 kg N at tillering, 30 kg N at panicle initiation\n\n## Pest Management\n- Monitor regularly for stem borer, leaf folder, and BPH\n- Use integrated pest management practices\n- Apply pesticides only when pest population exceeds ETL`,
      summary: 'Learn everything about rice farming from land preparation to harvesting with detailed steps for Indian conditions.',
      category: 'crop-cultivation',
      subcategory: 'Rice Farming',
      tags: ['rice', 'paddy', 'kharif', 'staple crop'],
      author: 'Dr. Rajesh Kumar',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000022',
      title: 'Cotton Farming: Best Practices for Maximum Yield',
      content: `Cotton is one of the most important commercial crops in India. Follow these practices for high yields:\n\n## Climate Requirements\n- Temperature: 21-30°C during growing season\n- Rainfall: 600-1200mm well distributed\n- Frost-free period of at least 200 days\n\n## Soil Requirements\n- Deep black cotton soils are ideal\n- pH: 6.0-8.0\n- Good drainage is essential\n\n## Varieties\n- Bt Cotton hybrids are widely grown\n- Choose varieties resistant to bollworm\n- Popular: Bollgard II, RCH varieties\n\n## Sowing Time\n- Kharif season: May-June (with onset of monsoon)\n- Irrigated: April-May\n\n## Spacing\n- 90-120 cm between rows\n- 45-60 cm between plants\n\n## Nutrient Management\n- Apply 120:60:60 NPK kg/ha\n- Split nitrogen into 3 doses\n- Foliar spray of micronutrients at flowering\n\n## Irrigation\n- Critical stages: flowering and boll development\n- Drip irrigation gives best results\n- Avoid waterlogging`,
      summary: 'Master cotton farming with expert tips on varieties, spacing, nutrients, and pest management for Indian farmers.',
      category: 'crop-cultivation',
      subcategory: 'Cotton Farming',
      tags: ['cotton', 'commercial crop', 'kharif'],
      author: 'AgriConnect Expert',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000023',
      title: 'Organic Farming: Natural Fertilizers and Pesticides',
      content: `Organic farming is sustainable and profitable. Here is your guide to going organic:\n\n## Benefits of Organic Farming\n- Higher market price for organic produce\n- Reduced input costs over time\n- Better soil health\n- Environmental sustainability\n- Healthier food\n\n## Natural Fertilizers\n\n### Vermicompost\n- Use earthworms to convert organic waste into compost\n- Apply 5-10 tonnes per hectare\n- Rich in NPK and micronutrients\n\n### Jeevamrutha\n- Mix 10 kg cow dung + 10 liters cow urine + 2 kg jaggery + 2 kg pulse flour + handful of soil in 200 liters water\n- Ferment for 3-5 days\n- Apply to soil every 15 days\n\n### Green Manure\n- Grow leguminous crops like dhaincha, sunhemp\n- Incorporate into soil before flowering\n- Adds 40-60 kg nitrogen per hectare\n\n## Natural Pesticides\n\n### Neem-based Solutions\n- Neem seed kernel extract (NSKE) 5%\n- Neem oil 2-3 ml/liter\n- Effective against most sucking pests\n\n### Panchagavya\n- Traditional preparation from cow products\n- Growth promoter and disease preventive\n- Spray at 3% concentration`,
      summary: 'Complete guide to organic farming including natural fertilizers like vermicompost, jeevamrutha, and organic pesticides.',
      category: 'organic-farming',
      tags: ['organic', 'natural farming', 'sustainable'],
      author: 'AgriConnect Expert',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000024',
      title: 'Drip Irrigation: Save Water, Increase Yield',
      content: `Drip irrigation is the most efficient method of watering crops. Here is everything you need to know:\n\n## What is Drip Irrigation?\nA system that delivers water directly to the root zone of plants through a network of pipes, valves, and emitters.\n\n## Benefits\n- Saves 30-60% water compared to flood irrigation\n- Increases yield by 20-40%\n- Reduces weed growth\n- Enables fertigation (fertilizer through drip)\n- Suitable for hilly and undulating terrain\n\n## Components\n1. Water source (well, borewell, tank)\n2. Pump and filtration system\n3. Main line (PVC pipes)\n4. Sub-main lines\n5. Lateral lines (LLDPE pipes)\n6. Emitters/drippers\n\n## Government Subsidy\n- 55% subsidy for small and marginal farmers\n- 45% for other farmers\n- Apply through PMKSY scheme\n\n## Suitable Crops\n- Vegetables: Tomato, chilli, capsicum, brinjal\n- Fruits: Mango, pomegranate, banana, papaya\n- Commercial: Cotton, sugarcane, turmeric\n\n## Maintenance Tips\n- Clean filters regularly\n- Flush laterals monthly\n- Check for clogged emitters\n- Protect from rodent damage`,
      summary: 'Learn about drip irrigation systems, benefits, government subsidies, and maintenance for Indian farming conditions.',
      category: 'modern-farming',
      subcategory: 'Drip Irrigation',
      tags: ['irrigation', 'water saving', 'modern farming', 'drip'],
      author: 'AgriConnect Expert',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000025',
      title: 'Tomato Farming: From Seed to Market',
      content: `Tomato is one of the most profitable vegetable crops. Here is a complete guide:\n\n## Climate\n- Temperature: 20-25°C (optimum)\n- Can tolerate 15-35°C\n- Frost sensitive\n\n## Varieties\n- Hybrid: Arka Rakshak, NS 501, TO-1057\n- Determinate varieties for processing\n- Indeterminate for fresh market\n\n## Nursery\n- Sow seeds in protray or raised beds\n- Transplant 25-30 day old seedlings\n- Harden seedlings before transplanting\n\n## Spacing\n- 60x45 cm (open field)\n- 45x30 cm (polyhouse)\n\n## Staking\n- Essential for indeterminate varieties\n- Use bamboo stakes or GI wire\n- Improves fruit quality and reduces diseases\n\n## Common Diseases\n1. **Leaf Blight** - Brown spots on leaves\n2. **Fusarium Wilt** - Yellowing and wilting\n3. **Bacterial Wilt** - Sudden wilting without yellowing\n4. **Tomato Leaf Curl Virus** - Curling of leaves, stunted growth\n\n## Harvesting\n- Start 60-70 days after transplanting\n- Pick at breaker stage for distant markets\n- At red ripe stage for local markets\n\n## Yield\n- Open field: 40-60 tonnes/hectare\n- Polyhouse: 80-120 tonnes/hectare`,
      summary: 'Complete tomato farming guide covering varieties, nursery management, diseases, and yield expectations.',
      category: 'crop-cultivation',
      subcategory: 'Tomato Farming',
      tags: ['tomato', 'vegetable', 'profitable crop'],
      author: 'Dr. Rajesh Kumar',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000026',
      title: 'Understanding Soil Health: pH, Nutrients, and Testing',
      content: `Healthy soil is the foundation of successful farming. Learn about soil testing and management:\n\n## Why Soil Testing?\n- Know your soil nutrient status\n- Apply right fertilizers in right amounts\n- Save money on unnecessary inputs\n- Improve crop productivity\n\n## Key Soil Parameters\n\n### pH (Acidity/Alkalinity)\n- **Acidic (< 6.5)**: Add lime to correct\n- **Neutral (6.5-7.5)**: Ideal for most crops\n- **Alkaline (> 7.5)**: Add gypsum to correct\n\n### Major Nutrients\n- **Nitrogen (N)**: Leaf growth, green color\n- **Phosphorus (P)**: Root development, flowering\n- **Potassium (K)**: Fruit quality, disease resistance\n\n### Secondary Nutrients\n- Calcium, Magnesium, Sulphur\n\n### Micronutrients\n- Iron, Zinc, Boron, Manganese, Copper, Molybdenum\n\n## Soil Types in India\n1. **Alluvial Soil**: Most fertile, found in Indo-Gangetic plains\n2. **Black Soil**: Best for cotton, found in Deccan plateau\n3. **Red Soil**: Good for millets, found in southern India\n4. **Laterite Soil**: Acidic, needs amendment\n\n## How to Collect Soil Sample\n1. Collect from 15 cm depth\n2. Take samples from 8-10 spots\n3. Mix all samples thoroughly\n4. Take 500g representative sample\n5. Air dry and send to lab`,
      summary: 'Understanding soil health including pH levels, nutrients, soil types, and proper soil testing procedures.',
      category: 'soil-health',
      tags: ['soil', 'testing', 'nutrients', 'pH'],
      author: 'AgriConnect Expert',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000027',
      title: 'Hydroponics: Growing Crops Without Soil',
      content: `Hydroponics is a revolutionary farming technique that grows plants without soil using nutrient-rich water solutions.\n\n## What is Hydroponics?\nA method of growing plants in water-based, nutrient-rich solutions without soil. The roots are supported using inert media like perlite, clay pellets, or rockwool.\n\n## Types of Systems\n1. **Deep Water Culture (DWC)**: Plants float on nutrient solution\n2. **NFT (Nutrient Film Technique)**: Thin film of nutrients flows over roots\n3. **Drip System**: Nutrient solution dripped to each plant\n4. **Ebb and Flow**: Periodic flooding and draining\n\n## Advantages\n- 90% less water usage\n- 3-10x higher yields\n- No soil-borne diseases\n- Year-round production\n- Less space required\n\n## Suitable Crops\n- Leafy greens: Lettuce, spinach, basil\n- Herbs: Mint, coriander, parsley\n- Vegetables: Tomato, cucumber, capsicum\n- Strawberries\n\n## Investment\n- Small setup (100 sq ft): ₹50,000 - ₹1,00,000\n- Medium setup (500 sq ft): ₹2,00,000 - ₹5,00,000\n- Commercial (1000+ sq ft): ₹10,00,000+\n\n## ROI\n- Break-even: 1-2 years\n- Premium pricing for hydroponic produce\n- Growing market demand in Indian cities`,
      summary: 'Introduction to hydroponic farming including systems, suitable crops, investment details, and ROI for Indian farmers.',
      category: 'modern-farming',
      subcategory: 'Hydroponics',
      tags: ['hydroponics', 'soilless', 'modern farming', 'technology'],
      author: 'AgriConnect Expert',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000028',
      title: 'Integrated Pest Management (IPM) for Indian Crops',
      content: `IPM is a sustainable approach to manage pests by combining biological, cultural, physical, and chemical tools.\n\n## Principles of IPM\n1. **Prevention**: Use resistant varieties, proper spacing, crop rotation\n2. **Monitoring**: Regular field scouting for pest detection\n3. **Identification**: Correctly identify pest before treatment\n4. **Action**: Use appropriate control method\n\n## Biological Control\n- **Trichogramma**: Parasitoid for bollworm control\n- **Chrysoperla**: Predator for aphids and whiteflies\n- **Trichoderma**: Biocontrol agent for soil-borne diseases\n- **Pseudomonas**: Biological fungicide\n\n## Cultural Control\n- Crop rotation\n- Intercropping\n- Trap crops\n- Timely sowing and harvesting\n- Field sanitation\n\n## Physical Control\n- Yellow sticky traps for whiteflies\n- Pheromone traps for moths\n- Light traps for nocturnal insects\n- Bird perches for predatory birds\n\n## Chemical Control (Last Resort)\n- Use only when pest population exceeds ETL\n- Choose selective pesticides\n- Follow recommended dosage\n- Observe waiting period before harvest`,
      summary: 'Complete guide to Integrated Pest Management combining biological, cultural, and chemical methods for Indian agriculture.',
      category: 'pest-management',
      tags: ['pest management', 'IPM', 'biological control'],
      author: 'Dr. Rajesh Kumar',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // 4. Seed Questions
  collections.Question = [
    {
      _id: '6663f7d1b32d0f0017000031',
      userId: farmerIds[0],
      question: 'My tomato plants are turning yellow. What should I do?',
      description: 'The lower leaves of my tomato plants are turning yellow and falling off. The plants are about 45 days old.',
      category: 'disease',
      answer: 'Yellowing of lower leaves in tomatoes can be caused by: 1) Nitrogen deficiency - Apply urea at 10g per plant, 2) Fusarium wilt - If wilting accompanies yellowing, uproot affected plants and apply Trichoderma, 3) Overwatering - Ensure proper drainage. Check for any spots on leaves which could indicate fungal infection.',
      answeredBy: expertId,
      status: 'answered',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000032',
      userId: farmerIds[1],
      question: 'Which fertilizer is best for cotton at flowering stage?',
      description: 'My cotton crop is at 60 days and starting to flower. What fertilizer should I apply now?',
      category: 'fertilizer',
      answer: 'At flowering stage of cotton, apply: 1) 30 kg Nitrogen per hectare as top dressing, 2) Foliar spray of 2% DAP (Di-ammonium Phosphate), 3) Micronutrient mixture containing Zinc and Boron. Avoid excess nitrogen as it promotes vegetative growth at the expense of bolls.',
      answeredBy: expertId,
      status: 'answered',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000033',
      userId: farmerIds[2],
      question: 'How to control whitefly in chilli crop?',
      description: 'My chilli plants have heavy whitefly infestation. Leaves are curling up.',
      category: 'pest',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6663f7d1b32d0f0017000034',
      userId: farmerIds[3],
      question: 'Best time to sow maize in Telangana?',
      description: 'I want to grow maize in my field. When is the best time to sow in our region?',
      category: 'general',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // 5. Seed Crop Prices
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

    collections.CropPrice.push({
      _id: generateId(),
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
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

// Model instance caching
const models = {};

function getModel(modelName) {
  if (!models[modelName]) {
    models[modelName] = new MockModel(modelName);
  }
  return models[modelName];
}

module.exports = {
  getModel,
  initialize,
  collections
};
