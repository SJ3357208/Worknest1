

export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  TEMPORARY = 'Temporary',
  ANY = 'Any Type'
}

export enum JobCategory {
  DOMESTIC_HELP = 'Domestic Help',
  DRIVER = 'Driver',
  COOK = 'Cook',
  SECURITY_GUARD = 'Security Guard',
  PLUMBER = 'Plumber',
  ELECTRICIAN = 'Electrician',
  CARPENTER = 'Carpenter',
  TUTOR = 'Tutor',
  SHOP_ASSISTANT = 'Shop Assistant',
  DELIVERY = 'Delivery Rider',
  FACTORY_WORKER = 'Factory Worker',
  CLEANING_STAFF = 'Cleaning Staff',
  OTHER = 'Other',
  ANY = 'Any Category'
}

export interface Job {
  id: string;
  title: string;
  employer: string;
  location: string;
  type: JobType;
  category: JobCategory;
  description: string;
  salary?: string; // e.g., "₹15,000 - ₹20,000 per month" or "Negotiable"
  contact: string; // e.g., phone number or email
  postedDate: string;
}

export enum PropertyType {
  APARTMENT = 'Apartment',
  INDEPENDENT_HOUSE = 'Independent House/Villa',
  ROOM = 'Room',
  ANY = 'Any Type'
}

export enum FoodPreference {
  VEGETARIAN_ONLY = 'Vegetarian Only',
  NON_VEG_ALLOWED = 'Non-Vegetarian Allowed',
  ANY = 'Any Preference'
}

export enum CommunityPreference {
  OPEN_TO_ALL = 'Open to All',
  SPECIFIC_PREFERENCES_DISCUSSED = 'Specific Preferences (Discuss with owner)',
  ANY = 'Any Preference'
}

export interface Home {
  id: string;
  title: string; // e.g., "2 BHK Apartment for Rent"
  address: string;
  rent: number; // Monthly rent in INR
  propertyType: PropertyType;
  bedrooms: number; // e.g., 1, 2, 3. Use 0 for room/studio.
  bathrooms: number;
  areaSqFt?: number;
  description: string;
  foodPreference: FoodPreference;
  communityPreference: CommunityPreference;
  contact: string;
  postedDate: string;
  imageUrls?: string[];
}

export interface JobFilters {
  keyword: string;
  location: string;
  jobType: JobType;
  jobCategory: JobCategory;
}

export interface HomeFilters {
  location: string;
  propertyType: PropertyType;
  bedrooms: string; // Using string for "Any" option
  rentMin: string;
  rentMax: string;
  foodPreference: FoodPreference;
  communityPreference: CommunityPreference;
}

export interface OptionType {
  value: string; // The actual value to be used in logic/filtering
  labelKey: string; // Key for translation
}

// User type for authentication
export interface User {
  email: string;
  // Add other user-specific fields here if needed in the future, e.g., name, id
}