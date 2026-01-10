export interface BiodataFormData {
  // Personal Details
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: 'male' | 'female' | '';
  height: string;
  complexion: string;
  maritalStatus: string;
  religion: string;
  caste: string;
  motherTongue: string;
  
  // Location
  city: string;
  state: string;
  country: string;
  
  // Education & Career
  education: string;
  occupation: string;
  companyName: string;
  annualIncome: string;
  
  // Family Details
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  familyStatus: string;
  
  // About & Preferences
  aboutMe: string;
  hobbies: string;
  partnerPreferences: string;
  
  // Contact
  contactLabel: string;
  
  // Photo
  photo: string | null;
  
  // Social Links (for AI About Me)
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  category: 'traditional' | 'modern' | 'minimalist';
  previewImage: string;
  accentColor: string;
}

export type Language = 'english' | 'hindi' | 'marathi';

export const initialFormData: BiodataFormData = {
  fullName: '',
  dateOfBirth: '',
  age: '',
  gender: '',
  height: '',
  complexion: '',
  maritalStatus: '',
  religion: '',
  caste: '',
  motherTongue: '',
  city: '',
  state: '',
  country: 'India',
  education: '',
  occupation: '',
  companyName: '',
  annualIncome: '',
  fatherName: '',
  fatherOccupation: '',
  motherName: '',
  motherOccupation: '',
  siblings: '',
  familyType: '',
  familyStatus: '',
  aboutMe: '',
  hobbies: '',
  partnerPreferences: '',
  contactLabel: 'Contact details available on request',
  photo: null,
  instagramUrl: '',
  facebookUrl: '',
  linkedinUrl: '',
};
