import {
  User,
  GraduationCap,
  Users,
  Heart,
  Camera,
  Sparkles,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BiodataFormData } from '@/types/biodata';
import { useRef } from 'react';

interface BiodataFormProps {
  formData: BiodataFormData;
  onChange: (data: Partial<BiodataFormData>) => void;
  onGenerateAboutMe: () => void;
  isGenerating: boolean;
}

// Moved outside the component to prevent re-creation on each render
const SectionHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
    <div className="p-2 rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="font-display text-xl font-semibold">{title}</h3>
  </div>
);

// Moved outside the component to prevent re-creation on each render
const FormField = ({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">
      {label}
      {required && <span className="text-primary ml-1">*</span>}
    </Label>
    {children}
  </div>
);

const BiodataForm = ({
  formData,
  onChange,
  onGenerateAboutMe,
  isGenerating,
}: BiodataFormProps) => {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ photo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* Photo Upload */}
      <div className="flex flex-col items-center p-6 rounded-2xl bg-card border shadow-soft">
        <div
          className="relative w-32 h-32 rounded-full border-4 border-dashed border-gold/30 bg-secondary flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={() => photoInputRef.current?.click()}
        >
          {formData.photo ? (
            <img
              src={formData.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
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
        <p className="mt-3 text-sm text-muted-foreground">Click to upload photo (optional)</p>
      </div>

      {/* Personal Details */}
      <div className="p-6 rounded-2xl bg-card border shadow-soft">
        <SectionHeader icon={<User className="w-5 h-5" />} title="Personal Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Full Name" required>
            <Input
              value={formData.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="Enter your full name"
            />
          </FormField>

          <FormField label="Date of Birth">
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            />
          </FormField>

          <FormField label="Religion">
            <Input
              value={formData.religion}
              onChange={(e) => onChange({ religion: e.target.value })}
              placeholder="e.g., Hindu, Muslim, Christian"
            />
          </FormField>

          <FormField label="Caste">
            <Input
              value={formData.caste}
              onChange={(e) => onChange({ caste: e.target.value })}
              placeholder="Enter caste (optional)"
            />
          </FormField>

          <FormField label="Height">
            <Input
              value={formData.height}
              onChange={(e) => onChange({ height: e.target.value })}
              placeholder="e.g., 5 ft 8 in"
            />
          </FormField>

          <FormField label="Complexion">
            <Select
              value={formData.complexion}
              onValueChange={(value) => onChange({ complexion: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select complexion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="wheatish">Wheatish</SelectItem>
                <SelectItem value="dusky">Dusky</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="City">
            <Input
              value={formData.city}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="Enter your city"
            />
          </FormField>

          <FormField label="State">
            <Input
              value={formData.state}
              onChange={(e) => onChange({ state: e.target.value })}
              placeholder="Enter your state"
            />
          </FormField>
        </div>
      </div>

      {/* Education & Career */}
      <div className="p-6 rounded-2xl bg-card border shadow-soft">
        <SectionHeader icon={<GraduationCap className="w-5 h-5" />} title="Education & Career" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Education">
            <Input
              value={formData.education}
              onChange={(e) => onChange({ education: e.target.value })}
              placeholder="e.g., B.Tech, MBA"
            />
          </FormField>

          <FormField label="Occupation">
            <Input
              value={formData.occupation}
              onChange={(e) => onChange({ occupation: e.target.value })}
              placeholder="e.g., Software Engineer"
            />
          </FormField>

          <FormField label="Company">
            <Input
              value={formData.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
              placeholder="Company name (optional)"
            />
          </FormField>

          <FormField label="Annual Income">
            <Input
              value={formData.annualIncome}
              onChange={(e) => onChange({ annualIncome: e.target.value })}
              placeholder="e.g., 10-15 LPA"
            />
          </FormField>
        </div>
      </div>

      {/* Family Details */}
      <div className="p-6 rounded-2xl bg-card border shadow-soft">
        <SectionHeader icon={<Users className="w-5 h-5" />} title="Family Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Father's Name">
            <Input
              value={formData.fatherName}
              onChange={(e) => onChange({ fatherName: e.target.value })}
              placeholder="Father's name"
            />
          </FormField>

          <FormField label="Father's Occupation">
            <Input
              value={formData.fatherOccupation}
              onChange={(e) => onChange({ fatherOccupation: e.target.value })}
              placeholder="Father's occupation"
            />
          </FormField>

          <FormField label="Mother's Name">
            <Input
              value={formData.motherName}
              onChange={(e) => onChange({ motherName: e.target.value })}
              placeholder="Mother's name"
            />
          </FormField>

          <FormField label="Mother's Occupation">
            <Input
              value={formData.motherOccupation}
              onChange={(e) => onChange({ motherOccupation: e.target.value })}
              placeholder="Mother's occupation"
            />
          </FormField>

          <FormField label="Siblings">
            <Input
              value={formData.siblings}
              onChange={(e) => onChange({ siblings: e.target.value })}
              placeholder="e.g., 1 Brother, 1 Sister"
            />
          </FormField>

          <FormField label="Family Type">
            <Select
              value={formData.familyType}
              onValueChange={(value) => onChange({ familyType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select family type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joint">Joint Family</SelectItem>
                <SelectItem value="nuclear">Nuclear Family</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </div>

      {/* About Me */}
      <div className="p-6 rounded-2xl bg-card border shadow-soft">
        <SectionHeader icon={<Heart className="w-5 h-5" />} title="About Me & Preferences" />

        <div className="space-y-4">
          <FormField label="About Me">
            <div className="space-y-2">
              <Textarea
                value={formData.aboutMe}
                onChange={(e) => onChange({ aboutMe: e.target.value.slice(0, 200) })}
                placeholder="Tell us about yourself, your interests, and values..."
                rows={4}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {formData.aboutMe.length}/200 characters
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onGenerateAboutMe}
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
              </div>
            </div>
          </FormField>

          <FormField label="Partner Preferences">
            <Textarea
              value={formData.partnerPreferences}
              onChange={(e) => onChange({ partnerPreferences: e.target.value.slice(0, 200) })}
              placeholder="Describe your ideal partner..."
              rows={3}
            />
          </FormField>

          <FormField label="Contact Label">
            <Input
              value={formData.contactLabel}
              onChange={(e) => onChange({ contactLabel: e.target.value })}
              placeholder="e.g., Contact details available on request"
            />
          </FormField>
        </div>
      </div>

      {/* Social Profiles for AI Generation */}
      <div className="p-6 rounded-2xl bg-card border shadow-soft">
        <SectionHeader icon={<Instagram className="w-5 h-5" />} title="Social Profiles (for AI About Me)" />

        <p className="text-sm text-muted-foreground mb-4">
          Add your public social profile links to help AI generate a better About Me section.
        </p>

        <div className="space-y-4">
          <FormField label="Instagram URL">
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-muted-foreground" />
              <Input
                value={formData.instagramUrl}
                onChange={(e) => onChange({ instagramUrl: e.target.value })}
                placeholder="https://instagram.com/username"
              />
            </div>
          </FormField>

          <FormField label="Facebook URL">
            <div className="flex items-center gap-2">
              <Facebook className="w-5 h-5 text-muted-foreground" />
              <Input
                value={formData.facebookUrl}
                onChange={(e) => onChange({ facebookUrl: e.target.value })}
                placeholder="https://facebook.com/username"
              />
            </div>
          </FormField>

          <FormField label="LinkedIn URL">
            <div className="flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-muted-foreground" />
              <Input
                value={formData.linkedinUrl}
                onChange={(e) => onChange({ linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </FormField>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-sm text-center text-muted-foreground">
          🔒 <strong>Privacy First:</strong> We do not store your personal details. Your biodata is processed only temporarily and deleted immediately after PDF generation.
        </p>
      </div>
    </div>
  );
};

export default BiodataForm;
