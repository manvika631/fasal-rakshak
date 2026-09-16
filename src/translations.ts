import { Language } from './types';

export interface Translations {
  nav: {
    home: string;
    checkCrop: string;
    myArea: string;
    community: string;
    myAccount: string;
  };
  common: {
    lowRisk: string;
    mediumRisk: string;
    highRisk: string;
    loadingAnalyzing: string;
    checkCropBtn: string;
    checkAreaBtn: string;
    takeOrUploadPhoto: string;
    samplePhotoPrompt: string;
    testHealthy: string;
    testInfested: string;
    reset: string;
  };
  checkCrop: {
    title: string;
    subtitle: string;
    analyzing: string;
    symptomsVisiblePrefix: string;
    symptomsVisibleDays: string;
    showTechnicalDetails: string;
    hideTechnicalDetails: string;
    warnNearbyBtn: string;
    farmersNotified: string;
    healthyHeading: string;
    healthyReason: string;
    issueDetected: {
      name: string;
      step1: string;
      step2: string;
      step3: string;
      techDosage: string;
      techWeather: string;
    };
  };
  myArea: {
    title: string;
    locationDefault: string;
    riskRisingNotice: string;
    riskLowNotice: string;
    emptyState: string;
    reportsHeading: string;
    mapHead: string;
    mapHint: string;
    report1: {
      issue: string;
      detail: string;
    };
    report2: {
      issue: string;
      detail: string;
    };
    report3: {
      issue: string;
      detail: string;
    };
  };
  askExpert: {
    collapsedLabel: string;
    panelTitle: string;
    panelSubtitle: string;
    close: string;
    welcome: string;
    quickReplies: string[];
    inputPlaceholder: string;
    send: string;
    listening: string;
    voiceUnsupported: string;
    typingAi: string;
    typingExpert: string;
    aiBadge: string;
    expertBadge: string;
    forwardedChip: string;
    forwardedNote: string;
    expertReply: string;
    thresholdLabel: string;
    firstStepLabel: string;
    escalateLabel: string;
    helplineNote: string;
    sprayIntro: string;
    sprayWeather: string;
  };
  myAccount: {
    signedInAs: string;
    signOut: string;
    signInPromptTitle: string;
    signInPromptBody: string;
    signInBtn: string;
    profileHeading: string;
    myFieldHeading: string;
    noFieldRegistered: string;
    fieldDistrict: string;
    fieldCrop: string;
    fieldAlerts: string;
    fieldWeatherNow: string;
    eastWestAxis: string;
    west: string;
    east: string;
    myAreaRef: string;
    requestStateAdvisory: string;
    statusNode: string;
    nodeWaiting: string;
    nodeAvistar: string;
    nodeLocal: string;
    nodeAggregate: string;
    nodeSynced: string;
    nodeSyncedAt: string;
    resilienceNote: string;
    dataGovernance: string;
    firstPartyData: string;
    perVillageForecast: string;
    redundancyCloud: string;
    learningLoop: string;
    hardCopy: string;
    seedLabel: string;
    savedSeeds: string;
    viewAll: string;
    continuityNote: string;
  };
  helpline: {
    ministryName: string;
    number: string;
    tollFreeLabel: string;
    kisanCallCenterLabel: string;
    kisanCallCenterNumber: string;
    operatingHours: string;
    callNow: string;
    bannerText: string;
    pageAssistanceNote: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      checkCrop: 'Check Crop',
      myArea: 'My Area',
      community: 'Community',
      myAccount: 'My Account',
    },
    common: {
      lowRisk: 'Low Risk',
      mediumRisk: 'Medium Risk',
      highRisk: 'High Risk',
      loadingAnalyzing: 'Analyzing your photo...',
      checkCropBtn: 'Check Your Crop',
      checkAreaBtn: 'Check Your Area',
      takeOrUploadPhoto: 'Take or Upload Photo',
      samplePhotoPrompt: 'Or try a sample field photo:',
      testHealthy: 'Healthy Cotton Leaf',
      testInfested: 'Bollworm Infestation',
      reset: 'Check Another Photo'
    },
    checkCrop: {
      title: 'Check Your Crop',
      subtitle: "Take a photo. We'll tell you what's happening — and what to do.",
      analyzing: 'Analyzing your photo...',
      symptomsVisiblePrefix: 'Symptoms fully visible in',
      symptomsVisibleDays: '3 to 4 days',
      showTechnicalDetails: 'Show Technical Details',
      hideTechnicalDetails: 'Hide Technical Details',
      warnNearbyBtn: 'Warn Nearby Farmers',
      farmersNotified: '18 nearby farmers notified in your circle',
      healthyHeading: 'Looks healthy — no signs of disease or pest damage.',
      healthyReason: 'Canopy moisture is stable and nighttime dew has remained within safe thresholds.',
      issueDetected: {
        name: 'Wheat Disease Detected',
        step1: '1. Isolate affected plants or flag the affected area to limit spread.',
        step2: '2. Take additional close-up photos of stems, flag leaf, and spike for your agronomist.',
        step3: '3. Apply the recommended fungicide or cultural control before the next rain event.',
        techDosage: 'Follow label instructions for triazole-based fungicides (propiconazole, tebuconazole) at standard foliar rates. Adjust for crop stage and local resistance profile.',
        techWeather: 'Weather Trigger: High overnight humidity (>85%), temperatures 12–18°C, and extended dew duration (>5 hours) promote wheat disease spread.'
      }
    },
    myArea: {
      title: 'Your Area',
      locationDefault: 'Ralegaon, Yavatmal (Maharashtra)',
      riskRisingNotice: 'Risk is rising — recent nights have been warm and humid.',
      riskLowNotice: 'Weather is currently favorable and pest pressure is within safe thresholds.',
      emptyState: 'No outbreaks reported nearby right now.',
      reportsHeading: 'Recent Local Reports',
      mapHead: 'Affected Area Map',
      mapHint: 'Tap a district or marker for details.',
      report1: {
        issue: 'Pink Bollworm on Cotton',
        detail: '3km away, reported 2 days ago'
      },
      report2: {
        issue: 'Spodoptera litura egg mass on Soybean',
        detail: '5km away, reported yesterday'
      },
      report3: {
        issue: 'Alternaria leaf spot risk',
        detail: '1.5km away, reported 4 hours ago'
      }
    },
    askExpert: {
      collapsedLabel: 'Ask Expert',
      panelTitle: 'Ask an Expert',
      panelSubtitle: 'Simple questions answered instantly. Anything harder reaches a real expert within 24 hours.',
      close: 'Close chat',
      welcome: 'Hi, I\u2019m the Fasal Rakshak assistant. Ask me about a symptom or pest you\u2019re seeing. If I can\u2019t help, I\u2019ll forward you to a human expert.',
      quickReplies: [
        'My cotton has spots',
        'When should I spray?',
        'Rosette flowers in my cotton',
        'Report an outbreak'
      ],
      inputPlaceholder: 'Type your question here…',
      send: 'Send Message',
      listening: 'Listening…',
      voiceUnsupported: 'Voice input isn\u2019t supported in this browser.',
      typingAi: 'Consulting field advisories…',
      typingExpert: 'Forwarding to an agronomist…',
      aiBadge: 'AI Answer',
      expertBadge: 'Expert Answer',
      forwardedChip: 'Forwarded to an expert — reply within 24 hours.',
      forwardedNote: 'You\u2019ll be notified here when they respond.',
      expertReply: 'Thanks, we\u2019ve received your message. An agronomist is reviewing your case and will reply here within 24 hours with a locally adapted plan.',
      thresholdLabel: 'Threshold',
      firstStepLabel: 'First step',
      escalateLabel: 'If ETL is breached',
      helplineNote: 'For immediate agronomist guidance, call Maharashtra Agriculture Helpline: 1800-233-4000',
      sprayIntro: 'Best spraying window: calm early evening when moths start emerging and wind is light (below 10 km/h).',
      sprayWeather: 'Avoid spraying within 12 hours of expected rainfall, and always follow label dilution rates.'
    },
    myAccount: {
      signedInAs: 'Signed in as',
      signOut: 'Sign Out',
      signInPromptTitle: 'Sign in to your farmer account',
      signInPromptBody: 'Sign in to see your alerts, registered fields, community activity and saved resources.',
      signInBtn: 'Sign In',
      profileHeading: 'My Profile',
      myFieldHeading: 'My Registered Fields',
      noFieldRegistered: 'You haven\u2019t registered a field yet. Add your land holding to activate the Field Sentinel early-warning service.',
      fieldDistrict: 'District',
      fieldCrop: 'Crop',
      fieldAlerts: 'Alert Channels',
      fieldWeatherNow: 'Weather Now',
      eastWestAxis: 'East-West axis',
      west: 'West',
      east: 'East',
      myAreaRef: 'View My Area',
      requestStateAdvisory: 'Request State Advisory',
      statusNode: 'Telemetry Status',
      nodeWaiting: 'Waiting for field registration…',
      nodeAvistar: 'AVISTAR',
      nodeLocal: 'Local Mesh',
      nodeAggregate: 'Aggregate',
      nodeSynced: 'Synced',
      nodeSyncedAt: 'Last sync',
      resilienceNote: 'The system degrades gracefully — each tool works independently of the others.',
      dataGovernance: 'Data Governance',
      firstPartyData: 'First-party data, Fasal Rakshak owns the sample index itself',
      perVillageForecast: 'Per-village weather forecast for 48 hours',
      redundancyCloud: 'Multi-regional redundancy on weather, soil and trap sensors',
      learningLoop: 'Learning loop from your verified reports',
      hardCopy: 'Hard-copy summary for offline access',
      seedLabel: 'Certified Seed Directory',
      savedSeeds: 'Certified seed providers',
      viewAll: 'View All',
      continuityNote: 'Continuity, redundancy, and data governance built into every layer.'
    },
    helpline: {
      ministryName: 'Maharashtra Agriculture Department (Krishi Vibhag)',
      number: '1800-233-4000',
      tollFreeLabel: 'Toll-Free Helpline',
      kisanCallCenterLabel: 'National Kisan Call Center',
      kisanCallCenterNumber: '1800-180-1551',
      operatingHours: '6:00 AM – 10:00 PM (All 7 Days)',
      callNow: 'Call Helpline',
      bannerText: 'Maharashtra Agriculture Ministry Helpline: 1800-233-4000 (Toll-Free)',
      pageAssistanceNote: 'For immediate government agronomist guidance or reporting outbreaks, call Maharashtra Agriculture Helpline: 1800-233-4000'
    }
  },
  hi: {
      nav: {
        home: 'होम',
        checkCrop: 'फसल जांचें',
        myArea: 'मेरा क्षेत्र',
        community: 'किसान समुदाय',
        myAccount: 'मेरा खाता',
      },
      common: {
        lowRisk: 'कम जोखिम',
        mediumRisk: 'मध्यम जोखिम',
        highRisk: 'उच्च जोखिम',
        loadingAnalyzing: 'आपकी फोटो की जांच हो रही है...',
        checkCropBtn: 'अपनी फसल की जांच करें',
        checkAreaBtn: 'अपने क्षेत्र का जोखिम देखें',
        takeOrUploadPhoto: 'फोटो खींचें या अपलोड करें',
        samplePhotoPrompt: 'या खेत की एक नमूना फोटो से देखें:',
        testHealthy: 'स्वस्थ कपास का पत्ता',
        testInfested: 'गुलाबी सुंडी का प्रकोप',
        reset: 'दूसरी फोटो जांचें'
      },
      checkCrop: {
        title: 'अपनी फसल की जांच करें',
        subtitle: 'एक फोटो लें। हम बताएंगे कि क्या हो रहा है — और आगे क्या करना है।',
        analyzing: 'आपकी फोटो की जांच हो रही है...',
        symptomsVisiblePrefix: 'लक्षण पूरी तरह दिखाई देंगे',
        symptomsVisibleDays: '3 से 4 दिनों में',
        showTechnicalDetails: 'तकनीकी विवरण देखें',
        hideTechnicalDetails: 'तकनीकी विवरण छिपाएं',
        warnNearbyBtn: 'आसपास के किसानों को सावधान करें',
        farmersNotified: 'आपके क्षेत्र के 18 किसानों को अलर्ट भेज दिया गया है',
        healthyHeading: 'फसल स्वस्थ दिख रही है — बीमारी या कीट का कोई लक्षण नहीं है।',
        healthyReason: 'फसल की नमी सामान्य है और रात की ओस सुरक्षित सीमा में बनी हुई है।',
        issueDetected: {
          name: 'गुलाबी सुंडी',
          step1: '1. पतंगों की निगरानी के लिए तुरंत प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं।',
          step2: '2. शाम के समय नए खिले फूलों की जांच करें कि क्या उनमें इल्ली घुसी है।',
          step3: '3. आने वाली बारिश से पहले नीम के बीज के अर्क का छिड़काव करें।',
          techDosage: 'Formulation: NSKE 5% (50ml / 10L water) or Trichogramma bactrae (60,000 parasitoids/acre). Emergency chemical intervention: Emamectin benzoate 5% SG @ 4g/10L water.',
          techWeather: 'Weather Trigger: Nocturnal RH > 88% and minimum temperature 26°C with 6.5 hours dew duration accelerating egg hatch.'
        }
      },
      myArea: {
        title: 'आपका क्षेत्र',
        locationDefault: 'रालेगांव, यवतमाल (महाराष्ट्र)',
        riskRisingNotice: 'जोखिम बढ़ रहा है — पिछली रातें गर्म और अधिक नमी वाली रही हैं।',
        riskLowNotice: 'वर्तमान में मौसम अनुकूल है और कीटों का दबाव सामान्य सीमा में है।',
        emptyState: 'वर्तमान में आसपास किसी नए प्रकोप की सूचना नहीं है।',
        reportsHeading: 'क्षेत्र की हालिया गतिविधियां',
        mapHead: 'प्रभावित क्षेत्रों का नक्शा',
        mapHint: 'विवरण के लिए जिले या मार्कर पर टैप करें।',
        report1: {
          issue: 'कपास पर गुलाबी सुंडी',
          detail: '3 किमी दूर, 2 दिन पहले दर्ज'
        },
        report2: {
          issue: 'सोयाबीन पर स्पोडोप्टेरा अंडे',
          detail: '5 किमी दूर, कल दर्ज'
        },
        report3: {
          issue: 'अल्टरनेरिया पत्ती धब्बा जोखिम',
          detail: '1.5 किमी दूर, 4 घंटे पहले दर्ज'
        }
      },
      askExpert: {
        collapsedLabel: 'विशेषज्ञ से पूछें',
        panelTitle: 'विशेषज्ञ से पूछें',
        panelSubtitle: 'आसान सवालों के जवाब तुरंत मिलते हैं। मुश्किल मामलों में 24 घंटे के भीतर असली विशेषज्ञ मदद करेगा।',
        close: 'चैट बंद करें',
        welcome: 'नमस्ते, मैं फसल रक्षक सहायक हूं। अपने खेत में दिख रहे लक्षण या कीट के बारे में पूछें। अगर मैं मदद न कर पाऊं, तो आपको एक विशेषज्ञ से जोड़ दूंगा।',
        quickReplies: [
          'मेरे कपास पर धब्बे हैं',
          'मुझे छिड़काव कब करना चाहिए?',
          'कपास के फूल में गुलाबी सुंडी',
          'प्रकोप की रिपोर्ट करें'
        ],
        inputPlaceholder: 'अपना सवाल यहां लिखें…',
        send: 'संदेश भेजें',
        listening: 'सुन रहा हूं…',
        voiceUnsupported: 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।',
        typingAi: 'खेत सलाह देख रहे हैं…',
        typingExpert: 'कृषि विशेषज्ञ को भेजा जा रहा है…',
        aiBadge: 'AI उत्तर',
        expertBadge: 'विशेषज्ञ उत्तर',
        forwardedChip: 'विशेषज्ञ को भेज दिया गया — 24 घंटे में उत्तर मिलेगा।',
        forwardedNote: 'जवाब मिलते ही आपको यहां सूचित किया जाएगा।',
        expertReply: 'धन्यवाद, आपका संदेश मिल गया है। एक कृषि विशेषज्ञ आपके मामले की समीक्षा कर रहे हैं और 24 घंटे के भीतर यहीं पर आपके क्षेत्र के लिए उपयुक्त योजना बताएंगे।',
        thresholdLabel: 'सीमा (ETL)',
        firstStepLabel: 'पहला कदम',
        escalateLabel: 'यदि ETL पार हो जाए',
        helplineNote: 'तत्काल सलाह के लिए महाराष्ट्र कृषि हेल्पलाइन पर कॉल करें: 1800-233-4000',
        sprayIntro: 'सर्वश्रेष्ठ छिड़काव समय: शांत शाम के समय जब पतंगे निकलने लगें और हवा हल्की हो (10 किमी/घंटा से कम)।',
        sprayWeather: 'अपेक्षित बारिश से 12 घंटे पहले छिड़काव न करें, और हमेशा लेबल पर दिए गए घोल अनुपात का पालन करें।'
      },
      myAccount: {
        signedInAs: 'इस खाते से साइन इन',
        signOut: 'साइन आउट',
        signInPromptTitle: 'किसान खाते में साइन इन करें',
        signInPromptBody: 'अपने अलर्ट, पंजीकृत खेत, सामुदायिक गतिविधि और सुरक्षित संसाधन देखने के लिए साइन इन करें।',
        signInBtn: 'साइन इन',
        profileHeading: 'मेरी प्रोफाइल',
        myFieldHeading: 'मेरे पंजीकृत खेत',
        noFieldRegistered: 'आपने अभी तक कोई खेत पंजीकृत नहीं किया है। फील्ड सेंटिनल चेतावनी सेवा सक्रिय करने के लिए अपनी जमीन जोड़ें।',
        fieldDistrict: 'जिला',
        fieldCrop: 'फसल',
        fieldAlerts: 'अलर्ट चैनल',
        fieldWeatherNow: 'अभी का मौसम',
        eastWestAxis: 'पूर्व-पश्चिम धुरी',
        west: 'पश्चिम',
        east: 'पूर्व',
        myAreaRef: 'मेरा क्षेत्र देखें',
        requestStateAdvisory: 'राज्य सलाह मांगें',
        statusNode: 'टेलीमेट्री स्थिति',
        nodeWaiting: 'खेत पंजीकरण की प्रतीक्षा…',
        nodeAvistar: 'एविस्टार',
        nodeLocal: 'स्थानीय नेटवर्क',
        nodeAggregate: 'एकत्रित',
        nodeSynced: 'सिंक हुआ',
        nodeSyncedAt: 'आखिरी सिंक',
        resilienceNote: 'सिस्टम बिना किसी रुकावट के काम करता है — हर उपकरण दूसरों से स्वतंत्र है।',
        dataGovernance: 'डेटा शासन',
        firstPartyData: 'प्रथम-पक्ष डेटा, फसल रक्षक स्वयं नमूना सूचकांक का मालिक है',
        perVillageForecast: '48 घंटे का गांव-वार मौसम पूर्वानुमान',
        redundancyCloud: 'मौसम, मिट्टी और ट्रैप सेंसर पर बहु-क्षेत्रीय रिडंडेंसी',
        learningLoop: 'आपकी सत्यापित रिपोर्ट से सीखने का चक्र',
        hardCopy: 'ऑफलाइन पहुंच के लिए प्रिंट सारांश',
        seedLabel: 'प्रमाणित बीज निर्देशिका',
        savedSeeds: 'प्रमाणित बीज आपूर्तिकर्ता',
        viewAll: 'सभी देखें',
        continuityNote: 'हर परत में निरंतरता, रिडंडेंसी और डेटा शासन निर्मित।'
      },
      helpline: {
        ministryName: 'महाराष्ट्र कृषि विभाग (कृषि मंत्रालय)',
        number: '1800-233-4000',
        tollFreeLabel: 'टोल-फ्री शेतकरी / किसान हेल्पलाइन',
        kisanCallCenterLabel: 'राष्ट्रीय किसान कॉल सेंटर',
        kisanCallCenterNumber: '1800-180-1551',
        operatingHours: 'सुबह 6:00 से रात 10:00 बजे तक (सातों दिन)',
        callNow: 'हेल्पलाइन पर कॉल करें',
        bannerText: 'महाराष्ट्र कृषि मंत्रालय हेल्पलाइन: 1800-233-4000 (टोल-फ्री)',
        pageAssistanceNote: 'तत्काल सरकारी कृषि विशेषज्ञ सलाह या बीमारी रिपोर्ट करने के लिए: 1800-233-4000'
      }
    },
    mr: {
      nav: {
        home: 'मुख्यपृष्ठ',
        checkCrop: 'पीक तपासा',
        myArea: 'माझा परिसर',
        community: 'शेतकरी समुदाय',
        myAccount: 'माझे खाते',
      },
      common: {
        lowRisk: 'कमी धोका',
        mediumRisk: 'मध्यम धोका',
        highRisk: 'जास्त धोका',
        loadingAnalyzing: 'तुमच्या फोटोचे विश्लेषण सुरू आहे...',
        checkCropBtn: 'आपले पीक तपासा',
        checkAreaBtn: 'तुमचा परिसर तपासा',
        takeOrUploadPhoto: 'फोटो काढा किंवा अपलोड करा',
        samplePhotoPrompt: 'किंवा नमुना शेताचा फोटो निवडा:',
        testHealthy: 'निरोगी कापूस पान',
        testInfested: 'बोंडअळीचा प्रादुर्भाव',
        reset: 'दुसरा फोटो तपासा'
      },
      checkCrop: {
        title: 'तुमचे पीक तपासा',
        subtitle: 'एक फोटो काढा. आम्ही सांगू शेतात काय घडतंय — आणि काय उपाय करायचे.',
        analyzing: 'तुमच्या फोटोचे विश्लेषण सुरू आहे...',
        symptomsVisiblePrefix: 'लक्षणे पूर्णपणे दिसू लागतील',
        symptomsVisibleDays: '3 ते 4 दिवसांत',
        showTechnicalDetails: 'तांत्रिक तपशील पहा',
        hideTechnicalDetails: 'तांत्रिक तपशील लपवा',
        warnNearbyBtn: 'परिसरातील शेतकऱ्यांना सावध करा',
        farmersNotified: 'तुमच्या परिसरातील 18 शेतकऱ्यांना अलर्ट पाठवला गेला आहे',
        healthyHeading: 'पीक निरोगी दिसत आहे — रोग किंवा किडीची कोणतीही लक्षणे नाहीत.',
        healthyReason: 'पिकातील ओलावा योग्य असून रात्रीचे दव सुरक्षित पातळीवर आहे.',
        issueDetected: {
          name: 'गुलाबी बोंडअळी',
          step1: '1. पतंगांच्या हालचालींवर लक्ष ठेवण्यासाठी लगेच एकरी 5 कामगंध सापळे लावा.',
          step2: '2. संध्याकाळच्या वेळी ताज्या उमललेल्या फुलांची तपासणी करा.',
          step3: '3. पाऊस सुरू होण्यापूर्वी कडुनिंब अर्क (नीम अर्क) फवारा.',
          techDosage: 'Formulation: NSKE 5% (50ml / 10L water) or Trichogramma bactrae (60,000 parasitoids/acre). Emergency chemical intervention: Emamectin benzoate 5% SG @ 4g/10L water.',
          techWeather: 'Weather Trigger: Nocturnal RH > 88% and minimum temperature 26°C with 6.5 hours dew duration accelerating egg hatch.'
        }
      },
      myArea: {
        title: 'तुमचा परिसर',
        locationDefault: 'राळेगाव, यवतमाळ (महाराष्ट्र)',
        riskRisingNotice: 'धोका वाढत आहे — गेले काही दिवस रात्री उष्ण आणि दमट हवामान आहे.',
        riskLowNotice: 'सध्या हवामान सुरक्षित असून किडींचा प्रादुर्भाव नियंत्रणात आहे.',
        emptyState: 'सध्या परिसरात कोणताही प्रादुर्भाव नोंदवलेला नाही.',
        reportsHeading: 'परिसरातील ताज्या नोंदी',
        mapHead: 'प्रादुर्भाव क्षेत्रांचा नकाशा',
        mapHint: 'माहितीसाठी जिल्हा किंवा मार्करवर टॅप करा.',
        report1: {
          issue: 'कापसावर गुलाबी बोंडअळी',
          detail: '3 किमी अंतरावर, 2 दिवसांपूर्वी नोंदवले'
        },
        report2: {
          issue: 'सोयाबीनवर लष्करी अळीची अंडी',
          detail: '5 किमी अंतरावर, काल नोंदवले'
        },
        report3: {
          issue: 'अल्टरनेरिया पानांवरील ठिपके धोका',
          detail: '1.5 किमी अंतरावर, 4 तासांपूर्वी नोंदवले'
        }
      },
      askExpert: {
        collapsedLabel: 'तज्ज्ञांना विचारा',
        panelTitle: 'तज्ज्ञांना विचारा',
        panelSubtitle: 'सोप्या प्रश्नांची उत्तरे त्वरित मिळतात. गुंतागुंतीच्या प्रश्नांसाठी २४ तासांत खरा तज्ज्ञ उत्तर देईल.',
        close: 'चॅट बंद करा',
        welcome: 'नमस्कार, मी फसल रक्षक सहाय्यक. तुमच्या शेतात दिसत असलेल्या लक्षणांबद्दल किंवा किडीबद्दल विचारा. मी मदत करू शकलो नाही तर तज्ज्ञाकडे वळवू. तुम्हाला एका तज्ज्ञाशी जोडू.',
        quickReplies: [
          'माझ्या कापसावर ठिपके आहेत',
          'फवारणी कधी करावी?',
          'कापसावर गुलाबी बोंडअळी',
          'प्रादुर्भावाची नोंद करा'
        ],
        inputPlaceholder: 'तुमचा प्रश्न येथे लिहा…',
        send: 'संदेश पाठवा',
        listening: 'ऐकत आहे…',
        voiceUnsupported: 'या ब्राउझरमध्ये व्हॉइस इनपुट समर्थित नाही.',
        typingAi: 'शेतातील सल्ले तपासत आहे…',
        typingExpert: 'कृषी तज्ज्ञाकडे पाठवत आहे…',
        aiBadge: 'AI उत्तर',
        expertBadge: 'तज्ज्ञ उत्तर',
        forwardedChip: 'तज्ज्ञाकडे पाठवले — २४ तासांत उत्तर मिळेल.',
        forwardedNote: 'उत्तर आल्यावर तुम्हाला येथेच कळवले जाईल.',
        expertReply: 'धन्यवाद, तुमचा संदेश मिळाला आहे. एक कृषी तज्ज्ञ तुमच्या प्रकरणाचे पुनरावलोकन करत आहे आणि २४ तासांत येथेच स्थानिक उपयोगी योजना सांगेल.',
        thresholdLabel: 'मर्यादा (ETL)',
        firstStepLabel: 'पहिली पायरी',
        escalateLabel: 'ETL पार झाल्यास',
        helplineNote: 'तत्काळ सल्ल्यासाठी महाराष्ट्र कृषी हेल्पलाइनवर कॉल करा: 1800-233-4000',
        sprayIntro: 'सर्वोत्तम फवारणी वेळ: शांत सायंकाळी जेव्हा पतंग बाहेर येऊ लागतात आणि वारा हलका असतो (१० किमी/तासांपेक्षा कमी).',
        sprayWeather: 'अपेक्षित पावसाच्या १२ तासांपूर्वी फवारणी टाळा आणि नेहमी लेबलवर दिलेल्या घनतेचे पालन करा.'
      },
      myAccount: {
        signedInAs: 'याच खात्याने साइन इन केले आहे',
        signOut: 'साइन आउट',
        signInPromptTitle: 'तुमच्या शेतकरी खात्यात प्रवेश करा',
        signInPromptBody: 'तुमचे अलर्ट, नोंदणी केलेली शेते, समुदायातील हालचाली आणि सुरक्षित संसाधने पाहण्यासाठी साइन इन करा.',
        signInBtn: 'साइन इन',
        profileHeading: 'माझे प्रोफाइल',
        myFieldHeading: 'माझी नोंदणीकृत शेते',
        noFieldRegistered: 'तुम्ही अजून शेताची नोंदणी केलेली नाही. फील्ड सेंटिनल इअर्ली-वॉर्निंग सेवा सुरू करण्यासाठी तुमची जमीन जोडा.',
        fieldDistrict: 'जिल्हा',
        fieldCrop: 'पीक',
        fieldAlerts: 'अलर्ट चॅनेल',
        fieldWeatherNow: 'आत्ताचे हवामान',
        eastWestAxis: 'पूर्व-पश्चिम अक्ष',
        west: 'पश्चिम',
        east: 'पूर्व',
        myAreaRef: 'माझा परिसर पहा',
        requestStateAdvisory: 'राज्य सल्ला मागवा',
        statusNode: 'टेलीमेट्री स्थिती',
        nodeWaiting: 'शेत नोंदणीची प्रतीक्षा…',
        nodeAvistar: 'AVISTAR',
        nodeLocal: 'स्थानिक नेटवर्क',
        nodeAggregate: 'एकत्रित',
        nodeSynced: 'सिंक झाले',
        nodeSyncedAt: 'शेवटचे सिंक',
        resilienceNote: 'सिस्टीम कोणत्याही व्यत्ययाशिवाय काम करते — प्रत्येक साधन दुसऱ्यापासून स्वतंत्र आहे.',
        dataGovernance: 'डेटा गव्हर्नन्स',
        firstPartyData: 'फर्स्ट-पार्टी डेटा, नमुना निर्देशांक फसल रक्षककडेच असतो',
        perVillageForecast: '४८ तासांचा गावनिहाय हवामान अंदाज',
        redundancyCloud: 'हवामान, माती व सापळा सेन्सरवर मल्टी-रीजनल रिडंडन्सी',
        learningLoop: 'तुमच्या पडताळणी झालेल्या नोंदींवरून शिकण्याची प्रक्रिया',
        hardCopy: 'ऑफलाइन वापरासाठी छापील सारांश',
        seedLabel: 'प्रमाणित बियाणे निर्देशिका',
        savedSeeds: 'प्रमाणित बियाणे पुरवठादार',
        viewAll: 'सर्व पहा',
        continuityNote: 'प्रत्येक थरात निरंतरता, रिडंडन्सी आणि डेटा गव्हर्नन्स समाविष्ट.'
      },
      helpline: {
        ministryName: 'महाराष्ट्र शासन कृषी विभाग (मंत्रालय)',
        number: '1800-233-4000',
        tollFreeLabel: 'टोल-फ्री शेतकरी सहाय्यता हेल्पलाइन',
        kisanCallCenterLabel: 'राष्ट्रीय किसान कॉल सेंटर',
        kisanCallCenterNumber: '1800-180-1551',
        operatingHours: 'सकाळी 6:00 ते रात्री 10:00 (सर्व दिवस)',
        callNow: 'हेल्पलाइनवर कॉल करा',
        bannerText: 'महाराष्ट्र कृषी मंत्रालय शेतकरी हेल्पलाइन: १८००-२३३-४००० (टोल-फ्री)',
        pageAssistanceNote: 'तातडीच्या शासकीय कृषी तज्ज्ञ सल्ला किंवा किडीच्या माहितीसाठी: १८००-२३३-४०००'
      }
    }
};
