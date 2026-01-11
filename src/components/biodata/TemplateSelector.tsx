import { motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TemplateConfig, Language } from '@/types/biodata';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const templates: TemplateConfig[] = [
  // Traditional - Elegant with decorative elements
  { id: 'traditional-1', name: 'Classic Elegance', category: 'traditional', previewImage: '', accentColor: '#8B4513' },
  { id: 'traditional-2', name: 'Royal Burgundy', category: 'traditional', previewImage: '', accentColor: '#800020' },
  { id: 'traditional-3', name: 'Heritage Green', category: 'traditional', previewImage: '', accentColor: '#2F5233' },
  // Modern - Clean and professional
  { id: 'modern-1', name: 'Professional Blue', category: 'modern', previewImage: '', accentColor: '#3B82F6' },
  { id: 'modern-2', name: 'Violet Grace', category: 'modern', previewImage: '', accentColor: '#7C3AED' },
  { id: 'modern-3', name: 'Teal Fresh', category: 'modern', previewImage: '', accentColor: '#0D9488' },
  // Minimalist - Ultra clean
  { id: 'minimalist-1', name: 'Pure Simple', category: 'minimalist', previewImage: '', accentColor: '#374151' },
  { id: 'minimalist-2', name: 'Warm Stone', category: 'minimalist', previewImage: '', accentColor: '#78716C' },
  { id: 'minimalist-3', name: 'Slate Modern', category: 'minimalist', previewImage: '', accentColor: '#1F2937' },
];

// Preset background colors
const backgroundPresets = [
  { name: 'White', color: '#FFFFFF' },
  { name: 'Cream', color: '#FFFBF0' },
  { name: 'Soft Pink', color: '#FFF5F5' },
  { name: 'Light Blue', color: '#F0F9FF' },
  { name: 'Mint', color: '#F0FDF4' },
  { name: 'Lavender', color: '#FAF5FF' },
  { name: 'Warm Beige', color: '#FDF8F3' },
  { name: 'Light Yellow', color: '#FEFCE8' },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  selectedLanguage: Language;
  backgroundColor: string;
  onTemplateChange: (templateId: string) => void;
  onLanguageChange: (language: Language) => void;
  onBackgroundColorChange: (color: string) => void;
}

const TemplateSelector = ({ 
  selectedTemplate, 
  selectedLanguage,
  backgroundColor,
  onTemplateChange,
  onLanguageChange,
  onBackgroundColorChange,
}: TemplateSelectorProps) => {
  const categories = ['traditional', 'modern', 'minimalist'] as const;

  // Template preview mini component
  const TemplatePreview = ({ template }: { template: TemplateConfig }) => {
    const isTraditional = template.category === 'traditional';
    const isModern = template.category === 'modern';
    const isSideLayout = template.id === 'modern-1' || template.id === 'minimalist-3';

    if (isSideLayout) {
      return (
        <div className="absolute inset-1 flex bg-white rounded overflow-hidden">
          {/* Left sidebar */}
          <div 
            className="w-1/3 p-1.5 flex flex-col items-center"
            style={{ backgroundColor: `${template.accentColor}10` }}
          >
            <div 
              className="w-5 h-5 rounded-full mb-1"
              style={{ backgroundColor: `${template.accentColor}30`, border: `1px solid ${template.accentColor}` }}
            />
            <div className="w-full space-y-0.5">
              <div className="h-0.5 rounded mx-auto" style={{ backgroundColor: template.accentColor, width: '70%' }} />
              <div className="h-0.5 bg-gray-200 rounded mx-auto" style={{ width: '50%' }} />
            </div>
          </div>
          {/* Right content */}
          <div className="w-2/3 p-1.5 space-y-1">
            <div className="h-0.5 rounded" style={{ backgroundColor: template.accentColor, width: '60%' }} />
            <div className="space-y-0.5">
              <div className="h-0.5 bg-gray-200 rounded w-full" />
              <div className="h-0.5 bg-gray-200 rounded w-4/5" />
            </div>
            <div className="h-0.5 rounded mt-1" style={{ backgroundColor: template.accentColor, width: '50%' }} />
            <div className="space-y-0.5">
              <div className="h-0.5 bg-gray-200 rounded w-full" />
              <div className="h-0.5 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      );
    }

    const isCentered = template.id === 'traditional-1' || template.id === 'traditional-2' || template.id === 'modern-3' || template.id === 'minimalist-1';

    return (
      <div className="absolute inset-1 bg-white rounded overflow-hidden p-1.5">
        {/* Header */}
        <div className={`mb-1.5 ${isCentered ? 'text-center' : 'flex items-start gap-1'}`}>
          {isCentered ? (
            <>
              <div 
                className="w-6 h-6 rounded-full mx-auto mb-1"
                style={{ backgroundColor: `${template.accentColor}20`, border: `1.5px solid ${template.accentColor}` }}
              />
              <div className="h-0.5 rounded mx-auto mb-0.5" style={{ backgroundColor: template.accentColor, width: '50%' }} />
              <div className="h-0.5 bg-gray-200 rounded mx-auto" style={{ width: '35%' }} />
            </>
          ) : (
            <>
              <div className="flex-1">
                <div className="h-0.5 rounded mb-0.5" style={{ backgroundColor: template.accentColor, width: '60%' }} />
                <div className="h-0.5 bg-gray-200 rounded" style={{ width: '40%' }} />
              </div>
              <div 
                className="w-5 h-5 rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${template.accentColor}20`, border: `1px solid ${template.accentColor}` }}
              />
            </>
          )}
        </div>
        
        {/* Divider */}
        <div className="h-px my-1" style={{ backgroundColor: `${template.accentColor}30` }} />
        
        {/* Content */}
        <div className="grid grid-cols-2 gap-1">
          <div className="space-y-1">
            <div 
              className={`h-0.5 rounded ${isTraditional ? '' : ''}`}
              style={{ 
                backgroundColor: isModern ? template.accentColor : template.accentColor,
                width: '70%'
              }} 
            />
            <div className="space-y-0.5">
              <div className="h-0.5 bg-gray-200 rounded w-full" />
              <div className="h-0.5 bg-gray-200 rounded w-4/5" />
              <div className="h-0.5 bg-gray-200 rounded w-full" />
            </div>
          </div>
          <div className="space-y-1">
            <div 
              className="h-0.5 rounded"
              style={{ backgroundColor: template.accentColor, width: '60%' }} 
            />
            <div className="space-y-0.5">
              <div className="h-0.5 bg-gray-200 rounded w-full" />
              <div className="h-0.5 bg-gray-200 rounded w-3/4" />
              <div className="h-0.5 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="p-4 rounded-xl bg-card border border-border/50 shadow-soft">
        <label className="text-sm font-medium mb-2 block">Biodata Language</label>
        <Select value={selectedLanguage} onValueChange={(value) => onLanguageChange(value as Language)}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
            <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Background Color Selector */}
      <div className="p-4 rounded-xl bg-card border border-border/50 shadow-soft">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-primary" />
          <Label className="text-sm font-medium">Background Color</Label>
        </div>
        
        {/* Preset colors */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {backgroundPresets.map((preset) => (
            <button
              key={preset.color}
              onClick={() => onBackgroundColorChange(preset.color)}
              className={cn(
                'w-full aspect-square rounded-lg border-2 transition-all relative',
                backgroundColor === preset.color
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              )}
              style={{ backgroundColor: preset.color }}
              title={preset.name}
            >
              {backgroundColor === preset.color && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Custom color picker */}
        <div className="flex items-center gap-2">
          <Label className="text-xs text-muted-foreground">Custom:</Label>
          <div className="flex items-center gap-2 flex-1">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-border"
            />
            <Input
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              placeholder="#FFFFFF"
              className="flex-1 h-8 text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Template Categories */}
      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <h4 className="font-display text-lg font-semibold capitalize flex items-center gap-2">
            {category === 'traditional' && <span className="w-3 h-3 rounded-full bg-amber-700" />}
            {category === 'modern' && <span className="w-3 h-3 rounded-full bg-blue-500" />}
            {category === 'minimalist' && <span className="w-3 h-3 rounded-full bg-gray-400" />}
            {category}
          </h4>
          
          <div className="grid grid-cols-3 gap-3">
            {templates
              .filter((t) => t.category === category)
              .map((template) => (
                <motion.button
                  key={template.id}
                  onClick={() => onTemplateChange(template.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all bg-gray-100',
                    selectedTemplate === template.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {/* Template Preview */}
                  <TemplatePreview template={template} />

                  {/* Selected Indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}

                  {/* Template Name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-2">
                    <p className="text-xs font-medium text-white truncate">{template.name}</p>
                  </div>
                </motion.button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
