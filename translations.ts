

export type LanguageCode = 'en' | 'hi' | 'te';

type Translations = {
    [key: string]: string;
};

type AllTranslations = {
    en: Translations;
    hi: Translations;
    te: Translations;
};

export const translations: AllTranslations = {
    en: {
        // App General
        appName: "WorkNest",
        languageTooltip: "Language",
        languageEn: "English",
        languageHi: "हिन्दी",
        languageTe: "తెలుగు",

        // Navbar
        navFindJobs: "Find Jobs",
        navFindHomes: "Find Homes",
        navPostNew: "Post New",
        navPostJob: "Post a Job",
        navPostHome: "Post a Home",
        logoPlaceholder: "LOGO",
        navLogin: "Login",
        navRegister: "Register",
        navLogout: "Logout",
        navWelcome: "Welcome", // Followed by user email, e.g., "Welcome, user@example.com"

        // Footer
        footerRights: "All rights reserved.",
        footerTagline: "Connecting communities, one job and one home at a time.",

        // Landing Page
        'landingWelcome.prefix': "Welcome to ",
        'landingWelcome.suffix': "",
        landingSubtitle: "Your trusted platform for finding informal jobs and rental homes across India. Simple, accessible, and built for you.",
        landingFindJobTitle: "Find a Job",
        landingFindJobDesc: "Explore local job opportunities in various sectors. Start your search today!",
        landingFindHomeTitle: "Find a Home",
        landingFindHomeDesc: "Discover rental homes that meet your needs and preferences. Find your perfect space!",
        landingPostListingPrompt: "Employers & Owners:",
        landingPostJobTitle: "Post a Job",
        landingPostJobDesc: "Share your job vacancy with the community.",
        landingPostHomeTitle: "Post a Home",
        landingPostHomeDesc: "List your property for rent and find suitable tenants.",

        // Job Search Page
        jobSearchPageTitle: "Find Your Next Job",
        jobSearchNoResults: "No jobs found matching your criteria. Try adjusting your filters.",
        jobCardPosted: "Posted",
        jobCardViewDetails: "View Details",
        jobCardContactMessage: "Contact details for {{title}}",
        jobCardLoginPrompt: "Please log in to view contact details.",

        // Home Search Page
        homeSearchPageTitle: "Find Your Perfect Home",
        homeSearchNoResults: "No homes found matching your criteria. Try adjusting your filters.",
        homeCardPosted: "Posted",
        homeCardViewDetails: "View Details",
        homeCardContactMessage: "Contact details for {{title}}",
        homeCardRentSuffix: "/ month",
        homeCardBedroomsStudio: "Studio",
        homeCardBedroomsBHK: "{{count}} BHK",
        homeCardFoodPrefix: "Food",
        homeCardCommunityPrefix: "Community",
        homeCardLoginPrompt: "Please log in to view contact details.",

        // Details Pages
        detailsNotFoundJob: "Job Not Found",
        detailsNotFoundHome: "Home Not Found",
        detailsNotFoundMessage: "The listing you are looking for does not exist or has been removed.",
        backToSearch: "Back to Search Results",
        keyInfo: "Key Information",
        fullDescription: "Full Description",
        contactEmployer: "Contact Employer",
        contactOwner: "Contact Owner",
        loginToViewContact: "Login to view contact details",
        loginButton: "Login to View",

        // Filters General
        filterKeywordLabel: "Keyword",
        filterLocationLabel: "Location",
        filterKeywordPlaceholderJobs: "e.g., Cook, Driver",
        filterKeywordPlaceholderHomes: "e.g., Bangalore, 2BHK",
        filterLocationPlaceholder: "e.g., Mumbai, Delhi",

        // Job Filters
        filterJobTypeLabel: "Job Type",
        filterJobCategoryLabel: "Job Category",

        // Home Filters
        filterPropertyTypeLabel: "Property Type",
        filterBedroomsLabel: "Bedrooms",
        filterRentMinLabel: "Min Rent (₹)",
        filterRentMaxLabel: "Max Rent (₹)",
        filterRentMinPlaceholder: "Min",
        filterRentMaxPlaceholder: "Max",
        filterFoodPreferenceLabel: "Food Preference",
        filterCommunityPreferenceLabel: "Community Preference",

        // Post Listing Pages
        postJobPageTitle: "Post a New Job Listing",
        postHomePageTitle: "Post a New Home Listing",

        formLabelTitle: "Title",
        formLabelEmployer: "Employer Name",
        formLabelLocation: "Location (e.g., City, State)",
        formLabelJobType: "Job Type",
        formLabelJobCategory: "Job Category",
        formLabelDescription: "Description",
        formLabelSalary: "Salary (e.g., ₹15,000/month, Negotiable)",
        formLabelContact: "Contact Information (Phone/Email)",
        formButtonPostJob: "Post Job",
        formSuccessJobPosted: "Job posted successfully!",

        formLabelAddress: "Full Address",
        formLabelRent: "Monthly Rent (₹)",
        formLabelPropertyType: "Property Type",
        formLabelBedrooms: "Number of Bedrooms",
        formLabelBathrooms: "Number of Bathrooms",
        formLabelAreaSqFt: "Area (sq. ft.) (Optional)",
        formLabelFoodPreference: "Food Preference",
        formLabelCommunityPreference: "Community Preference (Optional)",
        formLabelImages: "Upload Images (min. 5 required)",
        formImageUploadPrompt: "Click to upload files",
        formImageTypeHint: "PNG, JPG up to 5MB each",
        formButtonPostHome: "Post Home",
        formSuccessHomePosted: "Home posted successfully!",

        formPlaceholderTitleJob: "e.g., Experienced Cook Needed",
        formPlaceholderTitleHome: "e.g., Spacious 2 BHK in Koramangala",
        formPlaceholderEmployer: "e.g., Sharma Family, Gupta Enterprises",
        formPlaceholderLocation: "e.g., Koramangala, Bangalore",
        formPlaceholderSalary: "e.g., 15000, Negotiable",
        formPlaceholderContact: "e.g., 98XXXXXX00, name@example.com",
        formPlaceholderDescriptionJob: "Provide details about the job, responsibilities, requirements, etc.",
        formPlaceholderDescriptionHome: "Describe the property, amenities, neighborhood, rules, etc.",
        formPlaceholderAddress: "e.g., 123 Main St, Koramangala, Bangalore",
        formPlaceholderRent: "e.g., 25000",
        formPlaceholderBedrooms: "e.g., 2",
        formPlaceholderBathrooms: "e.g., 2",
        formPlaceholderAreaSqFt: "e.g., 1100",

        formErrorRequired: "This field is required.",
        formErrorNumber: "Please enter a valid number.",
        formErrorPositiveNumber: "Please enter a positive number.",
        formErrorEmail: "Please enter a valid email address.",
        formErrorPasswordLength: "Password must be at least 6 characters.",
        formErrorPasswordMatch: "Passwords do not match.",
        formErrorMinImages: "Please upload at least 5 images.",

        // Auth Pages (Login, Register)
        loginPageTitle: "Login to WorkNest",
        loginFormLabelEmail: "Email Address",
        loginFormLabelPassword: "Password",
        loginFormButton: "Login",
        loginFormLinkToRegister: "Don't have an account?",
        loginFormLinkRegisterNow: "Register Now",
        loginErrorInvalid: "Invalid email or password. Please try again.",
        loginSuccess: "Logged in successfully! Redirecting...",

        registerPageTitle: "Create Your WorkNest Account",
        registerFormLabelEmail: "Email Address",
        registerFormLabelPassword: "Password",
        registerFormLabelConfirmPassword: "Confirm Password",
        registerFormButton: "Register",
        registerFormLinkToLogin: "Already have an account?",
        registerFormLinkLoginNow: "Login Now",
        registerErrorEmailExists: "This email is already registered. Please login or use a different email.",
        registerSuccess: "Registration successful! You are now logged in.",

        // Delete Listing
        deleteListing: "Delete Listing",
        deleteConfirmationJob: "Are you sure you want to delete this job listing? This action cannot be undone.",
        deleteConfirmationHome: "Are you sure you want to delete this home listing? This action cannot be undone.",
        deleteSuccess: "Listing deleted successfully.",

        // Option Labels (from types.ts enums and constants.ts)
        'jobType.any': 'Any Type',
        'jobType.fullTime': 'Full-time',
        'jobType.partTime': 'Part-time',
        'jobType.contract': 'Contract',
        'jobType.temporary': 'Temporary',

        'jobCategory.any': 'Any Category',
        'jobCategory.domesticHelp': 'Domestic Help',
        'jobCategory.driver': 'Driver',
        'jobCategory.cook': 'Cook',
        'jobCategory.securityGuard': 'Security Guard',
        'jobCategory.plumber': 'Plumber',
        'jobCategory.electrician': 'Electrician',
        'jobCategory.carpenter': 'Carpenter',
        'jobCategory.tutor': 'Tutor',
        'jobCategory.shopAssistant': 'Shop Assistant',
        'jobCategory.delivery': 'Delivery Rider',
        'jobCategory.factoryWorker': 'Factory Worker',
        'jobCategory.cleaningStaff': 'Cleaning Staff',
        'jobCategory.other': 'Other',

        'propertyType.any': 'Any Type',
        'propertyType.apartment': 'Apartment',
        'propertyType.independentHouse': 'Independent House/Villa',
        'propertyType.room': 'Room',

        'foodPreference.any': 'Any Preference',
        'foodPreference.vegetarianOnly': 'Vegetarian Only',
        'foodPreference.nonVegAllowed': 'Non-Vegetarian Allowed',

        'communityPreference.any': 'Any Preference',
        'communityPreference.openToAll': 'Open to All',
        'communityPreference.specificPreferencesDiscussed': 'Specific Preferences (Discuss with owner)',

        'bedrooms.any': 'Any Bedrooms',
        'bedrooms.studio': 'Studio / Room (0)',
        'bedrooms.0': 'Studio / Room (0)',
        'bedrooms.1': '1 BHK',
        'bedrooms.2': '2 BHK',
        'bedrooms.3': '3 BHK',
        'bedrooms.4+': '4+ BHK',

        'bedrooms.select.0': 'Studio / Room',
        'bedrooms.select.1': '1 Bedroom',
        'bedrooms.select.2': '2 Bedrooms',
        'bedrooms.select.3': '3 Bedrooms',
        'bedrooms.select.4': '4 Bedrooms',
        'bedrooms.select.5': '5+ Bedrooms',
    },
    hi: {
        // App General
        appName: "वर्कनेस्ट",
        languageTooltip: "भाषा",
        languageEn: "English",
        languageHi: "हिन्दी",
        languageTe: "తెలుగు",

        // Navbar
        navFindJobs: "नौकरियाँ खोजें",
        navFindHomes: "घर खोजें",
        navPostNew: "नया पोस्ट करें",
        navPostJob: "नौकरी पोस्ट करें",
        navPostHome: "घर पोस्ट करें",
        logoPlaceholder: "लोगो",
        navLogin: "लॉग इन करें",
        navRegister: "रजिस्टर करें",
        navLogout: "लॉग आउट करें",
        navWelcome: "स्वागत है",

        // Footer
        footerRights: "सर्वाधिकार सुरक्षित।",
        footerTagline: "समुदायों को जोड़ते हुए, एक नौकरी और एक घर एक समय में।",

        // Landing Page
        'landingWelcome.prefix': "",
        'landingWelcome.suffix': " में आपका स्वागत है",
        landingSubtitle: "भारत भर में अनौपचारिक नौकरियाँ और किराये के घर खोजने के लिए आपका विश्वसनीय मंच। सरल, सुलभ और आपके लिए बनाया गया।",
        landingFindJobTitle: "नौकरी खोजें",
        landingFindJobDesc: "विभिन्न क्षेत्रों में स्थानीय नौकरी के अवसर देखें। आज ही अपनी खोज शुरू करें!",
        landingFindHomeTitle: "घर खोजें",
        landingFindHomeDesc: "अपनी ज़रूरतों के अनुरूप किराये के घर खोजें। अपना आदर्श घर पाएँ!",
        landingPostListingPrompt: "नियोक्ताओं और मालिकों के लिए:",
        landingPostJobTitle: "नौकरी पोस्ट करें",
        landingPostJobDesc: "अपनी नौकरी की रिक्ति समुदाय के साथ साझा करें।",
        landingPostHomeTitle: "घर पोस्ट करें",
        landingPostHomeDesc: "किराए के लिए अपनी संपत्ति सूचीबद्ध करें और उपयुक्त किरायेदार खोजें।",

        // Job Search Page
        jobSearchPageTitle: "अपनी अगली नौकरी खोजें",
        jobSearchNoResults: "आपके मानदंडों से मेल खाने वाली कोई नौकरी नहीं मिली। अपने फ़िल्टर बदलने की कोशिश करें।",
        jobCardPosted: "पोस्ट किया गया",
        jobCardViewDetails: "विवरण देखें",
        jobCardContactMessage: "{{title}} के लिए संपर्क विवरण",
        jobCardLoginPrompt: "संपर्क विवरण देखने के लिए कृपया लॉग इन करें।",

        // Home Search Page
        homeSearchPageTitle: "अपना आदर्श घर खोजें",
        homeSearchNoResults: "आपके मानदंडों से मेल खाने वाला कोई घर नहीं मिला। अपने फ़िल्टर बदलने की कोशिश करें।",
        homeCardPosted: "पोस्ट किया गया",
        homeCardViewDetails: "विवरण देखें",
        homeCardContactMessage: "{{title}} के लिए संपर्क विवरण",
        homeCardRentSuffix: "/ महीना",
        homeCardBedroomsStudio: "स्टूडियो",
        homeCardBedroomsBHK: "{{count}} बीएचके",
        homeCardFoodPrefix: "भोजन",
        homeCardCommunityPrefix: "समुदाय",
        homeCardLoginPrompt: "संपर्क विवरण देखने के लिए कृपया लॉग इन करें।",

        // Details Pages
        detailsNotFoundJob: "नौकरी नहीं मिली",
        detailsNotFoundHome: "घर नहीं मिला",
        detailsNotFoundMessage: "आप जिस लिस्टिंग की तलाश कर रहे हैं वह मौजूद नहीं है या हटा दी गई है।",
        backToSearch: "खोज परिणामों पर वापस जाएं",
        keyInfo: "मुख्य जानकारी",
        fullDescription: "पूरा विवरण",
        contactEmployer: "नियोक्ता से संपर्क करें",
        contactOwner: "मालिक से संपर्क करें",
        loginToViewContact: "संपर्क विवरण देखने के लिए लॉग इन करें",
        loginButton: "देखने के लिए लॉग इन करें",

        // Filters General
        filterKeywordLabel: "कीवर्ड",
        filterLocationLabel: "स्थान",
        filterKeywordPlaceholderJobs: "उदा. रसोइया, ड्राइवर",
        filterKeywordPlaceholderHomes: "उदा. बैंगलोर, 2बीएचके",
        filterLocationPlaceholder: "उदा. मुंबई, दिल्ली",

        // Job Filters
        filterJobTypeLabel: "नौकरी का प्रकार",
        filterJobCategoryLabel: "नौकरी की श्रेणी",

        // Home Filters
        filterPropertyTypeLabel: "संपत्ति का प्रकार",
        filterBedroomsLabel: "बेडरूम",
        filterRentMinLabel: "न्यूनतम किराया (₹)",
        filterRentMaxLabel: "अधिकतम किराया (₹)",
        filterRentMinPlaceholder: "न्यूनतम",
        filterRentMaxPlaceholder: "अधिकतम",
        filterFoodPreferenceLabel: "भोजन वरीयता",
        filterCommunityPreferenceLabel: "समुदाय वरीयता",

        // Post Listing Pages
        postJobPageTitle: "एक नई नौकरी की लिस्टिंग पोस्ट करें",
        postHomePageTitle: "एक नए घर की लिस्टिंग पोस्ट करें",

        formLabelTitle: "शीर्षक",
        formLabelEmployer: "नियोक्ता का नाम",
        formLabelLocation: "स्थान (उदा. शहर, राज्य)",
        formLabelJobType: "नौकरी का प्रकार",
        formLabelJobCategory: "नौकरी की श्रेणी",
        formLabelDescription: "विवरण",
        formLabelSalary: "वेतन (उदा. ₹15,000/माह, बातचीत योग्य)",
        formLabelContact: "संपर्क जानकारी (फोन/ईमेल)",
        formButtonPostJob: "नौकरी पोस्ट करें",
        formSuccessJobPosted: "नौकरी सफलतापूर्वक पोस्ट हो गई!",

        formLabelAddress: "पूरा पता",
        formLabelRent: "मासिक किराया (₹)",
        formLabelPropertyType: "संपत्ति का प्रकार",
        formLabelBedrooms: "बेडरूम की संख्या",
        formLabelBathrooms: "बाथरूम की संख्या",
        formLabelAreaSqFt: "क्षेत्र (वर्ग फुट) (वैकल्पिक)",
        formLabelFoodPreference: "भोजन वरीयता",
        formLabelCommunityPreference: "समुदाय वरीयता (वैकल्पिक)",
        formLabelImages: "छवियाँ अपलोड करें (न्यूनतम 5 आवश्यक)",
        formImageUploadPrompt: "फ़ाइलें अपलोड करने के लिए क्लिक करें",
        formImageTypeHint: "PNG, JPG प्रत्येक 5MB तक",
        formButtonPostHome: "घर पोस्ट करें",
        formSuccessHomePosted: "घर सफलतापूर्वक पोस्ट हो गया!",

        formPlaceholderTitleJob: "उदा. अनुभवी रसोइया चाहिए",
        formPlaceholderTitleHome: "उदा. कोरामंगला में विशाल 2 बीएचके",
        formPlaceholderEmployer: "उदा. शर्मा परिवार, गुप्ता एंटरप्राइजेज",
        formPlaceholderLocation: "उदा. कोरामंगला, बैंगलोर",
        formPlaceholderSalary: "उदा. 15000, बातचीत योग्य",
        formPlaceholderContact: "उदा. 98XXXXXX00, name@example.com",
        formPlaceholderDescriptionJob: "नौकरी, जिम्मेदारियों, आवश्यकताओं आदि के बारे में विवरण दें।",
        formPlaceholderDescriptionHome: "संपत्ति, सुविधाओं, पड़ोस, नियमों आदि का वर्णन करें।",
        formPlaceholderAddress: "उदा. 123 मेन स्ट्रीट, कोरामंगला, बैंगलोर",
        formPlaceholderRent: "उदा. 25000",
        formPlaceholderBedrooms: "उदा. 2",
        formPlaceholderBathrooms: "उदा. 2",
        formPlaceholderAreaSqFt: "उदा. 1100",

        formErrorRequired: "यह फ़ील्ड ज़रूरी है।",
        formErrorNumber: "कृपया एक मान्य संख्या दर्ज करें।",
        formErrorPositiveNumber: "कृपया एक सकारात्मक संख्या दर्ज करें।",
        formErrorEmail: "कृपया एक मान्य ईमेल पता दर्ज करें।",
        formErrorPasswordLength: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
        formErrorPasswordMatch: "पासवर्ड मेल नहीं खाते।",
        formErrorMinImages: "कृपया कम से कम 5 छवियाँ अपलोड करें।",

        // Auth Pages (Login, Register)
        loginPageTitle: "वर्कनेस्ट में लॉग इन करें",
        loginFormLabelEmail: "ईमेल पता",
        loginFormLabelPassword: "पासवर्ड",
        loginFormButton: "लॉग इन करें",
        loginFormLinkToRegister: "खाता नहीं है?",
        loginFormLinkRegisterNow: "अभी रजिस्टर करें",
        loginErrorInvalid: "अमान्य ईमेल या पासवर्ड। कृपया दोबारा कोशिश करें।",
        loginSuccess: "सफलतापूर्वक लॉग इन हो गया! रीडायरेक्ट किया जा रहा है...",

        registerPageTitle: "अपना वर्कनेस्ट खाता बनाएँ",
        registerFormLabelEmail: "ईमेल पता",
        registerFormLabelPassword: "पासवर्ड",
        registerFormLabelConfirmPassword: "पासवर्ड की पुष्टि करें",
        registerFormButton: "रजिस्टर करें",
        registerFormLinkToLogin: "पहले से ही एक खाता है?",
        registerFormLinkLoginNow: "अभी लॉग इन करें",
        registerErrorEmailExists: "यह ईमेल पहले से पंजीकृत है। कृपया लॉग इन करें या किसी दूसरे ईमेल का उपयोग करें।",
        registerSuccess: "पंजीकरण सफल हुआ! अब आप लॉग इन हैं।",

        // Delete Listing
        deleteListing: "लिस्टिंग हटाएं",
        deleteConfirmationJob: "क्या आप वाकई इस नौकरी की लिस्टिंग को हटाना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।",
        deleteConfirmationHome: "क्या आप वाकई इस घर की लिस्टिंग को हटाना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।",
        deleteSuccess: "लिस्टिंग सफलतापूर्वक हटा दी गई।",

        // Option Labels
        'jobType.any': 'किसी भी प्रकार का',
        'jobType.fullTime': 'पूर्णकालिक',
        'jobType.partTime': 'अंशकालिक',
        'jobType.contract': 'अनुबंध',
        'jobType.temporary': 'अस्थायी',

        'jobCategory.any': 'कोई भी श्रेणी',
        'jobCategory.domesticHelp': 'घरेलू मदद',
        'jobCategory.driver': 'ड्राइवर',
        'jobCategory.cook': 'रसोइया',
        'jobCategory.securityGuard': 'सुरक्षा गार्ड',
        'jobCategory.plumber': 'प्लंबर',
        'jobCategory.electrician': 'इलेक्ट्रीशियन',
        'jobCategory.carpenter': 'बढ़ई',
        'jobCategory.tutor': 'ट्यूटर',
        'jobCategory.shopAssistant': 'दुकान सहायक',
        'jobCategory.delivery': 'डिलीवरी पार्टनर',
        'jobCategory.factoryWorker': 'फ़ैक्टरी वर्कर',
        'jobCategory.cleaningStaff': 'सफाई कर्मचारी',
        'jobCategory.other': 'अन्य',

        'propertyType.any': 'किसी भी प्रकार का',
        'propertyType.apartment': 'अपार्टमेंट',
        'propertyType.independentHouse': 'स्वतंत्र मकान/विला',
        'propertyType.room': 'कमरा',

        'foodPreference.any': 'कोई भी वरीयता',
        'foodPreference.vegetarianOnly': 'केवल शाकाहारी',
        'foodPreference.nonVegAllowed': 'मांसाहारी की अनुमति है',

        'communityPreference.any': 'कोई भी वरीयता',
        'communityPreference.openToAll': 'सभी के लिए खुला',
        'communityPreference.specificPreferencesDiscussed': 'विशेष प्राथमिकताएं (मालिक से चर्चा करें)',

        'bedrooms.any': 'कोई भी बेडरूम',
        'bedrooms.studio': 'स्टूडियो / कमरा (0)',
        'bedrooms.0': 'स्टूडियो / कमरा (0)',
        'bedrooms.1': '1 बीएचके',
        'bedrooms.2': '2 बीएचके',
        'bedrooms.3': '3 बीएचके',
        'bedrooms.4+': '4+ बीएचके',

        'bedrooms.select.0': 'स्टूडियो / कमरा',
        'bedrooms.select.1': '1 बेडरूम',
        'bedrooms.select.2': '2 बेडरूम',
        'bedrooms.select.3': '3 बेडरूम',
        'bedrooms.select.4': '4 बेडरूम',
        'bedrooms.select.5': '5+ बेडरूम',
    },
    te: {
        // App General
        appName: "వర్క్‌నెస్ట్",
        languageTooltip: "భాష",
        languageEn: "English",
        languageHi: "हिन्दी",
        languageTe: "తెలుగు",

        // Navbar
        navFindJobs: "ఉద్యోగాలు వెతకండి",
        navFindHomes: "ఇళ్లు వెతకండి",
        navPostNew: "కొత్తగా పోస్ట్ చేయండి",
        navPostJob: "ఉద్యోగాన్ని పోస్ట్ చేయండి",
        navPostHome: "ఇంటిని పోస్ట్ చేయండి",
        logoPlaceholder: "లోగో",
        navLogin: "లాగిన్",
        navRegister: "నమోదు చేసుకోండి",
        navLogout: "లాగ్ అవుట్",
        navWelcome: "స్వాగతం",

        // Footer
        footerRights: "అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.",
        footerTagline: "ఒకే చోట ఉద్యోగాలు మరియు ఇళ్లను కలుపుతూ, సంఘాలను నిర్మిస్తున్నాము.",

        // Landing Page
        'landingWelcome.prefix': "",
        'landingWelcome.suffix': "కు స్వాగతం",
        landingSubtitle: "భారతదేశ వ్యాప్తంగా ఉద్యోగాలు మరియు అద్దె ఇళ్లను కనుగొనడానికి మీ నమ్మకమైన వేదిక. సులభమైనది, అందరికీ అందుబాటులో ఉండేది మరియు మీ కోసం రూపొందించబడింది.",
        landingFindJobTitle: "ఉద్యోగం వెతకండి",
        landingFindJobDesc: "వివిధ రంగాలలో స్థానిక ఉద్యోగ అవకాశాలను చూడండి. ఈరోజే మీ శోధన ప్రారంభించండి!",
        landingFindHomeTitle: "ఇల్లు వెతకండి",
        landingFindHomeDesc: "మీ అవసరాలకు సరిపోయే అద్దె ఇళ్లను కనుగొనండి. మీకు నచ్చిన ఇంటిని పొందండి!",
        landingPostListingPrompt: "యజమానులు & ఇంటి యజమానుల కోసం:",
        landingPostJobTitle: "ఉద్యోగాన్ని పోస్ట్ చేయండి",
        landingPostJobDesc: "మీ ఉద్యోగ ఖాళీని సంఘంతో పంచుకోండి.",
        landingPostHomeTitle: "ఇంటిని పోస్ట్ చేయండి",
        landingPostHomeDesc: "మీ ఆస్తిని అద్దెకు ఇవ్వండి మరియు తగిన అద్దెదారులను కనుగొనండి.",

        // Job Search Page
        jobSearchPageTitle: "మీ తదుపరి ఉద్యోగాన్ని కనుగొనండి",
        jobSearchNoResults: "మీ ప్రమాణాలకు సరిపోయే ఉద్యోగాలు ఏవీ కనుగొనబడలేదు. మీ ఫిల్టర్‌లను మార్చి ప్రయత్నించండి.",
        jobCardPosted: "పోస్ట్ చేయబడింది",
        jobCardViewDetails: "వివరాలు చూడండి",
        jobCardContactMessage: "{{title}} యొక్క సంప్రదింపు వివరాలు",
        jobCardLoginPrompt: "సంప్రదింపు వివరాలను చూడటానికి దయచేసి లాగిన్ చేయండి.",

        // Home Search Page
        homeSearchPageTitle: "మీకు నచ్చిన ఇంటిని కనుగొనండి",
        homeSearchNoResults: "మీ ప్రమాణాలకు సరిపోయే ఇళ్లు ఏవీ కనుగొనబడలేదు. మీ ఫిల్టర్‌లను మార్చి ప్రయత్నించండి.",
        homeCardPosted: "పోస్ట్ చేయబడింది",
        homeCardViewDetails: "వివరాలు చూడండి",
        homeCardContactMessage: "{{title}} యొక్క సంప్రదింపు వివరాలు",
        homeCardRentSuffix: "/ నెలకు",
        homeCardBedroomsStudio: "స్టూడియో / గది",
        homeCardBedroomsBHK: "{{count}} BHK",
        homeCardFoodPrefix: "ఆహారం",
        homeCardCommunityPrefix: "సంఘం",
        homeCardLoginPrompt: "సంప్రదింపు వివరాలను చూడటానికి దయచేసి లాగిన్ చేయండి.",

        // Details Pages
        detailsNotFoundJob: "ఉద్యోగం కనుగొనబడలేదు",
        detailsNotFoundHome: "ఇల్లు కనుగొనబడలేదు",
        detailsNotFoundMessage: "మీరు వెతుకుతున్న జాబితా ఉనికిలో లేదు లేదా తీసివేయబడింది.",
        backToSearch: "శోధన ఫలితాలకు తిరిగి వెళ్ళు",
        keyInfo: "ముఖ్య సమాచారం",
        fullDescription: "పూర్తి వివరణ",
        contactEmployer: "యజమానిని సంప్రదించండి",
        contactOwner: "యజమానిని సంప్రదించండి",
        loginToViewContact: "సంప్రదింపు వివరాలు చూడటానికి లాగిన్ చేయండి",
        loginButton: "చూడటానికి లాగిన్ చేయండి",

        // Filters General
        filterKeywordLabel: "కీవర్డ్",
        filterLocationLabel: "ప్రాంతం",
        filterKeywordPlaceholderJobs: "ఉదా. వంటవాడు, డ్రైవర్",
        filterKeywordPlaceholderHomes: "ఉదా. బెంగళూరు, 2 BHK",
        filterLocationPlaceholder: "ఉదా. ముంబై, ఢిల్లీ",

        // Job Filters
        filterJobTypeLabel: "ఉద్యోగ రకం",
        filterJobCategoryLabel: "ఉద్యోగ వర్గం",

        // Home Filters
        filterPropertyTypeLabel: "ఆస్తి రకం",
        filterBedroomsLabel: "పడకగదులు",
        filterRentMinLabel: "కనీస అద్దె (₹)",
        filterRentMaxLabel: "గరిష్ట అద్దె (₹)",
        filterRentMinPlaceholder: "కనీస",
        filterRentMaxPlaceholder: "గరిష్ట",
        filterFoodPreferenceLabel: "ఆహార ప్రాధాన్యత",
        filterCommunityPreferenceLabel: "సంఘం ప్రాధాన్యత",

        // Post Listing Pages
        postJobPageTitle: "కొత్త ఉద్యోగ వివరాలను పోస్ట్ చేయండి",
        postHomePageTitle: "కొత్త ఇంటి వివరాలను పోస్ట్ చేయండి",

        formLabelTitle: "శీర్షిక",
        formLabelEmployer: "యజమాని పేరు",
        formLabelLocation: "ప్రాంతం (ఉదా. నగరం, రాష్ట్రం)",
        formLabelJobType: "ఉద్యోగ రకం",
        formLabelJobCategory: "ఉద్యోగ వర్గం",
        formLabelDescription: "వివరణ",
        formLabelSalary: "జీతం (ఉదా. ₹15,000/నెల, చర్చించవచ్చు)",
        formLabelContact: "సంప్రదింపు సమాచారం (ఫోన్/ఇమెయిల్)",
        formButtonPostJob: "ఉద్యోగాన్ని పోస్ట్ చేయండి",
        formSuccessJobPosted: "ఉద్యోగం విజయవంతంగా పోస్ట్ చేయబడింది!",

        formLabelAddress: "పూర్తి చిరునామా",
        formLabelRent: "నెలవారీ అద్దె (₹)",
        formLabelPropertyType: "ఆస్తి రకం",
        formLabelBedrooms: "పడకగదుల సంఖ్య",
        formLabelBathrooms: "స్నానపుగదుల సంఖ్య",
        formLabelAreaSqFt: "విస్తీర్ణం (చ. అ.) (ఐచ్ఛికం)",
        formLabelFoodPreference: "ఆహార ప్రాధాన్యత",
        formLabelCommunityPreference: "సంఘం ప్రాధాన్యత (ఐచ్ఛికం)",
        formLabelImages: "చిత్రాలను అప్‌లోడ్ చేయండి (కనీసం 5 అవసరం)",
        formImageUploadPrompt: "ఫైల్‌లను అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
        formImageTypeHint: "PNG, JPG ఒక్కొక్కటి 5MB వరకు",
        formButtonPostHome: "ఇంటిని పోస్ట్ చేయండి",
        formSuccessHomePosted: "ఇల్లు విజయవంతంగా పోస్ట్ చేయబడింది!",

        formPlaceholderTitleJob: "ఉదా. అనుభవజ్ఞుడైన వంటవాడు కావాలి",
        formPlaceholderTitleHome: "ఉదా. కోరమంగళలో విశాలమైన 2 BHK",
        formPlaceholderEmployer: "ఉదా. శర్మ కుటుంబం, గుప్తా ఎంటర్‌ప్రైజెస్",
        formPlaceholderLocation: "ఉదా. కోరమంగళ, బెంగళూరు",
        formPlaceholderSalary: "ఉదా. 15000, చర్చించవచ్చు",
        formPlaceholderContact: "ఉదా. 98XXXXXX00, name@example.com",
        formPlaceholderDescriptionJob: "ఉద్యోగం, బాధ్యతలు, అవసరాలు మొదలైన వాటి గురించి వివరాలు అందించండి.",
        formPlaceholderDescriptionHome: "ఆస్తి, సౌకర్యాలు, పరిసరాలు, నియమాలు మొదలైన వాటిని వివరించండి.",
        formPlaceholderAddress: "ఉదా. 123 మెయిన్ స్ట్రీట్, కోరమంగళ, బెంగళూరు",
        formPlaceholderRent: "ఉదా. 25000",
        formPlaceholderBedrooms: "ఉదా. 2",
        formPlaceholderBathrooms: "ఉదా. 2",
        formPlaceholderAreaSqFt: "ఉదా. 1100",

        formErrorRequired: "ఈ ఫీల్డ్ తప్పనిసరి.",
        formErrorNumber: "దయచేసి సరైన సంఖ్యను నమోదు చేయండి.",
        formErrorPositiveNumber: "దయచేసి ధన సంఖ్యను నమోదు చేయండి.",
        formErrorEmail: "దయచేసి సరైన ఇమెయిల్ చిరునామాను నమోదు చేయండి.",
        formErrorPasswordLength: "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.",
        formErrorPasswordMatch: "పాస్‌వర్డ్‌లు సరిపోలడం లేదు.",
        formErrorMinImages: "దయచేసి కనీసం 5 చిత్రాలను అప్‌లోడ్ చేయండి.",

        // Auth Pages (Login, Register)
        loginPageTitle: "వర్క్‌నెస్ట్‌కి లాగిన్ అవ్వండి",
        loginFormLabelEmail: "ఇమెయిల్ చిరునామా",
        loginFormLabelPassword: "పాస్వర్డ్",
        loginFormButton: "లాగిన్",
        loginFormLinkToRegister: "ఖాతా లేదా?",
        loginFormLinkRegisterNow: "ఇప్పుడే నమోదు చేసుకోండి",
        loginErrorInvalid: "తప్పు ఇమెయిల్ లేదా పాస్‌వర్డ్. దయచేసి మళ్లీ ప్రయత్నించండి.",
        loginSuccess: "విజయవంతంగా లాగిన్ అయ్యారు! దారి మళ్లించబడుతోంది...",

        registerPageTitle: "మీ వర్క్‌నెస్ట్ ఖాతాను సృష్టించండి",
        registerFormLabelEmail: "ఇమెయిల్ చిరునామా",
        registerFormLabelPassword: "పాస్వర్డ్",
        registerFormLabelConfirmPassword: "పాస్వర్డ్ను నిర్ధారించండి",
        registerFormButton: "నమోదు చేసుకోండి",
        registerFormLinkToLogin: "ఇప్పటికే ఖాతా ఉందా?",
        registerFormLinkLoginNow: "ఇప్పుడే లాగిన్ అవ్వండి",
        registerErrorEmailExists: "ఈ ఇమెయిల్ ఇప్పటికే నమోదు చేయబడింది. దయచేసి లాగిన్ చేయండి లేదా వేరొక ఇమెయిల్‌ను ఉపయోగించండి.",
        registerSuccess: "నమోదు విజయవంతమైంది! మీరు ఇప్పుడు లాగిన్ అయ్యారు.",

        // Delete Listing
        deleteListing: "జాబితాను తొలగించండి",
        deleteConfirmationJob: "మీరు ఈ ఉద్యోగ జాబితాను తొలగించాలనుకుంటున్నారని ఖచ్చితంగా అనుకుంటున్నారా? ఈ చర్యను రద్దు చేయడం సాధ్యం కాదు.",
        deleteConfirmationHome: "మీరు ఈ ఇంటి జాబితాను తొలగించాలనుకుంటున్నారని ఖచ్చితంగా అనుకుంటున్నారా? ఈ చర్యను రద్దు చేయడం సాధ్యం కాదు.",
        deleteSuccess: "జాబితా విజయవంతంగా తొలగించబడింది.",

        // Option Labels
        'jobType.any': 'ఏ రకమైనా',
        'jobType.fullTime': 'పూర్తి సమయం',
        'jobType.partTime': 'పార్ట్ టైమ్',
        'jobType.contract': 'కాంట్రాక్ట్',
        'jobType.temporary': 'తాత్కాలిక',

        'jobCategory.any': 'ఏ వర్గమైనా',
        'jobCategory.domesticHelp': 'ఇంటి పని',
        'jobCategory.driver': 'డ్రైవర్',
        'jobCategory.cook': 'వంట మనిషి',
        'jobCategory.securityGuard': 'సెక్యూరిటీ గార్డు',
        'jobCategory.plumber': 'ప్లంబర్',
        'jobCategory.electrician': 'ఎలక్ట్రీషియన్',
        'jobCategory.carpenter': 'వడ్రంగి',
        'jobCategory.tutor': 'ట్యూటర్',
        'jobCategory.shopAssistant': 'షాప్ అసిస్టెంట్',
        'jobCategory.delivery': 'డెలివరీ పార్ట్‌నర్',
        'jobCategory.factoryWorker': 'ఫ్యాక్టరీ వర్కర్',
        'jobCategory.cleaningStaff': 'క్లీనింగ్ స్టాఫ్',
        'jobCategory.other': 'ఇతరులు',

        'propertyType.any': 'ఏ రకమైనా',
        'propertyType.apartment': 'అపార్ట్‌మెంట్',
        'propertyType.independentHouse': 'స్వతంత్ర ఇల్లు/విల్లా',
        'propertyType.room': 'గది',

        'foodPreference.any': 'ఏ ప్రాధాన్యత అయినా',
        'foodPreference.vegetarianOnly': 'శాకాహారులకు మాత్రమే',
        'foodPreference.nonVegAllowed': 'మాంసాహారం అనుమతించబడుతుంది',

        'communityPreference.any': 'ఏ ప్రాధాన్యత అయినా',
        'communityPreference.openToAll': 'అందరికీ ప్రవేశం',
        'communityPreference.specificPreferencesDiscussed': 'ప్రత్యేక ప్రాధాన్యతలు (యజమానితో చర్చించండి)',

        'bedrooms.any': 'పడకగదులు ఏవైనా',
        'bedrooms.studio': 'స్టూడియో / గది (0)',
        'bedrooms.0': 'స్టూడియో / గది (0)',
        'bedrooms.1': '1 BHK',
        'bedrooms.2': '2 BHK',
        'bedrooms.3': '3 BHK',
        'bedrooms.4+': '4+ BHK',

        'bedrooms.select.0': 'స్టూడియో / గది',
        'bedrooms.select.1': '1 పడకగది',
        'bedrooms.select.2': '2 పడకగదులు',
        'bedrooms.select.3': '3 పడకగదులు',
        'bedrooms.select.4': '4 పడకగదులు',
        'bedrooms.select.5': '5+ పడకగదులు',
    },
};