import { Language } from './types';

export interface Translations {
  nav: {
    home: string;
    checkCrop: string;
    myArea: string;
    community: string;
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
