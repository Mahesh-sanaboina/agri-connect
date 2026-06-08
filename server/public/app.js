// Multilingual translation resources
const translations = {
  en: {
    nav: {
      home: "Home",
      cropPrices: "Crop Prices",
      weather: "Weather",
      schemes: "Government Schemes",
      knowledge: "Farming Guides",
      pest: "Pest Detection",
      expert: "Ask Expert",
      marketplace: "Marketplace",
      soil: "Soil Testing",
      login: "Login",
      register: "Register",
      profile: "Profile",
      admin: "Admin",
      logout: "Logout"
    },
    home: {
      heroTitle: "Empowering Farmers Through Technology",
      heroSubtitle: "Get real-time crop prices, weather updates, expert advice, and government schemes in your local language.",
      quickServices: "Quick Services",
      latestNews: "Latest Agriculture News",
      successStories: "Success Stories",
      weatherWidget: "Weather Forecast",
      viewMore: "View More"
    },
    weather: {
      title: "Weather Forecast & Farming Recommendations",
      current: "Current Weather",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      rainProb: "Rain Prediction",
      recommendations: "Farming Recommendations",
      weekly: "7-Day Forecast"
    },
    crops: {
      title: "Daily Crop Market Prices",
      searchPlaceholder: "Search crop (e.g. Rice, Wheat, Cotton)...",
      priceToday: "Today's Price",
      priceYesterday: "Yesterday's Price",
      trend: "Price Trend",
      market: "Market",
      state: "State",
      minMax: "Min / Max"
    },
    schemes: {
      title: "Government Schemes for Farmers",
      eligibility: "Eligibility",
      benefits: "Benefits",
      documents: "Required Documents",
      apply: "Apply Process",
      applyBtn: "Apply Online"
    },
    knowledge: {
      title: "Farming Knowledge Center",
      categories: "Categories",
      searchPlaceholder: "Search guides or articles...",
      author: "Author",
      views: "Views"
    },
    pest: {
      title: "AI Crop Disease & Pest Detection",
      uploadTitle: "Upload Crop Image",
      uploadSubtitle: "Drag and drop or click to upload a photo of the affected leaf/plant for AI diagnosis",
      detecting: "Analyzing image with AI...",
      result: "AI Diagnostic Result",
      diseaseName: "Possible Disease/Pest",
      cause: "Cause",
      prevention: "Prevention",
      treatment: "Treatment"
    },
    expert: {
      title: "Ask an Agriculture Expert",
      askQuestion: "Ask a Question",
      questionPlaceholder: "Describe the issue with your crop (e.g., 'My tomato leaves are turning yellow, what should I do?')",
      uploadImage: "Upload image of crop (optional)",
      submit: "Submit Question",
      recentQuestions: "Recent Consultations",
      answered: "Answered",
      pending: "Pending Answer",
      expertAnswer: "Expert Answer"
    },
    marketplace: {
      title: "AgriConnect Marketplace",
      sellBtn: "Sell/List Product",
      rentBtn: "Rent Equipment",
      buyBtn: "Buy Seeds & Fertilizers",
      productName: "Product Name",
      quantity: "Quantity",
      price: "Price",
      location: "Location",
      contact: "Contact Seller",
      postListing: "Post New Listing"
    },
    soil: {
      title: "Soil Testing & Crop Recommendations",
      soilType: "Soil Type",
      phValue: "pH Value",
      recommendBtn: "Get Recommendation",
      suitableCrops: "Suitable Crops",
      fertilizers: "Fertilizer Suggestions"
    }
  },
  hi: {
    nav: {
      home: "मुख्य पृष्ठ",
      cropPrices: "फसल की कीमतें",
      weather: "मौसम",
      schemes: "सरकारी योजनाएं",
      knowledge: "कृषि गाइड",
      pest: "कीट पहचान",
      expert: "विशेषज्ञ से पूछें",
      marketplace: "बाज़ार",
      soil: "मिट्टी परीक्षण",
      login: "लॉगिन",
      register: "पंजीकरण",
      profile: "प्रोफ़ाइल",
      admin: "व्यवस्थापक",
      logout: "लॉगआउट"
    },
    home: {
      heroTitle: "प्रौद्योगिकी के माध्यम से किसानों का सशक्तिकरण",
      heroSubtitle: "अपनी स्थानीय भाषा में वास्तविक समय में फसल की कीमतें, मौसम की जानकारी, विशेषज्ञ सलाह और सरकारी योजनाएं प्राप्त करें।",
      quickServices: "त्वरित सेवाएं",
      latestNews: "नवीनतम कृषि समाचार",
      successStories: "सफलता की कहानियां",
      weatherWidget: "मौसम का पूर्वानुमान",
      viewMore: "और देखें"
    },
    weather: {
      title: "मौसम का पूर्वानुमान और कृषि अनुशंसाएं",
      current: "वर्तमान मौसम",
      humidity: "आर्द्रता",
      windSpeed: "हवा की गति",
      rainProb: "बारिश का पूर्वानुमान",
      recommendations: "कृषि अनुशंसाएं",
      weekly: "7 दिनों का पूर्वानुमान"
    },
    crops: {
      title: "दैनिक फसल बाज़ार भाव",
      searchPlaceholder: "फसल खोजें (जैसे चावल, गेहूं, कपास)...",
      priceToday: "आज का भाव",
      priceYesterday: "कल का भाव",
      trend: "मूल्य रुझान",
      market: "बाज़ार",
      state: "राज्य",
      minMax: "न्यूनतम / अधिकतम"
    },
    schemes: {
      title: "किसानों के लिए सरकारी योजनाएं",
      eligibility: "पात्रता",
      benefits: "लाभ",
      documents: "आवश्यक दस्तावेज़",
      apply: "आवेदन प्रक्रिया",
      applyBtn: "ऑनलाइन आवेदन करें"
    },
    knowledge: {
      title: "कृषि ज्ञान केंद्र",
      categories: "श्रेणियां",
      searchPlaceholder: "गाइड या लेख खोजें...",
      author: "लेखक",
      views: "देखा गया"
    },
    pest: {
      title: "एआई फसल रोग और कीट पहचान",
      uploadTitle: "फसल की छवि अपलोड करें",
      uploadSubtitle: "एआई निदान के लिए प्रभावित पत्ते/पौधे की तस्वीर अपलोड करने के लिए खींचें और छोड़ें या क्लिक करें",
      detecting: "एआई के साथ छवि का विश्लेषण किया जा रहा है...",
      result: "एआई निदान परिणाम",
      diseaseName: "संभावित रोग/कीट",
      cause: "कारण",
      prevention: "बचाव",
      treatment: "उपचार"
    },
    expert: {
      title: "कृषि विशेषज्ञ से पूछें",
      askQuestion: "एक प्रश्न पूछें",
      questionPlaceholder: "अपनी फसल की समस्या का वर्णन करें (जैसे, 'मेरे टमाटर के पत्ते पीले हो रहे हैं, मुझे क्या करना चाहिए?')",
      uploadImage: "फसल की छवि अपलोड करें (वैकल्पिक)",
      submit: "प्रश्न सबमिट करें",
      recentQuestions: "हाल के परामर्श",
      answered: "उत्तर दिया गया",
      pending: "उत्तर लंबित",
      expertAnswer: "विशेषज्ञ का उत्तर"
    },
    marketplace: {
      title: "एग्रीकनेक्ट बाज़ार",
      sellBtn: "उत्पाद बेचें/सूचीबद्ध करें",
      rentBtn: "उपकरण किराए पर लें",
      buyBtn: "बीज और उर्वरक खरीदें",
      productName: "उत्पाद का नाम",
      quantity: "मात्रा",
      price: "कीमत",
      location: "स्थान",
      contact: "विक्रेता से संपर्क करें",
      postListing: "नई सूची पोस्ट करें"
    },
    soil: {
      title: "मिट्टी परीक्षण और फसल अनुशंसाएं",
      soilType: "मिट्टी का प्रकार",
      phValue: "पीएच मान",
      recommendBtn: "अनुशंसा प्राप्त करें",
      suitableCrops: "उपयुक्त फसलें",
      fertilizers: "उर्वरक सुझाव"
    }
  },
  te: {
    nav: {
      home: "హోమ్",
      cropPrices: "పంట ధరలు",
      weather: "వాతావరణం",
      schemes: "ప్రభుత్వ పథకాలు",
      knowledge: "వ్యవసాయ మార్గదర్శకాలు",
      pest: "తెగుళ్ల గుర్తింపు",
      expert: "నిపుణుడిని అడగండి",
      marketplace: "మార్కెట్ ప్లేస్",
      soil: "నేల పరీక్ష",
      login: "లాగిన్",
      register: "రిజిస్టర్",
      profile: "ప్రొఫైల్",
      admin: "అడ్మిన్",
      logout: "లాగౌట్"
    },
    home: {
      heroTitle: "సాంకేతికత ద్వారా రైతులకు సాధికారత",
      heroSubtitle: "మీ స్థానిక భాషలో నిజ-సమయ పంట ధరలు, వాతావరణ సమాచారం, నిపుణుల సలహాలు మరియు ప్రభుత్వ పథకాలను పొందండి.",
      quickServices: "త్వరిత సేవలు",
      latestNews: "తాజా వ్యవసాయ వార్తలు",
      successStories: "విజయ గాథలు",
      weatherWidget: "వాతావరణ సూచన",
      viewMore: "ఇంకా చూడండి"
    },
    weather: {
      title: "వాతావరణ సూచన & వ్యవసాయ సిఫార్సులు",
      current: "ప్రస్తుత వాతావరణం",
      humidity: "తేమ",
      windSpeed: "గాలి వేగం",
      rainProb: "వర్ష సూచన",
      recommendations: "వ్యవసాయ సిఫార్సులు",
      weekly: "7-రోజుల సూచన"
    },
    crops: {
      title: "రోజువారీ పంట మార్కెట్ ధరలు",
      searchPlaceholder: "పంటను శోధించండి (ఉదా. వరి, గోధుమ, పత్తి)...",
      priceToday: "ఈరోజు ధర",
      priceYesterday: "నిన్నటి ధర",
      trend: "ధర సరళి",
      market: "మార్కెట్",
      state: "రాష్ట్రం",
      minMax: "కనిష్ట / గరిష్ట"
    },
    schemes: {
      title: "రైతుల కోసం ప్రభుత్వ పథకాలు",
      eligibility: "అర్హత",
      benefits: "ప్రయోజనాలు",
      documents: "కావలసిన పత్రాలు",
      apply: "దరఖాస్తు విధానం",
      applyBtn: "ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి"
    },
    knowledge: {
      title: "వ్యవసాయ జ్ఞాన కేంద్రం",
      categories: "విభాగాలు",
      searchPlaceholder: "మార్గదర్శకాలు లేదా వ్యాసాలను శోధించండి...",
      author: "రచయిత",
      views: "వీక్షణలు"
    },
    pest: {
      title: "AI పంట తెగుళ్లు & వ్యాధుల గుర్తింపు",
      uploadTitle: "పంట చిత్రాన్ని అప్‌లోడ్ చేయండి",
      uploadSubtitle: "AI విశ్లేషణ కోసం వ్యాధి సోకిన ఆకు/మొక్క ఫోటోను లాగి వదలండి లేదా క్లిక్ చేయండి",
      detecting: "AI తో చిత్రాన్ని విశ్లేషిస్తోంది...",
      result: "AI విశ్లేషణ ఫలితం",
      diseaseName: "సాధ్యమయ్యే వ్యాధి/తెగులు",
      cause: "కారణం",
      prevention: "నివారణ",
      treatment: "చికిత్స"
    },
    expert: {
      title: "వ్యవసాయ నిపుణుడిని అడగండి",
      askQuestion: "ప్రశ్న అడగండి",
      questionPlaceholder: "మీ పంట సమస్యను వివరించండి (ఉదా. 'నా టమోటా ఆకులు పసుపు రంగులోకి మారుతున్నాయి, నేను ఏమి చేయాలి?')",
      uploadImage: "పంట చిత్రాన్ని అప్‌లోడ్ చేయండి (ఐచ్ఛికం)",
      submit: "ప్రశ్నను సమర్పించండి",
      recentQuestions: "ఇటీవలి సంప్రదింపులు",
      answered: "సమాధానం ఇవ్వబడింది",
      pending: "సమాధానం పెండింగ్",
      expertAnswer: "నిపుణుల సమాధానం"
    },
    marketplace: {
      title: "అగ్రి కనెక్ట్ మార్కెట్",
      sellBtn: "ఉత్పత్తిని అమ్మండి",
      rentBtn: "పరికరాలు అద్దెకు ఇవ్వండి",
      buyBtn: "విత్తనాలు & ఎరువులు కొనండి",
      productName: "ఉత్పత్తి పేరు",
      quantity: "పరిమాణం",
      price: "ధర",
      location: "స్థలం",
      contact: "విక్రేతను సంప్రదించండి",
      postListing: "కొత్త ప్రకటనను పోస్ట్ చేయండి"
    },
    soil: {
      title: "నేల పరీక్ష & పంట సిఫార్సులు",
      soilType: "నేల రకం",
      phValue: "pH విలువ",
      recommendBtn: "సిఫార్సును పొందండి",
      suitableCrops: "అనుకూలమైన పంటలు",
      fertilizers: "ఎరువుల సూచనలు"
    }
  },
  ta: {
    nav: {
      home: "முகப்பு",
      cropPrices: "பயிர் விலைகள்",
      weather: "வானிலை",
      schemes: "அரசு திட்டங்கள்",
      knowledge: "விவசாய வழிகாட்டி",
      pest: "பூச்சி கண்டறிதல்",
      expert: "நிபுணரிடம் கேளுங்கள்",
      marketplace: "சந்தை",
      soil: "மண் பரிசோதனை",
      login: "உள்நுழை",
      register: "பதிவு செய்",
      profile: "சுயவிவரம்",
      admin: "நிர்வாகி",
      logout: "வெளியேறு"
    },
    home: {
      heroTitle: "தொழில்நுட்பத்தின் மூலம் விவசாயிகளை மேம்படுத்துதல்",
      heroSubtitle: "உங்களது உள்ளூர் மொழியில் நிகழ்நேர பயிர் விலைகள், வானிலை தகவல்கள், நிபுணர் ஆலோசனைகள் மற்றும் அரசு திட்டங்களை பெறவும்.",
      quickServices: "விரைவு சேவைகள்",
      latestNews: "சமீபத்திய விவசாய செய்திகள்",
      successStories: "வெற்றி கதைகள்",
      weatherWidget: "வானிலை முன்னறிவிப்பு",
      viewMore: "மேலும் பார்க்க"
    },
    weather: {
      title: "வானிலை முன்னறிவிப்பு மற்றும் விவசாய பரிந்துரைகள்",
      current: "தற்போதைய வானிலை",
      humidity: "ஈரப்பதம்",
      windSpeed: "காற்றின் வேகம்",
      rainProb: "மழை முன்னறிவிப்பு",
      recommendations: "விவசாய பரிந்துரைகள்",
      weekly: "7-நாள் முன்னறிவிப்பு"
    },
    crops: {
      title: "தினசரி பயிர் சந்தை விலைகள்",
      searchPlaceholder: "பயிரைத் தேடுங்கள் (எ.கா. நெல், கோதுமை, பருத்தி)...",
      priceToday: "இன்றைய விலை",
      priceYesterday: "நேற்றைய விலை",
      trend: "விலை போக்கு",
      market: "சந்தை",
      state: "மாநிலம்",
      minMax: "குறைந்தபட்சம் / அதிகபட்சம்"
    },
    schemes: {
      title: "விவசாயிகளுக்கான அரசு திட்டங்கள்",
      eligibility: "தகுதி",
      benefits: "நன்மைகள்",
      documents: "தேவையான ஆவணங்கள்",
      apply: "விண்ணப்பிக்கும் முறை",
      applyBtn: "ஆன்லைனில் விண்ணப்பிக்கவும்"
    },
    knowledge: {
      title: "விவசாய அறிவு மையம்",
      categories: "பிரிவுகள்",
      searchPlaceholder: "வழிகாட்டிகள் அல்லது கட்டுரைகளைத் தேடுங்கள்...",
      author: "எழுதியவர்",
      views: "பார்வைகள்"
    },
    pest: {
      title: "AI பயிர் நோய் மற்றும் பூச்சி கண்டறிதல்",
      uploadTitle: "பயிர் படத்தைப் பதிவேற்றவும்",
      uploadSubtitle: "AI கண்டறிதலுக்கு பாதிக்கப்பட்ட இலை/தாவரத்தின் புகைப்படத்தை இழுத்து விடவும் அல்லது கிளிக் செய்யவும்",
      detecting: "AI மூலம் படம் பகுப்பாய்வு செய்யப்படுகிறது...",
      result: "AI கண்டறிதல் முடிவு",
      diseaseName: "சாத்தியமான நோய்/பூச்சி",
      cause: "காரணம்",
      prevention: "தடுப்பு முறை",
      treatment: "சிகிச்சை முறை"
    },
    expert: {
      title: "விவசாய நிபுணரிடம் கேளுங்கள்",
      askQuestion: "கேள்வி கேளுங்கள்",
      questionPlaceholder: "உங்கள் பயிர் பிரச்சினையை விவரிக்கவும் (எ.கா. 'என் தக்காளி இலைகள் மஞ்சள் நிறமாக மாறுகின்றன, நான் என்ன செய்ய வேண்டும்?')",
      uploadImage: "பயிரின் படத்தைப் பதிவேற்றவும் (விருப்பத்தேர்வு)",
      submit: "கேள்வியைச் சமர்ப்பிக்கவும்",
      recentQuestions: "சமீபத்திய ஆলোசனைகள்",
      answered: "பதிலளிக்கப்பட்டது",
      pending: "பதில் நிலுவையில் உள்ளது",
      expertAnswer: "நிபுணர் பதில்"
    },
    marketplace: {
      title: "அக்ரிகனெக்ட் சந்தை",
      sellBtn: "தயாரிப்பை விற்கவும்",
      rentBtn: "கருவிகளை வாடகைக்கு எடுக்கவும்",
      buyBtn: "விதை & உரங்கள் வாங்கவும்",
      productName: "தயாரிப்பு பெயர்",
      quantity: "அளவு",
      price: "விலை",
      location: "இடம்",
      contact: "விற்பனையாளரைத் தொடர்பு கொள்ளவும்",
      postListing: "புதிய விளம்பரத்தை வெளியிடவும்"
    },
    soil: {
      title: "மண் பரிசோதனை மற்றும் பயிர் பரிந்துரைகள்",
      soilType: "மண் வகை",
      phValue: "pH மதிப்பு",
      recommendBtn: "பரிந்துரையைப் பெறுங்கள்",
      suitableCrops: "பொருத்தமான பயிர்கள்",
      fertilizers: "உர பரிந்துரைகள்"
    }
  }
};

// Global App State
let currentLanguage = localStorage.getItem('language') || 'en';
let currentUser = JSON.parse(localStorage.getItem('user')) || null;

// Farmers Market Prices variables
let trendChartInstance = null;
let compareChartInstance = null;
let activeCropId = null;
let currentChartDays = 30;
let currentSelectedCategory = '';

// Helper function to get auth headers
function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (currentUser && currentUser.token) {
    headers['Authorization'] = `Bearer ${currentUser.token}`;
  }
  return headers;
}

// -------------------------------------------------------------
// Translation Engine
// -------------------------------------------------------------
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  
  const desktopSelect = document.getElementById('language-select');
  if (desktopSelect) desktopSelect.value = lang;
  
  const mobileSelect = document.getElementById('mobile-language-select');
  if (mobileSelect) mobileSelect.value = lang;
  
  // Update translation nodes marked with data-t
  document.querySelectorAll('[data-t]').forEach(el => {
    const path = el.getAttribute('data-t');
    const translation = getTranslationByPath(lang, path);
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  // Sync language with server if user is logged in
  if (currentUser) {
    fetch('/api/auth/profile', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ language: lang })
    }).catch(err => console.error('Failed to sync language preference', err));
  }
}

function getTranslationByPath(lang, path) {
  const keys = path.split('.');
  let current = translations[lang] || translations['en'];
  
  for (const key of keys) {
    if (current[key] === undefined) {
      // English Fallback
      let fallback = translations['en'];
      for (const fKey of keys) {
        if (fallback[fKey] === undefined) return path;
        fallback = fallback[fKey];
      }
      return fallback;
    }
    current = current[key];
  }
  return current;
}

// -------------------------------------------------------------
// Routing Engine
// -------------------------------------------------------------
function navigateToView() {
  let hash = window.location.hash || '#home';
  if (hash === '#') hash = '#home';
  const cleanHash = hash.replace('#', '');
  
  // Hide all sections
  document.querySelectorAll('.view').forEach(view => {
    view.classList.add('hidden');
  });

  // Remove active navbar link highlights
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    link.classList.remove('active');
  });

  // Handle specific dynamic details pages or regular hash routing
  let activeViewId = `view-${cleanHash}`;
  if (cleanHash.startsWith('schemes/')) {
    activeViewId = 'view-scheme-detail';
    const schemeId = cleanHash.split('/')[1];
    loadSchemeDetails(schemeId);
  } else {
    const activeSection = document.getElementById(activeViewId);
    if (activeSection) {
      activeSection.classList.remove('hidden');
    } else {
      document.getElementById('view-home').classList.remove('hidden');
    }
  }

  // Highlight active navbar link
  document.querySelectorAll(`[href="${hash}"]`).forEach(link => {
    link.classList.add('active');
  });

  // Load section datasets
  loadSectionData(cleanHash);
  
  // Close mobile drawer on routing
  document.getElementById('mobile-drawer').classList.add('hidden');
}

function loadSectionData(viewName) {
  if (viewName === 'home' || viewName === '') {
    loadHomeData();
  } else if (viewName === 'crop-prices') {
    loadCropPrices();
  } else if (viewName === 'weather') {
    loadWeather();
  } else if (viewName === 'schemes') {
    loadSchemes();
  } else if (viewName === 'knowledge') {
    loadArticles();
  } else if (viewName === 'expert') {
    loadExpertConsultations();
  } else if (viewName === 'admin') {
    loadAdminDashboard();
  } else if (viewName === 'profile') {
    loadProfileDetails();
  }
}

// -------------------------------------------------------------
// Authentication flow
// -------------------------------------------------------------
function updateAuthUI() {
  const authButtons = document.getElementById('auth-buttons');
  const userProfileMenu = document.getElementById('user-profile-menu');
  const userAvatar = document.getElementById('user-avatar');
  const userName = document.getElementById('user-name');
  const adminBadge = document.getElementById('admin-badge');

  const mobileAuthButtons = document.getElementById('mobile-auth-buttons');
  const mobileUserProfileMenu = document.getElementById('mobile-user-profile-menu');
  const mobileUserAvatar = document.getElementById('mobile-user-avatar');
  const mobileUserName = document.getElementById('mobile-user-name');
  const mobileAdminBadge = document.getElementById('mobile-admin-badge');

  if (currentUser) {
    if (authButtons) authButtons.classList.add('hidden');
    if (mobileAuthButtons) mobileAuthButtons.classList.add('hidden');
    
    if (userProfileMenu) userProfileMenu.classList.remove('hidden');
    if (mobileUserProfileMenu) mobileUserProfileMenu.classList.remove('hidden');
    
    const initial = currentUser.name.charAt(0).toUpperCase();
    if (userAvatar) userAvatar.textContent = initial;
    if (mobileUserAvatar) mobileUserAvatar.textContent = initial;
    
    if (userName) userName.textContent = currentUser.name;
    if (mobileUserName) mobileUserName.textContent = currentUser.name;
    
    if (currentUser.role === 'admin') {
      if (adminBadge) adminBadge.classList.remove('hidden');
      if (mobileAdminBadge) mobileAdminBadge.classList.remove('hidden');
    } else {
      if (adminBadge) adminBadge.classList.add('hidden');
      if (mobileAdminBadge) mobileAdminBadge.classList.add('hidden');
    }
  } else {
    if (authButtons) authButtons.classList.remove('hidden');
    if (mobileAuthButtons) mobileAuthButtons.classList.remove('hidden');
    
    if (userProfileMenu) userProfileMenu.classList.add('hidden');
    if (mobileUserProfileMenu) mobileUserProfileMenu.classList.add('hidden');
  }
  if (typeof setupAdminPanel === 'function') {
    setupAdminPanel();
  }
}

// -------------------------------------------------------------
// Page Data Loaders
// -------------------------------------------------------------

// Home Landing Data
async function loadHomeData() {
  try {
    const [cropsRes, weatherRes] = await Promise.all([
      fetch('/api/crops?limit=4'),
      fetch('/api/weather?city=Hyderabad')
    ]);

    const crops = await cropsRes.json();
    const weather = await weatherRes.json();

    // Render weather summary
    if (weather.success) {
      const wData = weather.data;
      document.getElementById('home-weather-data').innerHTML = `
        <div class="weather-temp flex-row justify-between items-center">
          <span>${wData.current.temp}°C</span>
          <span style="font-size: 36px;">${getWeatherEmoji(wData.current.weather)}</span>
        </div>
        <div class="weather-desc">Feels like ${wData.current.feelsLike}°C &bull; ${wData.current.description}</div>
      `;
    }

    // Render crop list
    if (crops.success) {
      const cList = document.getElementById('home-crop-list');
      cList.innerHTML = crops.data.slice(0, 4).map(c => `
        <div class="crop-summary-item">
          <strong>${c.cropName}</strong>
          <span>₹${c.price}/qtl</span>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load home widget details', err);
  }
}

// Weather Forecast Page
async function loadWeather(queryCity = 'Hyderabad') {
  try {
    const res = await fetch(`/api/weather?city=${queryCity}`);
    const resJson = await res.json();
    if (resJson.success) {
      const data = resJson.data;

      // Current Metrics
      document.getElementById('weather-location-title').textContent = `📍 ${data.city}, India`;
      document.getElementById('weather-temp-val').textContent = `${data.current.temp}°C`;
      document.getElementById('weather-feels-val').innerHTML = `Feels like ${data.current.feelsLike}°C &bull; ${data.current.description}`;
      document.getElementById('weather-big-icon').textContent = getWeatherEmoji(data.current.weather);
      
      document.getElementById('weather-humidity-val').textContent = `${data.current.humidity}%`;
      document.getElementById('weather-wind-val').textContent = `${data.current.windSpeed} km/h`;
      document.getElementById('weather-pressure-val').textContent = `${data.current.pressure} hPa`;

      // Render Recommendations
      const recsList = document.getElementById('weather-recommendations-list');
      recsList.innerHTML = data.recommendations.map(rec => `
        <div class="rec-item ${rec.type}">
          <span>${rec.icon}</span>
          <div>${rec.text}</div>
        </div>
      `).join('');

      // Render 7-day forecast
      const weeklyList = document.getElementById('weather-weekly-list');
      weeklyList.innerHTML = data.forecast.map(day => `
        <div class="forecast-day-card">
          <span class="day">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
          <span style="font-size: 24px; margin: 4px 0;">${getWeatherEmoji(day.weather)}</span>
          <span class="temp-high">${day.tempMax}°C</span>
          <span class="temp-low">${day.tempMin}°C</span>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error(err);
  }
}

// Crop Prices Page
async function loadCropPrices(search = '', state = '', district = '', market = '', category = '') {
  try {
    let url = `/api/crops?search=${encodeURIComponent(search)}&state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&market=${encodeURIComponent(market)}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    
    const res = await fetch(url);
    const data = await res.json();

    if (data.success) {
      cropPriceData = data.data;
      
      // 1. Render Cards Grid
      const cardsContainer = document.getElementById('crop-price-cards-container');
      if (cropPriceData.length === 0) {
        cardsContainer.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--slate-400);">No crop prices found matching the filters.</div>`;
      } else {
        cardsContainer.innerHTML = cropPriceData.map(crop => {
          const change = crop.price - crop.previousPrice;
          const pctChange = crop.previousPrice > 0 ? (change / crop.previousPrice) * 100 : 0;
          const isUp = change > 0;
          const isDown = change < 0;
          const changeClass = isUp ? 'up' : isDown ? 'down' : '';
          const changeIcon = isUp ? '↑' : isDown ? '↓' : '';
          
          return `
            <div class="crop-price-card" onclick="updateTrendChart('${crop._id}')">
              <div class="crop-card-header">
                <span class="crop-card-name">${crop.cropName}</span>
                <span class="crop-card-category">${crop.category}</span>
              </div>
              <div class="crop-card-market-info">📍 ${crop.market}, ${crop.district}</div>
              <div class="crop-card-price-section">
                <div class="crop-card-price-block">
                  <span class="crop-card-today-price">${crop.unit === '₹/Kg' ? '₹' : '₹'}${crop.price}</span>
                  <span class="crop-card-yesterday-price">Yesterday: ₹${crop.previousPrice}</span>
                </div>
                <div class="crop-card-change ${changeClass}">
                  ${changeIcon} ${Math.abs(pctChange).toFixed(1)}%
                </div>
                <div class="sparkline-container">
                  <canvas id="sparkline-${crop._id}" class="sparkline-canvas" width="90" height="35"></canvas>
                </div>
              </div>
              <div class="crop-card-footer">
                <span>Updated: ${new Date(crop.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <button class="view-trend-btn">View Trend &rarr;</button>
              </div>
            </div>
          `;
        }).join('');

        // Draw sparklines on next frame
        setTimeout(() => {
          cropPriceData.forEach(crop => {
            drawSparkline(`sparkline-${crop._id}`, crop.priceHistory);
          });
        }, 50);
      }

      // 2. Render Detailed Table
      const tbody = document.getElementById('crops-table-body');
      if (cropPriceData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--slate-400);">No crop prices found.</td></tr>`;
      } else {
        tbody.innerHTML = cropPriceData.map(crop => {
          const change = crop.price - crop.previousPrice;
          const pctChange = crop.previousPrice > 0 ? (change / crop.previousPrice) * 100 : 0;
          const trendSymbol = change > 0 ? '📈' : change < 0 ? '📉' : '➖';
          const trendClass = change > 0 ? 'text-green' : change < 0 ? 'text-red' : '';
          
          return `
            <tr>
              <td style="font-weight: 800; color: var(--slate-900);">${crop.cropName}</td>
              <td>${crop.market}</td>
              <td>${crop.district}</td>
              <td><span class="badge badge-green">${crop.state}</span></td>
              <td style="font-weight: 800; color: var(--primary);">₹${crop.price} (${crop.unit})</td>
              <td style="color: var(--slate-500);">₹${crop.previousPrice}</td>
              <td>
                <span class="${trendClass} font-bold" style="font-size: 13px;">
                  ${trendSymbol} ${change > 0 ? '+' : ''}${change} (${pctChange.toFixed(1)}%)
                </span>
              </td>
              <td style="text-align: center;">
                <div class="admin-actions-cell" style="justify-content: center;">
                  <button onclick="updateTrendChart('${crop._id}')" class="btn btn-xs btn-outline">📈 Trend</button>
                  ${currentUser && currentUser.role === 'admin' ? `
                    <button onclick="editCropPrice('${crop._id}')" class="btn btn-xs btn-primary" style="background:var(--accent); border-color:var(--accent);">✏️ Edit</button>
                    <button onclick="deleteCropPriceEntry('${crop._id}')" class="btn btn-xs btn-outline" style="color:var(--accent-dark); border-color:var(--accent-dark);">🗑️ Del</button>
                  ` : ''}
                </div>
              </td>
            </tr>
          `;
        }).join('');
      }

      // 3. Auto-Select First Crop for Trend Chart if none selected
      if (cropPriceData.length > 0 && !activeCropId) {
        updateTrendChart(cropPriceData[0]._id);
      }

      // 4. Load stats & movers
      loadCropStats();
      
      // 5. Update admin controls visibility
      setupAdminPanel();
    }
  } catch (err) {
    console.error('Failed to load crop prices', err);
  }
}

// Draw a simple lightweight sparkline on HTML5 Canvas
function drawSparkline(canvasId, priceHistory) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !priceHistory || priceHistory.length < 2) return;
  const ctx = canvas.getContext('2d');
  
  // Set dimensions properly
  canvas.width = 90;
  canvas.height = 35;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Sort history by date
  const sorted = [...priceHistory].sort((a, b) => new Date(a.date) - new Date(b.date));
  const prices = sorted.map(h => h.price);
  
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = (max - min) === 0 ? 1 : (max - min);
  
  const width = canvas.width;
  const height = canvas.height;
  const padding = 2;
  
  ctx.beginPath();
  ctx.lineWidth = 1.5;
  
  const first = prices[0];
  const last = prices[prices.length - 1];
  ctx.strokeStyle = last >= first ? '#10b981' : '#ef4444';
  
  const points = prices.map((price, idx) => {
    const x = padding + (idx / (prices.length - 1)) * (width - padding * 2);
    const y = height - padding - ((price - min) / range) * (height - padding * 2);
    return { x, y };
  });
  
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  // Create area gradient fill
  ctx.lineTo(points[points.length - 1].x, height);
  ctx.lineTo(points[0].x, height);
  ctx.closePath();
  ctx.fillStyle = last >= first ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)';
  ctx.fill();
}

// Fetch stats and render them
async function loadCropStats() {
  try {
    const res = await fetch('/api/crops/stats');
    const resData = await res.json();

    if (resData.success) {
      const stats = resData.data;
      
      // Update counters
      document.getElementById('stat-total-crops').textContent = stats.totalCrops;
      document.getElementById('stat-total-markets').textContent = stats.totalMarkets;
      document.getElementById('stat-up-crops').textContent = stats.trends.up;
      
      // Update last updated timestamp
      const now = new Date();
      document.getElementById('stat-last-updated').innerHTML = `${now.toLocaleDateString([], {month: 'short', day: 'numeric'})} &bull; ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

      // Render Gainers
      const gainersList = document.getElementById('top-gainers-list');
      if (stats.topGainers.length === 0) {
        gainersList.innerHTML = `<div style="font-size: 13px; color: var(--slate-400); padding: 8px 0;">No crops went up today.</div>`;
      } else {
        gainersList.innerHTML = stats.topGainers.map(c => `
          <div class="gainer-card-item">
            <div>
              <strong style="color:var(--slate-800);">${c.cropName}</strong>
              <span style="font-size:11.5px; color:var(--slate-400); margin-left: 6px;">📍 ${c.market}</span>
            </div>
            <div style="text-align: right;">
              <span style="font-weight:800; color:var(--primary);">₹${c.price}</span>
              <span class="badge badge-green" style="margin-left: 8px; font-weight:800;">+${c.pctChange}%</span>
            </div>
          </div>
        `).join('');
      }

      // Render Losers
      const losersList = document.getElementById('top-losers-list');
      if (stats.topLosers.length === 0) {
        losersList.innerHTML = `<div style="font-size: 13px; color: var(--slate-400); padding: 8px 0;">No crops went down today.</div>`;
      } else {
        losersList.innerHTML = stats.topLosers.map(c => `
          <div class="loser-card-item">
            <div>
              <strong style="color:var(--slate-800);">${c.cropName}</strong>
              <span style="font-size:11.5px; color:var(--slate-400); margin-left: 6px;">📍 ${c.market}</span>
            </div>
            <div style="text-align: right;">
              <span style="font-weight:800; color:var(--primary);">₹${c.price}</span>
              <span class="badge badge-red" style="margin-left: 8px; font-weight:800;">${c.pctChange}%</span>
            </div>
          </div>
        `).join('');
      }

      // Populate comparison select dropdown
      const select = document.getElementById('compare-crop-select');
      const prevVal = select.value;
      
      const cropNamesRes = await fetch('/api/crops/names/list');
      const cropNamesData = await cropNamesRes.json();
      
      if (cropNamesData.success) {
        const names = cropNamesData.data;
        select.innerHTML = names.map(name => `<option value="${name}">${name}</option>`).join('');
        
        // Restore selection if existed, or use first and populate comparison chart
        if (prevVal && names.includes(prevVal)) {
          select.value = prevVal;
        } else if (names.length > 0) {
          select.value = names[0];
          updateCompareChart(names[0]);
        }
      }
    }
  } catch (err) {
    console.error('Failed to load crop stats', err);
  }
}

// Fetch historical crop data and render the detailed line chart
async function updateTrendChart(cropId, days = 30) {
  activeCropId = cropId;
  currentChartDays = days;
  
  try {
    const res = await fetch(`/api/crops/${cropId}/history`);
    const resData = await res.json();

    if (resData.success) {
      const cropName = resData.cropName;
      const marketName = resData.market;
      
      // Find the metadata (state, district, price, category) from our cache
      const meta = cropPriceData.find(c => c._id === cropId);
      if (meta) {
        document.getElementById('chart-crop-title').textContent = `${meta.cropName} Price Trend`;
        document.getElementById('chart-crop-subtitle').textContent = `${meta.market} Mandi • ${meta.district}, ${meta.state}`;
      } else {
        document.getElementById('chart-crop-title').textContent = `${cropName} Price Trend`;
        document.getElementById('chart-crop-subtitle').textContent = `${marketName} Mandi`;
      }
      
      const history = resData.data; // array of { date, price }
      
      // Filter history for the selected number of days
      const cutDate = new Date();
      cutDate.setDate(cutDate.getDate() - days);
      const filteredHistory = history.filter(h => new Date(h.date) >= cutDate);
      
      // Extract prices and dates
      const prices = filteredHistory.map(h => h.price);
      const dates = filteredHistory.map(h => {
        const d = new Date(h.date);
        return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
      });

      // Calculate Insights Panel metrics
      const currentPrice = prices[prices.length - 1] || meta?.price || 0;
      const high = prices.length > 0 ? Math.max(...prices) : currentPrice;
      const low = prices.length > 0 ? Math.min(...prices) : currentPrice;
      const sum = prices.reduce((a, b) => a + b, 0);
      const avg = prices.length > 0 ? Math.round(sum / prices.length) : currentPrice;
      
      const unitLabel = meta?.unit || '₹/qtl';
      document.getElementById('insight-current-price').textContent = `₹${currentPrice}`;
      document.getElementById('insight-high-price').textContent = `₹${high}`;
      document.getElementById('insight-low-price').textContent = `₹${low}`;
      document.getElementById('insight-avg-price').textContent = `₹${avg}`;

      // Render Chart
      const canvas = document.getElementById('crop-trend-chart');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      
      if (trendChartInstance) {
        trendChartInstance.destroy();
      }

      // Check if price increases or decreases over the period
      const isUp = prices[prices.length - 1] >= prices[0];
      const lineColor = isUp ? '#10b981' : '#ef4444';
      
      // Create Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, isUp ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

      trendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: `Price (${unitLabel})`,
            data: prices,
            borderColor: lineColor,
            borderWidth: 3,
            backgroundColor: gradient,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: lineColor,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1.5,
            pointRadius: dates.length > 15 ? 2 : 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1e293b',
              titleFont: { family: 'Inter', weight: 'bold' },
              bodyFont: { family: 'Inter' },
              padding: 12,
              cornerRadius: 10,
              displayColors: false
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { family: 'Inter', size: 10 }, color: '#94a3b8' }
            },
            y: {
              grid: { borderDash: [5, 5], color: '#e2e8f0' },
              ticks: { font: { family: 'Inter', size: 10 }, color: '#94a3b8' }
            }
          }
        }
      });
      
      // Scroll into view if requested
      document.getElementById('trend-chart-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } catch (err) {
    console.error('Failed to load crop history', err);
  }
}

// Fetch side-by-side comparison across markets
async function updateCompareChart(cropName) {
  try {
    const res = await fetch(`/api/crops/compare?cropName=${encodeURIComponent(cropName)}`);
    const resData = await res.json();

    if (resData.success) {
      const list = resData.data; // array of CropPrices
      
      const labels = list.map(c => `${c.market} (${c.state.substring(0, 5)})`);
      const prices = list.map(c => c.price);
      
      const canvas = document.getElementById('crop-compare-chart');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      
      if (compareChartInstance) {
        compareChartInstance.destroy();
      }

      compareChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Price per Quintal / Kg (₹)',
            data: prices,
            backgroundColor: 'rgba(15, 81, 40, 0.75)',
            borderColor: 'var(--primary)',
            borderWidth: 1.5,
            borderRadius: 8,
            maxBarThickness: 45
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1e293b',
              padding: 10,
              cornerRadius: 8
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { family: 'Inter', size: 10 }, color: '#94a3b8' }
            },
            y: {
              grid: { borderDash: [4, 4], color: '#e2e8f0' },
              ticks: { font: { family: 'Inter', size: 10 }, color: '#94a3b8' }
            }
          }
        }
      });
    }
  } catch (err) {
    console.error('Failed to load comparison data', err);
  }
}

// Setup Admin Panel buttons depending on role
function setupAdminPanel() {
  const panel = document.getElementById('admin-crud-panel');
  const addBtn = document.getElementById('admin-add-price-btn');
  
  if (currentUser && currentUser.role === 'admin') {
    addBtn?.classList.remove('hidden');
  } else {
    addBtn?.classList.add('hidden');
    panel?.classList.add('hidden');
  }
}

// Toggle Admin CRUD Form Panel for new entry
document.getElementById('admin-add-price-btn')?.addEventListener('click', () => {
  document.getElementById('admin-price-form').reset();
  document.getElementById('admin-crop-id').value = '';
  document.getElementById('admin-form-title').textContent = '⚙️ Add New Crop Price Entry';
  document.getElementById('admin-crud-panel').classList.remove('hidden');
  document.getElementById('admin-crud-panel').scrollIntoView({ behavior: 'smooth' });
});

// Edit crop details in-place
async function editCropPrice(id) {
  try {
    const res = await fetch(`/api/crops/${id}`);
    const data = await res.json();
    if (data.success) {
      const crop = data.data;
      document.getElementById('admin-crop-id').value = crop._id;
      document.getElementById('admin-crop-name').value = crop.cropName;
      document.getElementById('admin-crop-cat').value = crop.category || 'Others';
      document.getElementById('admin-crop-market').value = crop.market;
      document.getElementById('admin-crop-district').value = crop.district;
      document.getElementById('admin-crop-state').value = crop.state;
      document.getElementById('admin-crop-price').value = crop.price;
      document.getElementById('admin-crop-unit').value = crop.unit || '₹/Quintal';
      
      document.getElementById('admin-form-title').textContent = '⚙️ Edit Crop Price Entry';
      document.getElementById('admin-crud-panel').classList.remove('hidden');
      document.getElementById('admin-crud-panel').scrollIntoView({ behavior: 'smooth' });
    }
  } catch (err) {
    alert('Failed to load crop details for editing');
  }
}

// Delete crop price entry
async function deleteCropPriceEntry(id) {
  if (!confirm('Are you sure you want to delete this crop price entry?')) return;
  try {
    const res = await fetch(`/api/crops/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const data = await res.json();
    if (data.success) {
      alert('Crop price deleted successfully');
      loadCropPrices();
    } else {
      alert(data.message || 'Failed to delete');
    }
  } catch (err) {
    alert('Error deleting crop price');
  }
}

// Cancel admin editing/adding
document.getElementById('admin-cancel-btn')?.addEventListener('click', () => {
  document.getElementById('admin-crud-panel').classList.add('hidden');
  document.getElementById('admin-price-form').reset();
  document.getElementById('admin-crop-id').value = '';
});

// Save Admin price update or create
document.getElementById('admin-price-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('admin-crop-id').value;
  const cropName = document.getElementById('admin-crop-name').value;
  const category = document.getElementById('admin-crop-cat').value;
  const market = document.getElementById('admin-crop-market').value;
  const district = document.getElementById('admin-crop-district').value;
  const state = document.getElementById('admin-crop-state').value;
  const price = parseFloat(document.getElementById('admin-crop-price').value);
  const unit = document.getElementById('admin-crop-unit').value;

  const payload = { cropName, category, market, district, state, price, unit };
  const method = id ? 'PUT' : 'POST';
  const endpoint = id ? `/api/crops/${id}` : '/api/crops';

  try {
    const res = await fetch(endpoint, {
      method: method,
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    
    if (data.success) {
      alert(id ? 'Price updated successfully!' : 'New crop price entry created!');
      document.getElementById('admin-crud-panel').classList.add('hidden');
      document.getElementById('admin-price-form').reset();
      document.getElementById('admin-crop-id').value = '';
      loadCropPrices();
    } else {
      alert(data.message || 'Operation failed');
    }
  } catch (err) {
    alert('Error saving crop price details');
  }
});

// Schemes Page
async function loadSchemes(search = '', category = '') {
  try {
    const url = `/api/schemes?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.success) {
      const schemesList = document.getElementById('schemes-list');
      schemesList.innerHTML = data.data.map(scheme => `
        <div class="scheme-card">
          <div>
            <div class="flex-row justify-between mb-4">
              <span class="badge badge-green">${scheme.category}</span>
              <span style="font-size: 11px; color: var(--slate-400); font-weight: 700;">${scheme.ministry}</span>
            </div>
            <h3>${scheme.title}</h3>
            <p>${scheme.description.slice(0, 150)}...</p>
          </div>
          <div class="scheme-card-bottom">
            <span class="text-slate font-bold text-xs">📝 Check process</span>
            <a href="#schemes/${scheme._id}" class="view-details-link">View Details &rarr;</a>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error(err);
  }
}

// Scheme Details Page
async function loadSchemeDetails(id) {
  try {
    const res = await fetch(`/api/schemes/${id}`);
    const data = await res.json();

    if (data.success) {
      const scheme = data.data;
      document.getElementById('view-scheme-detail').classList.remove('hidden');

      document.getElementById('scheme-detail-cat').textContent = scheme.category;
      document.getElementById('scheme-detail-ministry').textContent = scheme.ministry;
      document.getElementById('scheme-detail-title').textContent = scheme.title;
      document.getElementById('scheme-detail-desc').textContent = scheme.description;
      
      document.getElementById('scheme-detail-eligibility').textContent = scheme.eligibility;
      document.getElementById('scheme-detail-benefits').textContent = scheme.benefits;

      const docsUl = document.getElementById('scheme-detail-docs');
      docsUl.innerHTML = scheme.documents.map(d => `<li>${d}</li>`).join('');

      document.getElementById('scheme-detail-process').textContent = scheme.applicationProcess || 'Contact local public office.';
      
      const applyBtn = document.getElementById('scheme-detail-link');
      if (scheme.applyLink) {
        applyBtn.href = scheme.applyLink;
        applyBtn.classList.remove('hidden');
      } else {
        applyBtn.classList.add('hidden');
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Knowledge Guides Center
async function loadArticles(search = '', category = '') {
  try {
    const url = `/api/articles?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.success) {
      const grid = document.getElementById('articles-grid');
      grid.classList.remove('hidden');
      document.getElementById('article-details-container').classList.add('hidden');

      grid.innerHTML = data.data.map(article => `
        <div class="article-card" onclick="openArticleDetails('${article._id}')">
          <div>
            <div class="flex-row justify-between mb-4">
              <span class="badge badge-green">${article.category}</span>
              <span style="font-size: 11px; color: var(--slate-400); font-weight: 700;">👁️ ${article.views} views</span>
            </div>
            <h3>${article.title}</h3>
            <p>${article.summary || article.content.slice(0, 100)}...</p>
          </div>
          <div class="article-card-footer">
            <span>👤 ${article.author}</span>
            <span style="color: var(--primary); font-weight: 800;">Read Guide &rarr;</span>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error(err);
  }
}

async function openArticleDetails(id) {
  try {
    const res = await fetch(`/api/articles/${id}`);
    const data = await res.json();

    if (data.success) {
      const art = data.data;
      document.getElementById('articles-grid').classList.add('hidden');
      
      const detailContainer = document.getElementById('article-details-container');
      detailContainer.classList.remove('hidden');

      document.getElementById('article-det-cat').textContent = art.category;
      document.getElementById('article-det-author').textContent = art.author;
      document.getElementById('article-det-views').textContent = art.views;
      document.getElementById('article-det-title').textContent = art.title;

      // Parse markdown titles & lists in article content simple regex helper
      const parsedContent = art.content
        .split('\n\n')
        .map(p => {
          if (p.startsWith('## ')) {
            return `<h3>${p.replace('## ', '')}</h3>`;
          }
          if (p.startsWith('- ')) {
            const items = p.split('\n').map(i => `<li>${i.replace('- ', '')}</li>`).join('');
            return `<ul class="bullet-list">${items}</ul>`;
          }
          return `<p>${p}</p>`;
        })
        .join('');

      document.getElementById('article-det-content').innerHTML = parsedContent;
    }
  } catch (err) {
    console.error(err);
  }
}

// Ask Expert Consultations Board
async function loadExpertConsultations() {
  try {
    const res = await fetch('/api/questions');
    const data = await res.json();

    if (data.success) {
      const list = document.getElementById('expert-questions-list');
      list.innerHTML = data.data.map(q => {
        const isAnswered = q.status === 'answered';
        const badgeClass = isAnswered ? 'badge-green' : 'badge-yellow';
        
        let answerHtml = '';
        if (isAnswered) {
          answerHtml = `
            <div class="query-answer mt-3">
              <span class="font-bold text-green block text-xs mb-1">🛡️ EXPERT RESPONSE &bull; ${q.answeredBy?.name || 'Crop Doctor'}</span>
              <p>${q.answer}</p>
            </div>
          `;
        }

        let replyFormHtml = '';
        if (!isAnswered && currentUser && (currentUser.role === 'expert' || currentUser.role === 'admin')) {
          replyFormHtml = `
            <div class="expert-reply-area mt-4 border-top pt-3">
              <textarea placeholder="Type scientific advice or remedy prescription here..." class="input-field text-sm" id="reply-text-${q._id}" rows="3"></textarea>
              <button onclick="submitExpertAdvice('${q._id}')" class="btn btn-primary mt-2 py-2 text-xs">Submit Advice</button>
            </div>
          `;
        }

        return `
          <div class="query-card card">
            <div class="flex-row justify-between items-start">
              <div class="query-user-info">
                <div class="initial">${q.userId?.name ? q.userId.name.charAt(0).toUpperCase() : 'F'}</div>
                <div>
                  <strong>${q.userId?.name || 'Farmer'}</strong>
                  <p style="font-size: 11px; color: var(--slate-400);">${q.userId?.district || 'Rural Region'}</p>
                </div>
              </div>
              <span class="badge ${badgeClass}">${q.status}</span>
            </div>

            <div>
              <span class="badge badge-green">${q.category}</span>
              <p class="query-q-text mt-3">${q.question}</p>
            </div>

            ${answerHtml}
            ${replyFormHtml}
          </div>
        `;
      }).join('');
    }
  } catch (err) {
    console.error(err);
  }
}

async function submitExpertAdvice(qId) {
  const replyInput = document.getElementById(`reply-text-${qId}`);
  if (!replyInput || !replyInput.value.trim()) return;

  try {
    const res = await fetch(`/api/questions/${qId}/answer`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ answer: replyInput.value })
    });
    const data = await res.json();
    if (data.success) {
      loadExpertConsultations();
    }
  } catch (err) {
    console.error(err);
  }
}



// Profile Page Details
async function loadProfileDetails() {
  if (!currentUser) return;
  try {
    const res = await fetch('/api/auth/profile', {
      headers: getHeaders()
    });
    const data = await res.json();
    if (data.success) {
      const p = data.data;
      document.getElementById('profile-name').value = p.name || '';
      document.getElementById('profile-mobile').value = p.mobile || '';
      document.getElementById('profile-village').value = p.village || '';
      document.getElementById('profile-district').value = p.district || '';
      document.getElementById('profile-state').value = p.state || '';
      document.getElementById('profile-lang').value = p.language || 'en';
    }
  } catch (err) {
    console.error(err);
  }
}

// Admin Dashboard Page
async function loadAdminDashboard() {
  if (!currentUser || currentUser.role !== 'admin') return;
  try {
    const [dashRes, usersRes] = await Promise.all([
      fetch('/api/admin/dashboard', { headers: getHeaders() }),
      fetch('/api/admin/users', { headers: getHeaders() })
    ]);

    const dash = await dashRes.json();
    const users = await usersRes.json();

    if (dash.success) {
      document.getElementById('admin-stat-farmers').textContent = dash.data.stats.totalFarmers;
      document.getElementById('admin-stat-crops').textContent = dash.data.stats.totalCrops;
      document.getElementById('admin-stat-schemes').textContent = dash.data.stats.totalSchemes;
      document.getElementById('admin-stat-articles').textContent = dash.data.stats.totalArticles;
    }

    if (users.success) {
      const tbody = document.getElementById('admin-users-table');
      tbody.innerHTML = users.data.map(u => `
        <tr>
          <td style="font-weight: 800; color: var(--slate-900);">${u.name}</td>
          <td style="font-family: monospace;">${u.mobile}</td>
          <td>${u.village ? `${u.village}, ` : ''}<strong>${u.district}</strong></td>
          <td>${u.state}</td>
          <td style="text-transform: uppercase; font-weight: 800; color: var(--slate-400);">${u.language}</td>
          <td><span class="badge ${u.role === 'admin' ? 'badge-red' : u.role === 'expert' ? 'badge-sky' : 'badge-green'}">${u.role}</span></td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error(err);
  }
}

// Weather helpers
function getWeatherEmoji(weatherName) {
  const w = weatherName.toLowerCase();
  if (w.includes('rain')) return '🌧️';
  if (w.includes('cloud')) return '⛅';
  if (w.includes('clear') || w.includes('sun')) return '☀️';
  if (w.includes('snow')) return '❄️';
  return '☀️';
}

// -------------------------------------------------------------
// Interactive Feature Forms Logic
// -------------------------------------------------------------

// Pest Image Upload simulation
const mockPestAIResults = [
  {
    diseaseName: "Tomato Early Blight (Alternaria solani)",
    cause: "Fungal pathogen that thrives in warm, humid conditions. Often spread by splashing rain or irrigation water.",
    prevention: "Use certified disease-free seeds, practice crop rotation, avoid overhead irrigation, space plants adequately for air circulation.",
    treatment: "Uproot heavily infested leaves. Apply organic copper-based fungicides or bio-fungicide like Trichoderma viride."
  },
  {
    diseaseName: "Cotton Bollworm Infestation (Helicoverpa armigera)",
    cause: "Moth larvae feeding on cotton squares, flowers, and bolls. Bt cotton resistance or late-season pest buildup.",
    prevention: "Sow early or synchronized crop, plant trap crops like marigold/maize around the field, install pheromone traps.",
    treatment: "Release Trichogramma egg parasitoids, spray Neem-seed kernel extract (NSKE 5%), or apply recommended eco-friendly insecticides."
  },
  {
    diseaseName: "Rice Blast (Magnaporthe oryzae)",
    cause: "Highly destructive fungal pathogen attacking leaves, nodes, and panicles. Prompted by excessive nitrogen fertilizer.",
    prevention: "Avoid over-fertilizing with nitrogen, plant blast-resistant rice varieties, treat seeds with bio-agents.",
    treatment: "Spray Pseudomonas fluorescens liquid formulation. Apply recommended systemic fungicide if disease exceeds critical threshold."
  }
];

document.getElementById('trigger-upload-btn').addEventListener('click', () => {
  document.getElementById('pest-file-input').click();
});

document.getElementById('pest-file-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    document.getElementById('pest-preview-img').src = url;
    document.getElementById('pest-preview-box').classList.remove('hidden');
    document.querySelector('.upload-zone').classList.add('hidden');
    
    // reset outputs
    document.getElementById('pest-real-result').classList.add('hidden');
    document.querySelector('.placeholder-result').classList.remove('hidden');
  }
});

document.getElementById('pest-cancel-btn').addEventListener('click', () => {
  document.getElementById('pest-file-input').value = '';
  document.getElementById('pest-preview-box').classList.add('hidden');
  document.querySelector('.upload-zone').classList.remove('hidden');
  document.getElementById('pest-real-result').classList.add('hidden');
  document.querySelector('.placeholder-result').classList.remove('hidden');
});

document.getElementById('pest-diagnose-btn').addEventListener('click', () => {
  document.querySelector('.placeholder-result').classList.add('hidden');
  document.getElementById('pest-loader').classList.remove('hidden');
  document.getElementById('pest-preview-box').classList.add('hidden');

  setTimeout(() => {
    document.getElementById('pest-loader').classList.add('hidden');
    document.getElementById('pest-real-result').classList.remove('hidden');

    const randRes = mockPestAIResults[Math.floor(Math.random() * mockPestAIResults.length)];
    document.getElementById('pest-result-disease').textContent = randRes.diseaseName;
    document.getElementById('pest-result-cause').textContent = randRes.cause;
    document.getElementById('pest-result-prevention').textContent = randRes.prevention;
    document.getElementById('pest-result-treatment').textContent = randRes.treatment;
  }, 2000);
});

// Soil Recommendation Calculator logic
const soilCropData = {
  alluvial: {
    crops: ['Rice (Paddy)', 'Wheat', 'Sugarcane', 'Maize', 'Mustard', 'Gram'],
    fertilizers: 'FYM (Farm Yard Manure), Urea, DAP (Di-ammonium Phosphate), Potash amendments.',
    idealPh: '6.5 - 7.5'
  },
  black: {
    crops: ['Cotton', 'Soybean', 'Groundnut', 'Wheat', 'Jowar (Sorghum)', 'Chilli'],
    fertilizers: 'Zinc Sulphate, Organic compost, Phosphate fertilizers (SSP), Gypsum (if highly alkaline).',
    idealPh: '6.8 - 8.0'
  },
  red: {
    crops: ['Groundnut', 'Millets (Ragi/Bajra)', 'Tomato', 'Chilli', 'Turmeric', 'Potato'],
    fertilizers: 'Lime amendments (to correct acidity), Farm Yard Manure, NPK balanced fertilizers.',
    idealPh: '5.5 - 6.5'
  },
  laterite: {
    crops: ['Tea', 'Coffee', 'Rubber', 'Cashew Nut', 'Coconut', 'Arecanut'],
    fertilizers: 'Organic matter/compost, Lime/Dolomite (critical to neutralize acid pH), Rock Phosphate.',
    idealPh: '4.5 - 5.5'
  }
};

document.getElementById('soil-ph-slider').addEventListener('input', (e) => {
  document.getElementById('soil-ph-val').textContent = e.target.value;
});

document.getElementById('soil-test-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const soilType = document.getElementById('soil-type-select').value;
  const phVal = parseFloat(document.getElementById('soil-ph-slider').value);

  document.getElementById('soil-placeholder').classList.add('hidden');
  const resultCard = document.getElementById('soil-real-result');
  resultCard.classList.remove('hidden');

  let pHCategory = 'Neutral';
  let pHAdvice = '';

  if (phVal < 6.5) {
    pHCategory = 'Acidic';
    pHAdvice = 'Your soil is acidic. It is recommended to apply agricultural Lime (Calcium Carbonate) or Dolomite to raise the pH level and improve nutrient availability.';
  } else if (phVal > 7.5) {
    pHCategory = 'Alkaline';
    pHAdvice = 'Your soil is alkaline. Applying agricultural Gypsum (Calcium Sulphate) or sulfur amendments is recommended to lower the pH and reduce salt toxicity.';
  } else {
    pHCategory = 'Neutral (Ideal)';
    pHAdvice = 'Perfect soil pH! Nutrient absorption is at its maximum efficiency. Maintain organic matter levels with compost/FYM application.';
  }

  const matches = soilCropData[soilType];
  
  document.getElementById('soil-res-phstatus').textContent = `${pHCategory} (pH: ${phVal})`;
  document.getElementById('soil-res-phadvice').textContent = pHAdvice;
  document.getElementById('soil-res-fertilizers').textContent = matches.fertilizers;

  const cropsContainer = document.getElementById('soil-res-crops');
  cropsContainer.innerHTML = matches.crops.map(c => `<span class="badge badge-green">${c}</span>`).join('');
});

// -------------------------------------------------------------
// Interactive Chatbot Logic
// -------------------------------------------------------------
const chatbotAnswers = [
  {
    keywords: ['fertilizer', 'cotton'],
    answer: "For cotton crop at the flowering stage, it's recommended to apply 30 kg Nitrogen/hectare as a top dressing. You can also spray 2% DAP (Di-ammonium Phosphate) to boost boll development."
  },
  {
    keywords: ['tomato', 'yellow'],
    answer: "Yellowing tomato leaves can be a sign of Nitrogen deficiency (apply Urea at 10g/plant) or Early Blight fungal infection. Make sure to avoid overwatering and spray Trichoderma if you suspect fungus."
  },
  {
    keywords: ['rice', 'paddy', 'water'],
    answer: "Maintain about 5 cm of standing water during the transplanting stage. However, it's best to use the alternate wetting and drying (AWD) method to save water and prevent root decay."
  },
  {
    keywords: ['pm kisan', 'scheme', 'money'],
    answer: "PM-KISAN scheme provides ₹6,000 per year in three installments of ₹2,000 directly to verified bank accounts. You will need your Aadhaar card and land records to register at pmkisan.gov.in."
  },
  {
    keywords: ['soil test', 'how to'],
    answer: "To test soil, dig 15 cm deep v-shaped holes across 8-10 spots in your field. Collect the soil, mix it thoroughly, dry it in shade, and send a 500g sample to your nearest Krishi Vigyan Kendra (KVK)."
  }
];

document.getElementById('chatbot-toggle-btn').addEventListener('click', () => {
  const window = document.getElementById('chatbot-window');
  window.classList.toggle('hidden');
  if (!window.classList.contains('hidden') && document.getElementById('chatbot-messages').children.length === 0) {
    addBotBubble("Hello! I am your AgriConnect AI Assistant. How can I help you today?");
  }
});

document.getElementById('chatbot-close-btn').addEventListener('click', () => {
  document.getElementById('chatbot-window').classList.add('hidden');
});

document.getElementById('chatbot-send-btn').addEventListener('click', sendChatMessage);
document.getElementById('chatbot-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendChatMessage();
});

document.querySelectorAll('.chat-tip-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    sendChatMessage(btn.textContent);
  });
});

function sendChatMessage(presetText) {
  const inputEl = document.getElementById('chatbot-input');
  const text = presetText || inputEl.value;
  if (!text.trim()) return;

  addUserBubble(text);
  inputEl.value = '';
  document.getElementById('chatbot-tips').classList.add('hidden');

  setTimeout(() => {
    let botResponse = "I am processing your question. Please consult with our agriculture experts under the 'Ask Expert' section for verified prescriptions.";
    
    const lowerText = text.toLowerCase();
    for (const item of chatbotAnswers) {
      const matchesAll = item.keywords.every(kw => lowerText.includes(kw));
      if (matchesAll) {
        botResponse = item.answer;
        break;
      }
    }
    addBotBubble(botResponse);
  }, 800);
}

function addUserBubble(text) {
  const container = document.getElementById('chatbot-messages');
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble user';
  bubble.textContent = text;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function addBotBubble(text) {
  const container = document.getElementById('chatbot-messages');
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble bot';
  bubble.textContent = text;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

// -------------------------------------------------------------
// Form Submissions Actions (Auth, Query, Marketplace)
// -------------------------------------------------------------

// Login Form Submit
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const mobile = document.getElementById('login-mobile').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, password })
    });
    const data = await res.json();
    if (data.success) {
      currentUser = data.data;
      localStorage.setItem('user', JSON.stringify(currentUser));
      updateAuthUI();
      window.location.hash = '#home';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Failed to login. Please try again.');
  }
});

// Register Form Submit
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const mobile = document.getElementById('reg-mobile').value;
  const password = document.getElementById('reg-password').value;
  const language = document.getElementById('reg-lang').value;
  const village = document.getElementById('reg-village').value;
  const district = document.getElementById('reg-district').value;
  const state = document.getElementById('reg-state').value;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mobile, password, language, village, district, state })
    });
    const data = await res.json();
    if (data.success) {
      currentUser = data.data;
      localStorage.setItem('user', JSON.stringify(currentUser));
      updateAuthUI();
      window.location.hash = '#home';
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (err) {
    alert('Failed to register account.');
  }
});

// Profile Form Update
document.getElementById('profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('profile-name').value;
  const village = document.getElementById('profile-village').value;
  const district = document.getElementById('profile-district').value;
  const state = document.getElementById('profile-state').value;
  const language = document.getElementById('profile-lang').value;

  try {
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ name, village, district, state, language })
    });
    const data = await res.json();
    if (data.success) {
      currentUser.name = name;
      localStorage.setItem('user', JSON.stringify(currentUser));
      updateAuthUI();
      alert('Profile details updated successfully!');
    }
  } catch (err) {
    alert('Failed to save profile changes.');
  }
});

// Expert Consultations Ask Question Submit
document.getElementById('expert-question-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) {
    window.location.hash = '#login';
    return;
  }
  const category = document.getElementById('expert-query-cat').value;
  const question = document.getElementById('expert-query-text').value;

  if (!question.trim()) return;

  try {
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ category, question })
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('expert-query-text').value = '';
      loadExpertConsultations();
    }
  } catch (err) {
    console.error(err);
  }
});



// -------------------------------------------------------------
// Interactive Search & Filters
// -------------------------------------------------------------

// Crops Search
document.getElementById('crop-search-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const query = document.getElementById('crop-search-input').value;
  const state = document.getElementById('crop-state-filter').value;
  const district = document.getElementById('crop-district-filter').value;
  const market = document.getElementById('crop-market-filter').value;
  loadCropPrices(query, state, district, market, currentSelectedCategory);
});

// Category Tab click listener
document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentSelectedCategory = tab.getAttribute('data-category');
    
    const query = document.getElementById('crop-search-input').value;
    const state = document.getElementById('crop-state-filter').value;
    const district = document.getElementById('crop-district-filter').value;
    const market = document.getElementById('crop-market-filter').value;
    loadCropPrices(query, state, district, market, currentSelectedCategory);
  });
});

// Chart Days Toggle click listener
document.querySelectorAll('.chart-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chart-toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const days = parseInt(btn.getAttribute('data-days'));
    if (activeCropId) {
      updateTrendChart(activeCropId, days);
    }
  });
});

// Compare Crop Select change listener
document.getElementById('compare-crop-select')?.addEventListener('change', (e) => {
  updateCompareChart(e.target.value);
});

// Schemes Search
document.getElementById('scheme-search-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const query = document.getElementById('scheme-search-input').value;
  const cat = document.getElementById('scheme-category-filter').value;
  loadSchemes(query, cat);
});

// Farming Guides Search
document.getElementById('article-search-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const query = document.getElementById('article-search-input').value;
  const cat = document.getElementById('article-category-filter').value;
  loadArticles(query, cat);
});



// Mobile menu toggling drawer
document.getElementById('mobile-toggle').addEventListener('click', () => {
  document.getElementById('mobile-drawer').classList.toggle('hidden');
});

// Logout triggers
document.getElementById('logout-btn').addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem('user');
  updateAuthUI();
  window.location.hash = '#home';
});

// Refresh Crops Prices manually
document.getElementById('refresh-crops-btn').addEventListener('click', () => {
  document.getElementById('crop-search-input').value = '';
  document.getElementById('crop-state-filter').value = '';
  document.getElementById('crop-district-filter').value = '';
  document.getElementById('crop-market-filter').value = '';
  document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
  const allTab = document.querySelector('.category-tab[data-category=""]');
  if (allTab) allTab.classList.add('active');
  currentSelectedCategory = '';
  loadCropPrices();
});

// Weather location query search
document.getElementById('weather-search-btn').addEventListener('click', () => {
  const cityVal = document.getElementById('weather-city-input').value;
  if (cityVal.trim()) {
    loadWeather(cityVal);
    document.getElementById('weather-city-input').value = '';
  }
});

// Global Language Swapping selection listener
document.getElementById('language-select').addEventListener('change', (e) => {
  setLanguage(e.target.value);
});

// Mobile Language Swapping selection listener
document.getElementById('mobile-language-select')?.addEventListener('change', (e) => {
  setLanguage(e.target.value);
});

// Mobile logout trigger
document.getElementById('mobile-logout-btn')?.addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem('user');
  updateAuthUI();
  window.location.hash = '#home';
});

// Hashchange event handlers
window.addEventListener('hashchange', navigateToView);
window.addEventListener('load', () => {
  setLanguage(currentLanguage);
  updateAuthUI();
  
  // Ensure the page redirects to #home on clean load (empty hash) or invalid hash
  const validViews = ['home', 'crop-prices', 'weather', 'schemes', 'knowledge', 'pest', 'expert', 'soil', 'login', 'register', 'profile', 'admin'];
  const hash = window.location.hash;
  const cleanHash = hash.replace('#', '');
  const isDetailsView = cleanHash.startsWith('schemes/');
  
  if (!hash || hash === '#' || (!validViews.includes(cleanHash) && !isDetailsView)) {
    window.location.hash = '#home';
  } else {
    navigateToView();
  }
});
