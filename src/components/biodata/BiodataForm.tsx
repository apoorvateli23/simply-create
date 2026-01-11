import {
  User,
  GraduationCap,
  Users,
  Heart,
  Camera,
  Sparkles,
  Globe,
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
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <h3 className="font-display text-lg font-medium">{title}</h3>
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
  <div className="space-y-1.5">
    <Label className="text-sm text-muted-foreground">
      {label}
      {required && <span className="text-primary ml-0.5">*</span>}
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
    <div className="space-y-6">
      {/* Photo Upload */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-6">
          <div
            className="relative w-24 h-24 rounded-xl border-2 border-dashed border-border bg-secondary/50 flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary/50 transition-colors"
            onClick={() => photoInputRef.current?.click()}
          >
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <div>
            <p className="font-medium text-sm">Profile Photo</p>
            <p className="text-xs text-muted-foreground mt-1">
              Click to upload (optional)
            </p>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <SectionHeader icon={<User className="w-4 h-4" />} title="Personal Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Full Name" required>
            <Input
              value={formData.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="Enter your full name"
              className="h-10"
            />
          </FormField>

          <FormField label="Date of Birth">
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
              className="h-10"
            />
          </FormField>

          <FormField label="Religion">
            <Input
              value={formData.religion}
              onChange={(e) => onChange({ religion: e.target.value })}
              placeholder="e.g., Hindu, Muslim, Christian"
              className="h-10"
            />
          </FormField>

          <FormField label="Caste">
            <Input
              value={formData.caste}
              onChange={(e) => onChange({ caste: e.target.value })}
              placeholder="Enter caste (optional)"
              className="h-10"
            />
          </FormField>

          <FormField label="Height">
            <Input
              value={formData.height}
              onChange={(e) => onChange({ height: e.target.value })}
              placeholder="e.g., 5 ft 8 in"
              className="h-10"
            />
          </FormField>

          <FormField label="Complexion">
            <Select
              value={formData.complexion}
              onValueChange={(value) => onChange({ complexion: value })}
            >
              <SelectTrigger className="h-10">
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
              className="h-10"
            />
          </FormField>

          <FormField label="State">
            <Input
              value={formData.state}
              onChange={(e) => onChange({ state: e.target.value })}
              placeholder="Enter your state"
              className="h-10"
            />
          </FormField>
        </div>
      </div>

      {/* Education & Career */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <SectionHeader icon={<GraduationCap className="w-4 h-4" />} title="Education & Career" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Education">
            <Input
              value={formData.education}
              onChange={(e) => onChange({ education: e.target.value })}
              placeholder="e.g., B.Tech, MBA"
              className="h-10"
            />
          </FormField>

          <FormField label="Occupation">
            <Input
              value={formData.occupation}
              onChange={(e) => onChange({ occupation: e.target.value })}
              placeholder="e.g., Software Engineer"
              className="h-10"
            />
          </FormField>

          <FormField label="Company">
            <Input
              value={formData.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
              placeholder="Company name (optional)"
              className="h-10"
            />
          </FormField>

          <FormField label="Annual Income">
            <Input
              value={formData.annualIncome}
              onChange={(e) => onChange({ annualIncome: e.target.value })}
              placeholder="e.g., 10-15 LPA"
              className="h-10"
            />
          </FormField>
        </div>
      </div>

      {/* Family Details */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <SectionHeader icon={<Users className="w-4 h-4" />} title="Family Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Father's Name">
            <Input
              value={formData.fatherName}
              onChange={(e) => onChange({ fatherName: e.target.value })}
              placeholder="Father's name"
              className="h-10"
            />
          </FormField>

          <FormField label="Father's Occupation">
            <Input
              value={formData.fatherOccupation}
              onChange={(e) => onChange({ fatherOccupation: e.target.value })}
              placeholder="Father's occupation"
              className="h-10"
            />
          </FormField>

          <FormField label="Mother's Name">
            <Input
              value={formData.motherName}
              onChange={(e) => onChange({ motherName: e.target.value })}
              placeholder="Mother's name"
              className="h-10"
            />
          </FormField>

          <FormField label="Mother's Occupation">
            <Input
              value={formData.motherOccupation}
              onChange={(e) => onChange({ motherOccupation: e.target.value })}
              placeholder="Mother's occupation"
              className="h-10"
            />
          </FormField>

          <FormField label="Siblings">
            <Input
              value={formData.siblings}
              onChange={(e) => onChange({ siblings: e.target.value })}
              placeholder="e.g., 1 Brother, 1 Sister"
              className="h-10"
            />
          </FormField>

          <FormField label="Family Type">
            <Select
              value={formData.familyType}
              onValueChange={(value) => onChange({ familyType: value })}
            >
              <SelectTrigger className="h-10">
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
      <div className="p-6 rounded-xl bg-card border border-border">
        <SectionHeader icon={<Heart className="w-4 h-4" />} title="About Me" />

        <div className="space-y-4">
          <FormField label="About Me">
            <div className="space-y-2">
              <Textarea
                value={formData.aboutMe}
                onChange={(e) => onChange({ aboutMe: e.target.value.slice(0, 200) })}
                placeholder="Tell us about yourself, your interests, and values..."
                rows={3}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {formData.aboutMe.length}/200
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onGenerateAboutMe}
                  disabled={isGenerating}
                  className="h-8 text-xs"
                >
                  <Sparkles className="w-3 h-3 mr-1.5" />
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
              rows={2}
              className="resize-none"
            />
          </FormField>

          <FormField label="Contact Label">
            <Input
              value={formData.contactLabel}
              onChange={(e) => onChange({ contactLabel: e.target.value })}
              placeholder="e.g., Contact details available on request"
              className="h-10"
            />
          </FormField>
        </div>
      </div>

      {/* Social Profiles */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <SectionHeader icon={<Globe className="w-4 h-4" />} title="Social Profiles" />
        
        <p className="text-sm text-muted-foreground mb-4 -mt-2">
          Optional: Add links to help AI generate a better About Me
        </p>

        <div className="space-y-4">
          <FormField label="Instagram">
            <Input
              value={formData.instagramUrl}
              onChange={(e) => onChange({ instagramUrl: e.target.value })}
              placeholder="https://instagram.com/username"
              className="h-10"
            />
          </FormField>

          <FormField label="Facebook">
            <Input
              value={formData.facebookUrl}
              onChange={(e) => onChange({ facebookUrl: e.target.value })}
              placeholder="https://facebook.com/username"
              className="h-10"
            />
          </FormField>

          <FormField label="LinkedIn">
            <Input
              value={formData.linkedinUrl}
              onChange={(e) => onChange({ linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="h-10"
            />
          </FormField>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border">
        <p className="text-xs text-center text-muted-foreground">
          <span className="inline-block mr-1">🔒</span>
          Your data never leaves your browser. Nothing is stored.
        </p>
      </div>
    </div>
  );
};

export default BiodataForm;
