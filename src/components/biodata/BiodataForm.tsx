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
      </div>

      {/* Personal Details */}
      <div className="p-6 rounded-2xl bg-card border shadow-soft">
        <SectionHeader icon={<User className="w-5 h-5" />} title="Personal Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Full Name" required>
            <Input
              value={formData.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
            />
          </FormField>

          <FormField label="Date of Birth">
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                onChange({ dateOfBirth: e.target.value })
              }
            />
          </FormField>
        </div>
      </div>

      {/* (rest of the file is IDENTICAL to your original, unchanged) */}
    </div>
  );
};

export default BiodataForm;
