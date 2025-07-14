

import { Job, Home, JobType, JobCategory, PropertyType, FoodPreference, CommunityPreference, OptionType } from './types';

export const APP_NAME_KEY = "appName"; // Key for translating app name

export const JOB_TYPE_OPTIONS: OptionType[] = [
  { value: JobType.ANY, labelKey: 'jobType.any' },
  { value: JobType.FULL_TIME, labelKey: 'jobType.fullTime' },
  { value: JobType.PART_TIME, labelKey: 'jobType.partTime' },
  { value: JobType.CONTRACT, labelKey: 'jobType.contract' },
  { value: JobType.TEMPORARY, labelKey: 'jobType.temporary' },
];

export const JOB_CATEGORY_OPTIONS: OptionType[] = [
  { value: JobCategory.ANY, labelKey: 'jobCategory.any' },
  { value: JobCategory.DOMESTIC_HELP, labelKey: 'jobCategory.domesticHelp' },
  { value: JobCategory.DRIVER, labelKey: 'jobCategory.driver' },
  { value: JobCategory.COOK, labelKey: 'jobCategory.cook' },
  { value: JobCategory.SECURITY_GUARD, labelKey: 'jobCategory.securityGuard' },
  { value: JobCategory.PLUMBER, labelKey: 'jobCategory.plumber' },
  { value: JobCategory.ELECTRICIAN, labelKey: 'jobCategory.electrician' },
  { value: JobCategory.CARPENTER, labelKey: 'jobCategory.carpenter' },
  { value: JobCategory.TUTOR, labelKey: 'jobCategory.tutor' },
  { value: JobCategory.SHOP_ASSISTANT, labelKey: 'jobCategory.shopAssistant' },
  { value: JobCategory.DELIVERY, labelKey: 'jobCategory.delivery' },
  { value: JobCategory.FACTORY_WORKER, labelKey: 'jobCategory.factoryWorker' },
  { value: JobCategory.CLEANING_STAFF, labelKey: 'jobCategory.cleaningStaff' },
  { value: JobCategory.OTHER, labelKey: 'jobCategory.other' },
];

export const PROPERTY_TYPE_OPTIONS: OptionType[] = [
  { value: PropertyType.ANY, labelKey: 'propertyType.any' },
  { value: PropertyType.APARTMENT, labelKey: 'propertyType.apartment' },
  { value: PropertyType.INDEPENDENT_HOUSE, labelKey: 'propertyType.independentHouse' },
  { value: PropertyType.ROOM, labelKey: 'propertyType.room' },
];

export const FOOD_PREFERENCE_OPTIONS: OptionType[] = [
  { value: FoodPreference.ANY, labelKey: 'foodPreference.any' },
  { value: FoodPreference.VEGETARIAN_ONLY, labelKey: 'foodPreference.vegetarianOnly' },
  { value: FoodPreference.NON_VEG_ALLOWED, labelKey: 'foodPreference.nonVegAllowed' },
];

export const COMMUNITY_PREFERENCE_OPTIONS: OptionType[] = [
  { value: CommunityPreference.ANY, labelKey: 'communityPreference.any' },
  { value: CommunityPreference.OPEN_TO_ALL, labelKey: 'communityPreference.openToAll' },
  { value: CommunityPreference.SPECIFIC_PREFERENCES_DISCUSSED, labelKey: 'communityPreference.specificPreferencesDiscussed' },
];

// For search filters
export const BEDROOM_OPTIONS: OptionType[] = [
  { value: "any", labelKey: "bedrooms.any" },
  { value: "0", labelKey: "bedrooms.0" },
  { value: "1", labelKey: "bedrooms.1" },
  { value: "2", labelKey: "bedrooms.2" },
  { value: "3", labelKey: "bedrooms.3" },
  { value: "4+", labelKey: "bedrooms.4+" },
];

// Options for Posting Forms (excluding "Any")
export const POST_JOB_TYPE_OPTIONS: OptionType[] = JOB_TYPE_OPTIONS.filter(opt => opt.value !== JobType.ANY);
export const POST_JOB_CATEGORY_OPTIONS: OptionType[] = JOB_CATEGORY_OPTIONS.filter(opt => opt.value !== JobCategory.ANY);
export const POST_PROPERTY_TYPE_OPTIONS: OptionType[] = PROPERTY_TYPE_OPTIONS.filter(opt => opt.value !== PropertyType.ANY);
export const POST_FOOD_PREFERENCE_OPTIONS: OptionType[] = FOOD_PREFERENCE_OPTIONS.filter(opt => opt.value !== FoodPreference.ANY);
export const POST_COMMUNITY_PREFERENCE_OPTIONS: OptionType[] = COMMUNITY_PREFERENCE_OPTIONS.filter(opt => opt.value !== CommunityPreference.ANY);

export const POST_BEDROOM_OPTIONS: OptionType[] = [
  { value: "0", labelKey: "bedrooms.select.0" }, // Studio / Room
  { value: "1", labelKey: "bedrooms.select.1" }, // 1 Bedroom
  { value: "2", labelKey: "bedrooms.select.2" }, // 2 Bedrooms
  { value: "3", labelKey: "bedrooms.select.3" }, // 3 Bedrooms
  { value: "4", labelKey: "bedrooms.select.4" }, // 4 Bedrooms
  { value: "5", labelKey: "bedrooms.select.5" }, // 5+ Bedrooms (treat 5+ as 5 for simplicity in data model, or adjust model)
];

export const POST_BATHROOM_OPTIONS: OptionType[] = [
  { value: "1", labelKey: "1" },
  { value: "2", labelKey: "2" },
  { value: "3", labelKey: "3" },
  { value: "4", labelKey: "4+" },
];


export const MOCK_JOBS: Job[] = [
  {
    id: 'job1',
    title: 'Experienced Cook Needed',
    employer: 'Sharma Family',
    location: 'Mumbai, Maharashtra',
    type: JobType.FULL_TIME,
    category: JobCategory.COOK,
    description: 'Looking for an experienced cook for a family of 4. Must know North Indian and basic continental dishes. Hygienic and punctual.',
    salary: '₹18,000 - ₹22,000 per month',
    contact: 'Contact: 98XXXXXX01',
    postedDate: '2024-07-20',
  },
  {
    id: 'job2',
    title: 'Part-time Driver Required',
    employer: 'Gupta Enterprises',
    location: 'Delhi, NCR',
    type: JobType.PART_TIME,
    category: JobCategory.DRIVER,
    description: 'Need a driver for evening hours (5 PM - 9 PM) for local errands. Must have valid license and good knowledge of Delhi roads.',
    salary: '₹10,000 per month',
    contact: 'Contact: 99XXXXXX02',
    postedDate: '2024-07-18',
  },
  {
    id: 'job3',
    title: 'Shop Assistant for Retail Store',
    employer: 'Modern Mart',
    location: 'Bangalore, Karnataka',
    type: JobType.FULL_TIME,
    category: JobCategory.SHOP_ASSISTANT,
    description: 'Retail store assistant for customer service, billing, and stock management. Basic computer skills required. Friendly attitude.',
    salary: '₹15,000 per month + Incentives',
    contact: 'Email: careers@modernmart.com',
    postedDate: '2024-07-22',
  },
  {
    id: 'job4',
    title: 'Plumber for Maintenance Work',
    employer: 'Self-Employed (Projects)',
    location: 'Chennai, Tamil Nadu',
    type: JobType.CONTRACT,
    category: JobCategory.PLUMBER,
    description: 'Seeking contract-based plumbing projects for residential and commercial properties. 5+ years experience.',
    salary: 'Project-based',
    contact: 'Call: 97XXXXXX03',
    postedDate: '2024-07-15',
  },
  {
    id: 'job5',
    title: 'Delivery Rider for Food App',
    employer: 'QuickEats Delivery',
    location: 'Pune, Maharashtra',
    type: JobType.FULL_TIME, 
    category: JobCategory.DELIVERY,
    description: 'Join our team of delivery riders. Flexible hours, good earnings. Must own a two-wheeler and smartphone.',
    salary: 'Up to ₹25,000 per month (incl. incentives)',
    contact: 'Apply via QuickEats App',
    postedDate: '2024-07-23',
  }
];

export const MOCK_HOMES: Home[] = [
  {
    id: 'home1',
    title: 'Spacious 2 BHK in Koramangala',
    address: 'Koramangala, Bangalore, Karnataka',
    rent: 25000,
    propertyType: PropertyType.APARTMENT,
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1100,
    description: 'Well-maintained 2 BHK apartment in a prime location. Close to markets and IT parks. Family preferred.',
    foodPreference: FoodPreference.ANY,
    communityPreference: CommunityPreference.OPEN_TO_ALL,
    contact: 'Owner: 98XXXXXX11',
    postedDate: '2024-07-21',
    imageUrls: [
        'https://picsum.photos/seed/home1a/800/600',
        'https://picsum.photos/seed/home1b/800/600',
        'https://picsum.photos/seed/home1c/800/600',
        'https://picsum.photos/seed/home1d/800/600',
        'https://picsum.photos/seed/home1e/800/600',
    ],
  },
  {
    id: 'home2',
    title: '1 RK Room for Rent - Vegetarian Only',
    address: 'Matunga, Mumbai, Maharashtra',
    rent: 15000,
    propertyType: PropertyType.ROOM,
    bedrooms: 1, 
    bathrooms: 1,
    description: 'Single room with attached kitchen and bathroom. Ideal for students or bachelors. Strictly vegetarian tenants.',
    foodPreference: FoodPreference.VEGETARIAN_ONLY,
    communityPreference: CommunityPreference.OPEN_TO_ALL,
    contact: 'Broker: 99XXXXXX12 (No brokerage for tenant)',
    postedDate: '2024-07-19',
    imageUrls: [
        'https://picsum.photos/seed/home2a/800/600',
        'https://picsum.photos/seed/home2b/800/600',
        'https://picsum.photos/seed/home2c/800/600',
        'https://picsum.photos/seed/home2d/800/600',
        'https://picsum.photos/seed/home2e/800/600',
    ],
  },
  {
    id: 'home3',
    title: 'Independent House near Technopark',
    address: 'Kazhakuttam, Trivandrum, Kerala',
    rent: 18000,
    propertyType: PropertyType.INDEPENDENT_HOUSE,
    bedrooms: 3,
    bathrooms: 2,
    areaSqFt: 1500,
    description: '3 BHK Independent house with car parking. Peaceful locality, suitable for families. Non-vegetarians welcome.',
    foodPreference: FoodPreference.NON_VEG_ALLOWED,
    communityPreference: CommunityPreference.OPEN_TO_ALL,
    contact: 'Owner: 97XXXXXX13',
    postedDate: '2024-07-22',
    imageUrls: [
        'https://picsum.photos/seed/home3a/800/600',
        'https://picsum.photos/seed/home3b/800/600',
        'https://picsum.photos/seed/home3c/800/600',
        'https://picsum.photos/seed/home3d/800/600',
        'https://picsum.photos/seed/home3e/800/600',
    ],
  },
  {
    id: 'home4',
    title: 'Cozy Studio Apartment',
    address: 'Sector 29, Gurgaon, Haryana',
    rent: 22000,
    propertyType: PropertyType.APARTMENT, 
    bedrooms: 0, 
    bathrooms: 1,
    areaSqFt: 500,
    description: 'Modern studio apartment with all amenities. Fully furnished. Close to metro station and offices.',
    foodPreference: FoodPreference.ANY,
    communityPreference: CommunityPreference.OPEN_TO_ALL,
    contact: 'Contact: info@urbanstay.com',
    postedDate: '2024-07-17',
    imageUrls: [
        'https://picsum.photos/seed/home4a/800/600',
        'https://picsum.photos/seed/home4b/800/600',
        'https://picsum.photos/seed/home4c/800/600',
        'https://picsum.photos/seed/home4d/800/600',
        'https://picsum.photos/seed/home4e/800/600',
    ],
  }
];