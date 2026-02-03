import { forwardRef } from 'react';
import { BiodataFormData, Language } from '@/types/biodata';
import { User } from 'lucide-react';

interface BiodataPreviewProps {
  formData: BiodataFormData;
  templateId: string;
  language: Language;
  backgroundColor?: string;
  forPdf?: boolean;
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
  ({ formData, templateId, language, backgroundColor = '#FFFFFF', forPdf = false }, ref) => {
    const t = translations[language];
    const config = getTemplateConfig(templateId);
    const location = [formData.city, formData.state, formData.country].filter(Boolean).join(', ');

    // PDF-optimized sizes - larger for better quality
    const sizes = forPdf ? {
      text: { base: '16px', sm: '14px', xs: '12px', lg: '18px', xl: '20px', '2xl': '28px' },
      padding: { base: '32px', lg: '48px' },
      photoSize: config.photoPosition === 'side' ? { w: '160px', h: '200px' } : { w: '128px', h: '128px' },
      iconSize: '56px',
    } : {
      text: { base: '14px', sm: '12px', xs: '10px', lg: '16px', xl: '18px', '2xl': '24px' },
      padding: { base: '24px', lg: '32px' },
      photoSize: config.photoPosition === 'side' ? { w: '112px', h: '144px' } : { w: '96px', h: '96px' },
      iconSize: '40px',
    };

    const InfoRow = ({ label, value }: { label: string; value: string }) => {
      if (!value) return null;
      return (
        <div 
          style={{ 
            display: 'flex', 
            padding: forPdf ? '8px 0' : '4px 0',
            fontSize: sizes.text.sm,
            lineHeight: '1.5',
          }}
        >
          <span style={{ width: '40%', color: '#4B5563' }}>{label}</span>
          <span style={{ width: '60%', fontWeight: 500, color: '#1F2937' }}>{value}</span>
        </div>
      );
    };

    const SectionTitle = ({ children }: { children: React.ReactNode }) => {
      const baseStyle: React.CSSProperties = {
        fontSize: sizes.text.base,
        fontWeight: 600,
        marginBottom: forPdf ? '16px' : '12px',
        paddingBottom: forPdf ? '8px' : '4px',
      };
      
      if (config.sectionStyle === 'underlined') {
        return (
          <h3 style={{ 
            ...baseStyle,
            color: config.accentColor,
            borderBottom: `2px solid ${config.accentColor}`,
          }}>
            {children}
          </h3>
        );
      }
      
      if (config.sectionStyle === 'boxed') {
        return (
          <h3 style={{ 
            ...baseStyle,
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: `${config.accentColor}15`,
            color: config.accentColor,
          }}>
            {children}
          </h3>
        );
      }
      
      if (config.sectionStyle === 'accent-bg') {
        return (
          <h3 style={{ 
            ...baseStyle,
            padding: '12px 16px',
            borderRadius: '2px',
            backgroundColor: config.accentColor,
            color: 'white',
          }}>
            {children}
          </h3>
        );
      }
      
      // minimal
      return (
        <h3 style={{ 
          ...baseStyle,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: config.accentColor,
        }}>
          {children}
        </h3>
      );
    };

    const PhotoComponent = () => {
      const borderRadius = {
        circle: '50%',
        rounded: '12px',
        square: '0px',
      };

      return (
        <div 
          style={{ 
            width: sizes.photoSize.w,
            height: sizes.photoSize.h,
            borderRadius: borderRadius[config.photoStyle],
            border: `2px solid ${config.accentColor}`,
            backgroundColor: `${config.accentColor}10`,
            flexShrink: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {formData.photo ? (
            <img 
              src={formData.photo} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              crossOrigin="anonymous"
            />
          ) : (
            <User style={{ width: sizes.iconSize, height: sizes.iconSize, color: config.accentColor }} />
          )}
        </div>
      );
    };

    const Divider = () => {
      if (config.dividerStyle === 'none') return null;
      if (config.dividerStyle === 'dots') {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '16px 0' }}>
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%',
                  backgroundColor: config.accentColor,
                }}
              />
            ))}
          </div>
        );
      }
      return (
        <div 
          style={{ 
            margin: '16px 0', 
            height: '1px',
            backgroundColor: `${config.accentColor}30`,
          }}
        />
      );
    };

    const containerStyle: React.CSSProperties = {
      width: forPdf ? '210mm' : '100%',
      maxWidth: forPdf ? undefined : '210mm',
      height: forPdf ? '297mm' : undefined,
      aspectRatio: forPdf ? undefined : '210/297',
      margin: '0 auto',
      fontFamily: config.fontStyle === 'serif' ? 'Playfair Display, serif' : 'Outfit, sans-serif',
      backgroundColor,
      boxShadow: forPdf ? undefined : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      overflow: 'hidden',
    };

    // Side-photo layout (Modern style)
    if (config.headerStyle === 'side-photo') {
      return (
        <div ref={ref} data-pdf-content style={containerStyle}>
          <div style={{ height: '100%', display: 'flex' }}>
            {/* Left sidebar with photo */}
            <div 
              style={{ 
                width: '33.33%', 
                padding: sizes.padding.lg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: `${config.accentColor}08`,
              }}
            >
              <PhotoComponent />
              <h2 
                style={{ 
                  marginTop: '16px',
                  fontSize: sizes.text.xl,
                  fontWeight: 700,
                  textAlign: 'center',
                  color: config.accentColor,
                }}
              >
                {formData.fullName || 'Your Name'}
              </h2>
              {location && (
                <p style={{ fontSize: sizes.text.xs, color: '#6B7280', textAlign: 'center', marginTop: '4px' }}>
                  {location}
                </p>
              )}
              
              <Divider />
              
              {/* Contact */}
              <div style={{ width: '100%', marginTop: 'auto' }}>
                <SectionTitle>{t.contact}</SectionTitle>
                <p style={{ fontSize: sizes.text.xs, color: '#4B5563', textAlign: 'center' }}>
                  {formData.contactLabel || 'Contact details available on request'}
                </p>
              </div>
            </div>
            
            {/* Right content */}
            <div style={{ width: '66.67%', padding: sizes.padding.lg }}>
              {/* Personal Details */}
              <div style={{ marginBottom: '16px' }}>
                <SectionTitle>{t.personalDetails}</SectionTitle>
                <InfoRow label={t.dateOfBirth} value={formData.dateOfBirth} />
                <InfoRow label={t.age} value={formData.age} />
                <InfoRow label={t.height} value={formData.height} />
                <InfoRow label={t.complexion} value={formData.complexion} />
                <InfoRow label={t.maritalStatus} value={formData.maritalStatus} />
                <InfoRow label={t.religion} value={formData.religion} />
                <InfoRow label={t.caste} value={formData.caste} />
                <InfoRow label={t.motherTongue} value={formData.motherTongue} />
              </div>
              
              {/* Education */}
              <div style={{ marginBottom: '16px' }}>
                <SectionTitle>{t.education}</SectionTitle>
                <InfoRow label={t.highestEducation} value={formData.education} />
                <InfoRow label={t.occupation} value={formData.occupation} />
                <InfoRow label={t.company} value={formData.companyName} />
                <InfoRow label={t.income} value={formData.annualIncome} />
              </div>
              
              {/* Family */}
              <div style={{ marginBottom: '16px' }}>
                <SectionTitle>{t.family}</SectionTitle>
                <InfoRow label={t.fatherName} value={formData.fatherName} />
                <InfoRow label={t.fatherOccupation} value={formData.fatherOccupation} />
                <InfoRow label={t.motherName} value={formData.motherName} />
                <InfoRow label={t.motherOccupation} value={formData.motherOccupation} />
                <InfoRow label={t.siblings} value={formData.siblings} />
                <InfoRow label={t.familyType} value={formData.familyType} />
              </div>
              
              {/* About Me */}
              {formData.aboutMe && (
                <div>
                  <SectionTitle>{t.aboutMe}</SectionTitle>
                  <p style={{ fontSize: sizes.text.sm, color: '#4B5563', lineHeight: '1.6' }}>
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
      <div ref={ref} data-pdf-content style={containerStyle}>
        <div style={{ height: '100%', padding: sizes.padding.lg, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ 
            marginBottom: '24px',
            textAlign: config.headerStyle === 'centered' ? 'center' : undefined,
            display: config.headerStyle === 'left-aligned' ? 'flex' : undefined,
            alignItems: config.headerStyle === 'left-aligned' ? 'flex-start' : undefined,
            gap: config.headerStyle === 'left-aligned' ? '24px' : undefined,
          }}>
            {config.headerStyle === 'centered' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <PhotoComponent />
                </div>
                <p 
                  style={{ 
                    fontSize: sizes.text.xs,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '4px',
                    color: config.accentColor,
                  }}
                >
                  {t.biodata}
                </p>
                <h1 
                  style={{ 
                    fontSize: sizes.text['2xl'],
                    fontWeight: 700,
                    color: config.accentColor,
                  }}
                >
                  {formData.fullName || 'Your Name'}
                </h1>
                {location && (
                  <p style={{ fontSize: sizes.text.sm, color: '#6B7280', marginTop: '4px' }}>{location}</p>
                )}
              </>
            ) : (
              <>
                <div style={{ flex: 1 }}>
                  <p 
                    style={{ 
                      fontSize: sizes.text.xs,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      marginBottom: '4px',
                      color: config.accentColor,
                    }}
                  >
                    {t.biodata}
                  </p>
                  <h1 
                    style={{ 
                      fontSize: sizes.text['2xl'],
                      fontWeight: 700,
                      color: config.accentColor,
                    }}
                  >
                    {formData.fullName || 'Your Name'}
                  </h1>
                  {location && (
                    <p style={{ fontSize: sizes.text.sm, color: '#6B7280', marginTop: '4px' }}>{location}</p>
                  )}
                </div>
                <PhotoComponent />
              </>
            )}
          </div>

          <Divider />

          {/* Content - Two columns */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Left Column */}
            <div>
              {/* Personal Details */}
              <div style={{ marginBottom: '16px' }}>
                <SectionTitle>{t.personalDetails}</SectionTitle>
                <InfoRow label={t.dateOfBirth} value={formData.dateOfBirth} />
                <InfoRow label={t.age} value={formData.age} />
                <InfoRow label={t.height} value={formData.height} />
                <InfoRow label={t.complexion} value={formData.complexion} />
                <InfoRow label={t.maritalStatus} value={formData.maritalStatus} />
                <InfoRow label={t.religion} value={formData.religion} />
                <InfoRow label={t.caste} value={formData.caste} />
                <InfoRow label={t.motherTongue} value={formData.motherTongue} />
              </div>

              {/* Education */}
              <div>
                <SectionTitle>{t.education}</SectionTitle>
                <InfoRow label={t.highestEducation} value={formData.education} />
                <InfoRow label={t.occupation} value={formData.occupation} />
                <InfoRow label={t.company} value={formData.companyName} />
                <InfoRow label={t.income} value={formData.annualIncome} />
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Family */}
              <div style={{ marginBottom: '16px' }}>
                <SectionTitle>{t.family}</SectionTitle>
                <InfoRow label={t.fatherName} value={formData.fatherName} />
                <InfoRow label={t.fatherOccupation} value={formData.fatherOccupation} />
                <InfoRow label={t.motherName} value={formData.motherName} />
                <InfoRow label={t.motherOccupation} value={formData.motherOccupation} />
                <InfoRow label={t.siblings} value={formData.siblings} />
                <InfoRow label={t.familyType} value={formData.familyType} />
              </div>

              {/* About Me */}
              {(formData.aboutMe || formData.hobbies) && (
                <div style={{ marginBottom: '16px' }}>
                  <SectionTitle>{t.aboutMe}</SectionTitle>
                  {formData.aboutMe && (
                    <p style={{ fontSize: sizes.text.xs, color: '#4B5563', marginBottom: '8px', lineHeight: '1.6' }}>
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
                  <p style={{ fontSize: sizes.text.xs, color: '#4B5563', lineHeight: '1.6' }}>
                    {formData.partnerPreferences}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: sizes.text.xs, textAlign: 'center', color: '#6B7280' }}>
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
