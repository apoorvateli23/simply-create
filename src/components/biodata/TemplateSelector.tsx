import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TemplateConfig, Language } from '@/types/biodata';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const templates: TemplateConfig[] = [
  // Traditional
  { id: 'traditional-1', name: 'Classic', category: 'traditional', previewImage: '', accentColor: '#8B4513' },
  { id: 'traditional-2', name: 'Burgundy', category: 'traditional', previewImage: '', accentColor: '#800020' },
  { id: 'traditional-3', name: 'Heritage', category: 'traditional', previewImage: '', accentColor: '#2F5233' },
  // Modern
  { id: 'modern-1', name: 'Blue', category: 'modern', previewImage: '', accentColor: '#3B82F6' },
  { id: 'modern-2', name: 'Violet', category: 'modern', previewImage: '', accentColor: '#7C3AED' },
  { id: 'modern-3', name: 'Teal', category: 'modern', previewImage: '', accentColor: '#0D9488' },
  // Minimalist
  { id: 'minimalist-1', name: 'Simple', category: 'minimalist', previewImage: '', accentColor: '#374151' },
  { id: 'minimalist-2', name: 'Stone', category: 'minimalist', previewImage: '', accentColor: '#78716C' },
  { id: 'minimalist-3', name: 'Slate', category: 'minimalist', previewImage: '', accentColor: '#1F2937' },
];

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

// Template preview mini component - moved outside for performance
const TemplatePreview = ({ template }: { template: TemplateConfig }) => {
  const isSideLayout = template.id === 'modern-1' || template.id === 'minimalist-3';

  if (isSideLayout) {
    return (
      <div className="absolute inset-2 flex bg-white rounded overflow-hidden">
        <div 
          className="w-1/3 p-2 flex flex-col items-center"
          style={{ backgroundColor: `${template.accentColor}08` }}
        >
          <div 
            className="w-6 h-6 rounded-full mb-1.5"
            style={{ backgroundColor: `${template.accentColor}20`, border: `1px solid ${template.accentColor}40` }}
          />
          <div className="w-full space-y-0.5">
            <div className="h-0.5 rounded mx-auto" style={{ backgroundColor: template.accentColor, width: '80%' }} />
            <div className="h-0.5 bg-gray-200 rounded mx-auto" style={{ width: '60%' }} />
          </div>
        </div>
        <div className="w-2/3 p-2 space-y-1.5">
          <div className="h-0.5 rounded" style={{ backgroundColor: template.accentColor, width: '60%' }} />
          <div className="space-y-0.5">
            <div className="h-0.5 bg-gray-200 rounded w-full" />
            <div className="h-0.5 bg-gray-200 rounded w-4/5" />
          </div>
          <div className="h-0.5 rounded mt-2" style={{ backgroundColor: template.accentColor, width: '50%' }} />
          <div className="space-y-0.5">
            <div className="h-0.5 bg-gray-200 rounded w-full" />
            <div className="h-0.5 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-2 bg-white rounded overflow-hidden p-2">
      <div className="text-center mb-2">
        <div 
          className="w-7 h-7 rounded-full mx-auto mb-1"
          style={{ backgroundColor: `${template.accentColor}15`, border: `1.5px solid ${template.accentColor}50` }}
        />
        <div className="h-0.5 rounded mx-auto mb-0.5" style={{ backgroundColor: template.accentColor, width: '50%' }} />
        <div className="h-0.5 bg-gray-200 rounded mx-auto" style={{ width: '35%' }} />
      </div>
      
      <div className="h-px my-1.5" style={{ backgroundColor: `${template.accentColor}20` }} />
      
      <div className="grid grid-cols-2 gap-1.5">
        <div className="space-y-1">
          <div className="h-0.5 rounded" style={{ backgroundColor: template.accentColor, width: '70%' }} />
          <div className="space-y-0.5">
            <div className="h-0.5 bg-gray-200 rounded w-full" />
            <div className="h-0.5 bg-gray-200 rounded w-4/5" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-0.5 rounded" style={{ backgroundColor: template.accentColor, width: '60%' }} />
          <div className="space-y-0.5">
            <div className="h-0.5 bg-gray-200 rounded w-full" />
            <div className="h-0.5 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateSelector = ({ 
  selectedTemplate, 
  selectedLanguage,
  backgroundColor,
  onTemplateChange,
  onLanguageChange,
  onBackgroundColorChange,
}: TemplateSelectorProps) => {
  const categories = ['traditional', 'modern', 'minimalist'] as const;

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="p-5 rounded-xl bg-card border border-border">
        <Label className="text-sm text-muted-foreground mb-2 block">Language</Label>
        <Select value={selectedLanguage} onValueChange={(value) => onLanguageChange(value as Language)}>
          <SelectTrigger className="h-10 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
            <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Background Color */}
      <div className="p-5 rounded-xl bg-card border border-border">
        <Label className="text-sm text-muted-foreground mb-3 block">Background Color</Label>
        
        <div className="grid grid-cols-8 gap-2 mb-4">
          {backgroundPresets.map((preset) => (
            <button
              key={preset.color}
              onClick={() => onBackgroundColorChange(preset.color)}
              className={cn(
                'w-full aspect-square rounded-lg border transition-all relative',
                backgroundColor === preset.color
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'border-border hover:border-primary/50'
              )}
              style={{ backgroundColor: preset.color }}
              title={preset.name}
            >
              {backgroundColor === preset.color && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Custom:</span>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
            className="w-7 h-7 rounded cursor-pointer border border-border"
          />
          <Input
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
            className="flex-1 h-8 text-xs font-mono"
          />
        </div>
      </div>

      {/* Templates */}
      <div className="p-5 rounded-xl bg-card border border-border">
        <Label className="text-sm text-muted-foreground mb-4 block">Template Style</Label>
        
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3 capitalize">
                {category}
              </h4>
              
              <div className="grid grid-cols-3 gap-3">
                {templates
                  .filter((t) => t.category === category)
                  .map((template) => (
                    <motion.button
                      key={template.id}
                      onClick={() => onTemplateChange(template.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all bg-secondary/30',
                        selectedTemplate === template.id
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/30'
                      )}
                    >
                      <TemplatePreview template={template} />

                      {selectedTemplate === template.id && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-primary-foreground" />
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-[10px] font-medium text-white">{template.name}</p>
                      </div>
                    </motion.button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
