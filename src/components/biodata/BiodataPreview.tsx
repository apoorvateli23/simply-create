import { forwardRef } from 'react';
import { BiodataFormData, Language } from '@/types/biodata';
import { User } from 'lucide-react';

interface BiodataPreviewProps {
  formData: BiodataFormData;
  templateId: string;
  language: Language;
}

const translations = {
  english: {
    biodata: 'Biodata',
    personalDetails: 'Personal Details',
    name: 'Name',
    dateOfBirth: 'Date of Birth',
    age: 'Age',
    height: 'Height',
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
    height: 'ऊंचाई',
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
    height: 'उंची',
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

const getTemplateStyles = (templateId: string) => {
  const styles = {
    // Traditional
    'traditional-1': {
      bg: 'bg-amber-50',
      accent: '#D4AF37',
      headerBg: 'bg-gradient-to-r from-amber-100 to-amber-50',
      border: 'border-amber-200',
      title: 'text-amber-900',
      sectionTitle: 'text-amber-800 border-b-2 border-amber-300',
    },
    'traditional-2': {
      bg: 'bg-rose-50',
      accent: '#800020',
      headerBg: 'bg-gradient-to-r from-rose-100 to-rose-50',
      border: 'border-rose-200',
      title: 'text-rose-900',
      sectionTitle: 'text-rose-800 border-b-2 border-rose-300',
    },
    'traditional-3': {
      bg: 'bg-emerald-50',
      accent: '#2F5233',
      headerBg: 'bg-gradient-to-r from-emerald-100 to-emerald-50',
      border: 'border-emerald-200',
      title: 'text-emerald-900',
      sectionTitle: 'text-emerald-800 border-b-2 border-emerald-300',
    },
    // Modern
    'modern-1': {
      bg: 'bg-blue-50',
      accent: '#3B82F6',
      headerBg: 'bg-gradient-to-r from-blue-100 to-blue-50',
      border: 'border-blue-200',
      title: 'text-blue-900',
      sectionTitle: 'text-blue-700 border-b border-blue-200',
    },
    'modern-2': {
      bg: 'bg-pink-50',
      accent: '#F472B6',
      headerBg: 'bg-gradient-to-r from-pink-100 to-pink-50',
      border: 'border-pink-200',
      title: 'text-pink-900',
      sectionTitle: 'text-pink-700 border-b border-pink-200',
    },
    'modern-3': {
      bg: 'bg-gray-50',
      accent: '#6B7280',
      headerBg: 'bg-gradient-to-r from-gray-100 to-gray-50',
      border: 'border-gray-200',
      title: 'text-gray-900',
      sectionTitle: 'text-gray-700 border-b border-gray-200',
    },
    // Minimalist
    'minimalist-1': {
      bg: 'bg-white',
      accent: '#1F2937',
      headerBg: 'bg-white',
      border: 'border-gray-100',
      title: 'text-gray-900',
      sectionTitle: 'text-gray-800 font-light tracking-wide',
    },
    'minimalist-2': {
      bg: 'bg-orange-50',
      accent: '#92400E',
      headerBg: 'bg-orange-50',
      border: 'border-orange-100',
      title: 'text-orange-900',
      sectionTitle: 'text-orange-800 font-light tracking-wide',
    },
    'minimalist-3': {
      bg: 'bg-lime-50',
      accent: '#65A30D',
      headerBg: 'bg-lime-50',
      border: 'border-lime-100',
      title: 'text-lime-900',
      sectionTitle: 'text-lime-800 font-light tracking-wide',
    },
  };

  return styles[templateId as keyof typeof styles] || styles['traditional-1'];
};

const BiodataPreview = forwardRef<HTMLDivElement, BiodataPreviewProps>(
  ({ formData, templateId, language }, ref) => {
    const t = translations[language];
    const styles = getTemplateStyles(templateId);

    const InfoRow = ({ label, value }: { label: string; value: string }) => {
      if (!value) return null;
      return (
        <div className="flex py-1">
          <span className="w-1/3 text-muted-foreground text-sm">{label}:</span>
          <span className="w-2/3 text-sm font-medium">{value}</span>
        </div>
      );
    };

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
      <h3 className={`font-display text-base font-semibold mb-3 pb-1 ${styles.sectionTitle}`}>
        {children}
      </h3>
    );

    const location = [formData.city, formData.state, formData.country].filter(Boolean).join(', ');

    return (
      <div
        ref={ref}
        className={`w-full max-w-[210mm] mx-auto ${styles.bg} border ${styles.border} shadow-lg`}
        style={{ 
          aspectRatio: '210/297',
          fontFamily: templateId.startsWith('minimalist') ? 'Outfit, sans-serif' : 'inherit'
        }}
      >
        <div className="h-full p-8 flex flex-col">
          {/* Header */}
          <div className={`${styles.headerBg} -mx-8 -mt-8 px-8 py-6 mb-6`}>
            <div className="flex items-center gap-6">
              {/* Photo */}
              <div 
                className="w-24 h-24 rounded-full border-4 flex-shrink-0 overflow-hidden flex items-center justify-center"
                style={{ borderColor: styles.accent, backgroundColor: `${styles.accent}10` }}
              >
                {formData.photo ? (
                  <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10" style={{ color: styles.accent }} />
                )}
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.biodata}</p>
                <h1 className={`font-display text-2xl font-bold ${styles.title}`}>
                  {formData.fullName || 'Your Name'}
                </h1>
                {location && (
                  <p className="text-sm text-muted-foreground mt-1">{location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4 text-foreground overflow-hidden">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Personal Details */}
              <div>
                <SectionTitle>{t.personalDetails}</SectionTitle>
                <div className="space-y-0.5">
                  <InfoRow label={t.dateOfBirth} value={formData.dateOfBirth} />
                  <InfoRow label={t.height} value={formData.height} />
                  <InfoRow label={t.maritalStatus} value={formData.maritalStatus} />
                  <InfoRow label={t.religion} value={formData.religion} />
                  <InfoRow label={t.caste} value={formData.caste} />
                  <InfoRow label={t.motherTongue} value={formData.motherTongue} />
                </div>
              </div>

              {/* Education */}
              <div>
                <SectionTitle>{t.education}</SectionTitle>
                <div className="space-y-0.5">
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
                <div className="space-y-0.5">
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
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
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
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {formData.partnerPreferences}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t" style={{ borderColor: `${styles.accent}30` }}>
            <p className="text-sm text-center text-muted-foreground">
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
