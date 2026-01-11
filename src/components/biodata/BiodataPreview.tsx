import { forwardRef } from 'react';
import { BiodataFormData, Language } from '@/types/biodata';
import { User } from 'lucide-react';

interface BiodataPreviewProps {
  formData: BiodataFormData;
  templateId: string;
  language: Language;
  backgroundColor?: string;
}

const translations = {
  english: {
    biodata: 'Biodata',
    personalDetails: 'Personal Details',
    name: 'Name',
    dateOfBirth: 'Date of Birth',
    age: 'Age',
    gender: 'Gender',
    height: 'Height',
    complexion: 'Complexion',
    maritalStatus: 'Marital Status',
    religion: 'Religion',
    caste: 'Caste',
    motherTongue: 'Mother Tongue',
    location: 'Location',
    education: 'Education & Career',
    highestEducation: 'Education',
    occupation: 'Occupation',
    company: 'Company',
    income: 'Annual Income',
    family: 'Family Details',
    fatherName: "Father's Name",
    fatherOccupation: "Father's Occupation",
    motherName: "Mother's Name",
    motherOccupation: "Mother's Occupation",
    siblings: 'Siblings',
    familyType: 'Family Type',
    aboutMe: 'About Me',
    hobbies: 'Hobbies',
    preferences: 'Partner Preferences',
    contact: 'Contact',
  },
  hindi: {
    biodata: 'बायोडाटा',
    personalDetails: 'व्यक्तिगत विवरण',
    name: 'नाम',
    dateOfBirth: 'जन्म तिथि',
    age: 'आयु',
    gender: 'लिंग',
    height: 'ऊंचाई',
    complexion: 'रंग',
    maritalStatus: 'वैवाहिक स्थिति',
    religion: 'धर्म',
    caste: 'जाति',
    motherTongue: 'मातृभाषा',
    location: 'स्थान',
    education: 'शिक्षा और करियर',
    highestEducation: 'शिक्षा',
    occupation: 'व्यवसाय',
    company: 'कंपनी',
    income: 'वार्षिक आय',
    family: 'पारिवारिक विवरण',
    fatherName: 'पिता का नाम',
    fatherOccupation: 'पिता का व्यवसाय',
    motherName: 'माता का नाम',
    motherOccupation: 'माता का व्यवसाय',
    siblings: 'भाई-बहन',
    familyType: 'परिवार का प्रकार',
    aboutMe: 'मेरे बारे में',
    hobbies: 'शौक',
    preferences: 'जीवनसाथी की पसंद',
    contact: 'संपर्क',
  },
  marathi: {
    biodata: 'बायोडाटा',
    personalDetails: 'वैयक्तिक माहिती',
    name: 'नाव',
    dateOfBirth: 'जन्म तारीख',
    age: 'वय',
    gender: 'लिंग',
    height: 'उंची',
    complexion: 'रंग',
    maritalStatus: 'वैवाहिक स्थिती',
    religion: 'धर्म',
    caste: 'जात',
    motherTongue: 'मातृभाषा',
    location: 'स्थान',
    education: 'शिक्षण आणि करिअर',
    highestEducation: 'शिक्षण',
    occupation: 'व्यवसाय',
    company: 'कंपनी',
    income: 'वार्षिक उत्पन्न',
    family: 'कौटुंबिक माहिती',
    fatherName: 'वडिलांचे नाव',
    fatherOccupation: 'वडिलांचा व्यवसाय',
    motherName: 'आईचे नाव',
    motherOccupation: 'आईचा व्यवसाय',
    siblings: 'भाऊ-बहीण',
    familyType: 'कुटुंबाचा प्रकार',
    aboutMe: 'माझ्याबद्दल',
    hobbies: 'छंद',
    preferences: 'जोडीदाराची पसंती',
    contact: 'संपर्क',
  },
};

// Template configurations - clean, minimal designs
const getTemplateConfig = (templateId: string) => {
  const configs: Record<string, {
    accentColor: string;
    headerStyle: 'centered' | 'left-aligned' | 'side-photo';
    sectionStyle: 'underlined' | 'boxed' | 'minimal' | 'accent-bg';
    photoStyle: 'circle' | 'rounded' | 'square';
    photoPosition: 'top-center' | 'top-right' | 'side';
    dividerStyle: 'line' | 'dots' | 'none';
    fontStyle: 'serif' | 'sans';
  }> = {
    // Traditional - Elegant with decorative elements
    'traditional-1': {
      accentColor: '#8B4513', // Saddle brown
      headerStyle: 'centered',
      sectionStyle: 'underlined',
      photoStyle: 'circle',
      photoPosition: 'top-center',
      dividerStyle: 'line',
      fontStyle: 'serif',
    },
    'traditional-2': {
      accentColor: '#800020', // Burgundy
      headerStyle: 'centered',
      sectionStyle: 'accent-bg',
      photoStyle: 'rounded',
      photoPosition: 'top-center',
      dividerStyle: 'line',
      fontStyle: 'serif',
    },
    'traditional-3': {
      accentColor: '#2F5233', // Forest green
      headerStyle: 'left-aligned',
      sectionStyle: 'boxed',
      photoStyle: 'circle',
      photoPosition: 'top-right',
      dividerStyle: 'line',
      fontStyle: 'serif',
    },
    // Modern - Clean and professional
    'modern-1': {
      accentColor: '#3B82F6', // Blue
      headerStyle: 'side-photo',
      sectionStyle: 'minimal',
      photoStyle: 'rounded',
      photoPosition: 'side',
      dividerStyle: 'none',
      fontStyle: 'sans',
    },
    'modern-2': {
      accentColor: '#7C3AED', // Purple
      headerStyle: 'left-aligned',
      sectionStyle: 'underlined',
      photoStyle: 'square',
      photoPosition: 'top-right',
      dividerStyle: 'line',
      fontStyle: 'sans',
    },
    'modern-3': {
      accentColor: '#0D9488', // Teal
      headerStyle: 'centered',
      sectionStyle: 'boxed',
      photoStyle: 'circle',
      photoPosition: 'top-center',
      dividerStyle: 'dots',
      fontStyle: 'sans',
    },
    // Minimalist - Ultra clean
    'minimalist-1': {
      accentColor: '#374151', // Gray
      headerStyle: 'centered',
      sectionStyle: 'minimal',
      photoStyle: 'circle',
      photoPosition: 'top-center',
      dividerStyle: 'none',
      fontStyle: 'sans',
    },
    'minimalist-2': {
      accentColor: '#78716C', // Warm gray
      headerStyle: 'left-aligned',
      sectionStyle: 'underlined',
      photoStyle: 'rounded',
      photoPosition: 'top-right',
      dividerStyle: 'line',
      fontStyle: 'sans',
    },
    'minimalist-3': {
      accentColor: '#1F2937', // Dark gray
      headerStyle: 'side-photo',
      sectionStyle: 'minimal',
      photoStyle: 'square',
      photoPosition: 'side',
      dividerStyle: 'none',
      fontStyle: 'sans',
    },
  };

  return configs[templateId] || configs['traditional-1'];
};

const BiodataPreview = forwardRef<HTMLDivElement, BiodataPreviewProps>(
  ({ formData, templateId, language, backgroundColor = '#FFFFFF' }, ref) => {
    const t = translations[language];
    const config = getTemplateConfig(templateId);
    const location = [formData.city, formData.state, formData.country].filter(Boolean).join(', ');

    const InfoRow = ({ label, value }: { label: string; value: string }) => {
      if (!value) return null;
      return (
        <div className="flex py-1 text-sm">
          <span className="w-2/5 text-gray-600">{label}</span>
          <span className="w-3/5 font-medium text-gray-800">{value}</span>
        </div>
      );
    };

    const SectionTitle = ({ children }: { children: React.ReactNode }) => {
      const baseClasses = "text-sm font-semibold mb-3 pb-1";
      
      if (config.sectionStyle === 'underlined') {
        return (
          <h3 
            className={baseClasses}
            style={{ 
              color: config.accentColor,
              borderBottom: `2px solid ${config.accentColor}`,
              paddingBottom: '4px'
            }}
          >
            {children}
          </h3>
        );
      }
      
      if (config.sectionStyle === 'boxed') {
        return (
          <h3 
            className={`${baseClasses} px-2 py-1 rounded`}
            style={{ 
              backgroundColor: `${config.accentColor}15`,
              color: config.accentColor,
            }}
          >
            {children}
          </h3>
        );
      }
      
      if (config.sectionStyle === 'accent-bg') {
        return (
          <h3 
            className={`${baseClasses} px-3 py-1.5 text-white rounded-sm`}
            style={{ backgroundColor: config.accentColor }}
          >
            {children}
          </h3>
        );
      }
      
      // minimal
      return (
        <h3 
          className={`${baseClasses} uppercase tracking-wider`}
          style={{ color: config.accentColor }}
        >
          {children}
        </h3>
      );
    };

    const PhotoComponent = () => {
      const photoClasses = {
        circle: 'rounded-full',
        rounded: 'rounded-xl',
        square: 'rounded-none',
      };

      const size = config.photoPosition === 'side' ? 'w-28 h-36' : 'w-24 h-24';

      return (
        <div 
          className={`${size} ${photoClasses[config.photoStyle]} border-2 flex-shrink-0 overflow-hidden flex items-center justify-center`}
          style={{ 
            borderColor: config.accentColor,
            backgroundColor: `${config.accentColor}10`
          }}
        >
          {formData.photo ? (
            <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10" style={{ color: config.accentColor }} />
          )}
        </div>
      );
    };

    const Divider = () => {
      if (config.dividerStyle === 'none') return null;
      if (config.dividerStyle === 'dots') {
        return (
          <div className="flex justify-center gap-1 my-4">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.accentColor }}
              />
            ))}
          </div>
        );
      }
      return (
        <div 
          className="my-4 h-px"
          style={{ backgroundColor: `${config.accentColor}30` }}
        />
      );
    };

    // Side-photo layout (Modern style)
    if (config.headerStyle === 'side-photo') {
      return (
        <div
          ref={ref}
          className="w-full max-w-[210mm] mx-auto shadow-lg"
          style={{ 
            aspectRatio: '210/297',
            fontFamily: config.fontStyle === 'serif' ? 'Playfair Display, serif' : 'Outfit, sans-serif',
            backgroundColor,
          }}
        >
          <div className="h-full flex">
            {/* Left sidebar with photo */}
            <div 
              className="w-1/3 p-6 flex flex-col items-center"
              style={{ backgroundColor: `${config.accentColor}08` }}
            >
              <PhotoComponent />
              <h2 
                className="mt-4 text-lg font-bold text-center"
                style={{ color: config.accentColor }}
              >
                {formData.fullName || 'Your Name'}
              </h2>
              {location && (
                <p className="text-xs text-gray-500 text-center mt-1">{location}</p>
              )}
              
              <Divider />
              
              {/* Contact */}
              <div className="w-full mt-auto">
                <SectionTitle>{t.contact}</SectionTitle>
                <p className="text-xs text-gray-600 text-center">
                  {formData.contactLabel || 'Contact details available on request'}
                </p>
              </div>
            </div>
            
            {/* Right content */}
            <div className="w-2/3 p-6 space-y-4">
              {/* Personal Details */}
              <div>
                <SectionTitle>{t.personalDetails}</SectionTitle>
                <div className="grid grid-cols-1 gap-0">
                  <InfoRow label={t.dateOfBirth} value={formData.dateOfBirth} />
                  <InfoRow label={t.age} value={formData.age} />
                  <InfoRow label={t.height} value={formData.height} />
                  <InfoRow label={t.complexion} value={formData.complexion} />
                  <InfoRow label={t.maritalStatus} value={formData.maritalStatus} />
                  <InfoRow label={t.religion} value={formData.religion} />
                  <InfoRow label={t.caste} value={formData.caste} />
                  <InfoRow label={t.motherTongue} value={formData.motherTongue} />
                </div>
              </div>
              
              {/* Education */}
              <div>
                <SectionTitle>{t.education}</SectionTitle>
                <div className="grid grid-cols-1 gap-0">
                  <InfoRow label={t.highestEducation} value={formData.education} />
                  <InfoRow label={t.occupation} value={formData.occupation} />
                  <InfoRow label={t.company} value={formData.companyName} />
                  <InfoRow label={t.income} value={formData.annualIncome} />
                </div>
              </div>
              
              {/* Family */}
              <div>
                <SectionTitle>{t.family}</SectionTitle>
                <div className="grid grid-cols-1 gap-0">
                  <InfoRow label={t.fatherName} value={formData.fatherName} />
                  <InfoRow label={t.fatherOccupation} value={formData.fatherOccupation} />
                  <InfoRow label={t.motherName} value={formData.motherName} />
                  <InfoRow label={t.motherOccupation} value={formData.motherOccupation} />
                  <InfoRow label={t.siblings} value={formData.siblings} />
                  <InfoRow label={t.familyType} value={formData.familyType} />
                </div>
              </div>
              
              {/* About Me */}
              {formData.aboutMe && (
                <div>
                  <SectionTitle>{t.aboutMe}</SectionTitle>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {formData.aboutMe}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Centered or left-aligned layout
    return (
      <div
        ref={ref}
        className="w-full max-w-[210mm] mx-auto shadow-lg"
        style={{ 
          aspectRatio: '210/297',
          fontFamily: config.fontStyle === 'serif' ? 'Playfair Display, serif' : 'Outfit, sans-serif',
          backgroundColor,
        }}
      >
        <div className="h-full p-8 flex flex-col">
          {/* Header */}
          <div className={`mb-6 ${config.headerStyle === 'centered' ? 'text-center' : 'flex items-start gap-6'}`}>
            {config.headerStyle === 'centered' ? (
              <>
                <div className="flex justify-center mb-4">
                  <PhotoComponent />
                </div>
                <p 
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: config.accentColor }}
                >
                  {t.biodata}
                </p>
                <h1 
                  className="text-2xl font-bold"
                  style={{ color: config.accentColor }}
                >
                  {formData.fullName || 'Your Name'}
                </h1>
                {location && (
                  <p className="text-sm text-gray-500 mt-1">{location}</p>
                )}
              </>
            ) : (
              <>
                <div className="flex-1">
                  <p 
                    className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: config.accentColor }}
                  >
                    {t.biodata}
                  </p>
                  <h1 
                    className="text-2xl font-bold"
                    style={{ color: config.accentColor }}
                  >
                    {formData.fullName || 'Your Name'}
                  </h1>
                  {location && (
                    <p className="text-sm text-gray-500 mt-1">{location}</p>
                  )}
                </div>
                <PhotoComponent />
              </>
            )}
          </div>

          <Divider />

          {/* Content - Two columns */}
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4 overflow-hidden">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Personal Details */}
              <div>
                <SectionTitle>{t.personalDetails}</SectionTitle>
                <div className="space-y-0">
                  <InfoRow label={t.dateOfBirth} value={formData.dateOfBirth} />
                  <InfoRow label={t.age} value={formData.age} />
                  <InfoRow label={t.height} value={formData.height} />
                  <InfoRow label={t.complexion} value={formData.complexion} />
                  <InfoRow label={t.maritalStatus} value={formData.maritalStatus} />
                  <InfoRow label={t.religion} value={formData.religion} />
                  <InfoRow label={t.caste} value={formData.caste} />
                  <InfoRow label={t.motherTongue} value={formData.motherTongue} />
                </div>
              </div>

              {/* Education */}
              <div>
                <SectionTitle>{t.education}</SectionTitle>
                <div className="space-y-0">
                  <InfoRow label={t.highestEducation} value={formData.education} />
                  <InfoRow label={t.occupation} value={formData.occupation} />
                  <InfoRow label={t.company} value={formData.companyName} />
                  <InfoRow label={t.income} value={formData.annualIncome} />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Family */}
              <div>
                <SectionTitle>{t.family}</SectionTitle>
                <div className="space-y-0">
                  <InfoRow label={t.fatherName} value={formData.fatherName} />
                  <InfoRow label={t.fatherOccupation} value={formData.fatherOccupation} />
                  <InfoRow label={t.motherName} value={formData.motherName} />
                  <InfoRow label={t.motherOccupation} value={formData.motherOccupation} />
                  <InfoRow label={t.siblings} value={formData.siblings} />
                  <InfoRow label={t.familyType} value={formData.familyType} />
                </div>
              </div>

              {/* About Me */}
              {(formData.aboutMe || formData.hobbies) && (
                <div>
                  <SectionTitle>{t.aboutMe}</SectionTitle>
                  {formData.aboutMe && (
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed line-clamp-4">
                      {formData.aboutMe}
                    </p>
                  )}
                  {formData.hobbies && (
                    <InfoRow label={t.hobbies} value={formData.hobbies} />
                  )}
                </div>
              )}

              {/* Partner Preferences */}
              {formData.partnerPreferences && (
                <div>
                  <SectionTitle>{t.preferences}</SectionTitle>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {formData.partnerPreferences}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              {formData.contactLabel || 'Contact details available on request'}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

BiodataPreview.displayName = 'BiodataPreview';

export default BiodataPreview;
