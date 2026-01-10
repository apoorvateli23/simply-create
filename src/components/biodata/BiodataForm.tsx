import { motion } from 'framer-motion';
import { User, GraduationCap, Briefcase, Users, Heart, Camera, Sparkles, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BiodataFormData } from '@/types/biodata';
import { useRef } from 'react';

interface BiodataFormProps {
  formData: BiodataFormData;
  onChange: (data: Partial<BiodataFormData>) => void;
  onGenerateAboutMe: () => void;
  isGenerating: boolean;
}

const BiodataForm = ({ formData, onChange, onGenerateAboutMe, isGenerating }: BiodataFormProps) => {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
    </div>
  );

  const FormField = ({ label, children, required = false }: { label: string; children: React.ReactNode; required?: boolean }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </Label>
      {children}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Photo Upload */}
      <div className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
        <div 
          className="relative w-32 h-32 rounded-full border-4 border-dashed border-gold/30 bg-secondary flex items-center justify-center cursor-pointer hover:border-gold/50 transition-colors overflow-hidden"
          onClick={() => photoInputRef.current?.click()}
        >
          {formData.photo ? (
            <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Camera className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <p className="mt-3 text-sm text-muted-foreground">Upload Photo (Optional)</p>
      </div>

      {/* Personal Details */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
        <SectionHeader icon={<User className="w-5 h-5" />} title="Personal Details" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Full Name" required>
            <Input
              value={formData.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="Enter your full name"
              className="bg-background"
            />
          </FormField>

          <FormField label="Date of Birth">
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
              className="bg-background"
            />
          </FormField>

          <FormField label="Gender" required>
            <Select value={formData.gender} onValueChange={(value) => onChange({ gender: value as 'male' | 'female' })}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Height">
            <Input
              value={formData.height}
              onChange={(e) => onChange({ height: e.target.value })}
              placeholder="e.g., 5'8&quot;"
              className="bg-background"
            />
          </FormField>

          <FormField label="Marital Status">
            <Select value={formData.maritalStatus} onValueChange={(value) => onChange({ maritalStatus: value })}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never-married">Never Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Religion">
            <Input
              value={formData.religion}
              onChange={(e) => onChange({ religion: e.target.value })}
              placeholder="e.g., Hindu"
              className="bg-background"
            />
          </FormField>

          <FormField label="Caste">
            <Input
              value={formData.caste}
              onChange={(e) => onChange({ caste: e.target.value })}
              placeholder="e.g., Brahmin"
              className="bg-background"
            />
          </FormField>

          <FormField label="Mother Tongue">
            <Input
              value={formData.motherTongue}
              onChange={(e) => onChange({ motherTongue: e.target.value })}
              placeholder="e.g., Hindi"
              className="bg-background"
            />
          </FormField>
        </div>
      </div>

      {/* Location */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
        <SectionHeader icon={<User className="w-5 h-5" />} title="Location" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="City" required>
            <Input
              value={formData.city}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="Enter city"
              className="bg-background"
            />
          </FormField>

          <FormField label="State" required>
            <Input
              value={formData.state}
              onChange={(e) => onChange({ state: e.target.value })}
              placeholder="Enter state"
              className="bg-background"
            />
          </FormField>

          <FormField label="Country">
            <Input
              value={formData.country}
              onChange={(e) => onChange({ country: e.target.value })}
              placeholder="India"
              className="bg-background"
            />
          </FormField>
        </div>
      </div>

      {/* Education & Career */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
        <SectionHeader icon={<GraduationCap className="w-5 h-5" />} title="Education & Career" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Highest Education" required>
            <Input
              value={formData.education}
              onChange={(e) => onChange({ education: e.target.value })}
              placeholder="e.g., MBA, B.Tech"
              className="bg-background"
            />
          </FormField>

          <FormField label="Occupation" required>
            <Input
              value={formData.occupation}
              onChange={(e) => onChange({ occupation: e.target.value })}
              placeholder="e.g., Software Engineer"
              className="bg-background"
            />
          </FormField>

          <FormField label="Company Name">
            <Input
              value={formData.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
              placeholder="e.g., Google"
              className="bg-background"
            />
          </FormField>

          <FormField label="Annual Income">
            <Input
              value={formData.annualIncome}
              onChange={(e) => onChange({ annualIncome: e.target.value })}
              placeholder="e.g., 10-15 LPA"
              className="bg-background"
            />
          </FormField>
        </div>
      </div>

      {/* Family Details */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
        <SectionHeader icon={<Users className="w-5 h-5" />} title="Family Details" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Father's Name">
            <Input
              value={formData.fatherName}
              onChange={(e) => onChange({ fatherName: e.target.value })}
              placeholder="Enter father's name"
              className="bg-background"
            />
          </FormField>

          <FormField label="Father's Occupation">
            <Input
              value={formData.fatherOccupation}
              onChange={(e) => onChange({ fatherOccupation: e.target.value })}
              placeholder="e.g., Retired Government Officer"
              className="bg-background"
            />
          </FormField>

          <FormField label="Mother's Name">
            <Input
              value={formData.motherName}
              onChange={(e) => onChange({ motherName: e.target.value })}
              placeholder="Enter mother's name"
              className="bg-background"
            />
          </FormField>

          <FormField label="Mother's Occupation">
            <Input
              value={formData.motherOccupation}
              onChange={(e) => onChange({ motherOccupation: e.target.value })}
              placeholder="e.g., Homemaker"
              className="bg-background"
            />
          </FormField>

          <FormField label="Siblings">
            <Input
              value={formData.siblings}
              onChange={(e) => onChange({ siblings: e.target.value })}
              placeholder="e.g., 1 Elder Brother, 1 Younger Sister"
              className="bg-background"
            />
          </FormField>

          <FormField label="Family Type">
            <Select value={formData.familyType} onValueChange={(value) => onChange({ familyType: value })}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joint">Joint Family</SelectItem>
                <SelectItem value="nuclear">Nuclear Family</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </div>

      {/* About Me with AI */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
        <SectionHeader icon={<Heart className="w-5 h-5" />} title="About Me" />
        
        <div className="space-y-4">
          <FormField label="Tell us about yourself">
            <Textarea
              value={formData.aboutMe}
              onChange={(e) => onChange({ aboutMe: e.target.value })}
              placeholder="Write a brief introduction about yourself, your values, and what you're looking for..."
              className="bg-background min-h-[120px]"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground text-right">{formData.aboutMe.length}/200 characters</p>
          </FormField>

          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <p className="text-sm font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              Generate About Me with AI
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Add your social profiles and we'll generate a personalized introduction for you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-muted-foreground" />
                <Input
                  value={formData.instagramUrl}
                  onChange={(e) => onChange({ instagramUrl: e.target.value })}
                  placeholder="Instagram URL"
                  className="bg-background h-9 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-muted-foreground" />
                <Input
                  value={formData.facebookUrl}
                  onChange={(e) => onChange({ facebookUrl: e.target.value })}
                  placeholder="Facebook URL"
                  className="bg-background h-9 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-muted-foreground" />
                <Input
                  value={formData.linkedinUrl}
                  onChange={(e) => onChange({ linkedinUrl: e.target.value })}
                  placeholder="LinkedIn URL"
                  className="bg-background h-9 text-sm"
                />
              </div>
            </div>

            <Button
              variant="gold"
              size="sm"
              onClick={onGenerateAboutMe}
              disabled={isGenerating}
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? 'Generating...' : 'Generate About Me'}
            </Button>
          </div>

          <FormField label="Hobbies & Interests">
            <Input
              value={formData.hobbies}
              onChange={(e) => onChange({ hobbies: e.target.value })}
              placeholder="e.g., Reading, Traveling, Cooking, Music"
              className="bg-background"
            />
          </FormField>

          <FormField label="Partner Preferences">
            <Textarea
              value={formData.partnerPreferences}
              onChange={(e) => onChange({ partnerPreferences: e.target.value })}
              placeholder="Describe your ideal partner..."
              className="bg-background min-h-[80px]"
              maxLength={200}
            />
          </FormField>

          <FormField label="Contact Information Label">
            <Input
              value={formData.contactLabel}
              onChange={(e) => onChange({ contactLabel: e.target.value })}
              placeholder="e.g., Contact details available on request"
              className="bg-background"
            />
          </FormField>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
        <p className="text-sm text-green-800 dark:text-green-200 flex items-start gap-2">
          <span className="text-green-600 mt-0.5">🔒</span>
          <span>
            <strong>Your privacy matters.</strong> We do not store your personal details. 
            Your biodata is processed only temporarily and deleted immediately after PDF generation.
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default BiodataForm;
