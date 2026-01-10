import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TemplateConfig, Language } from '@/types/biodata';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const templates: TemplateConfig[] = [
  // Traditional
  { id: 'traditional-1', name: 'Royal Gold', category: 'traditional', previewImage: '', accentColor: '#D4AF37' },
  { id: 'traditional-2', name: 'Classic Maroon', category: 'traditional', previewImage: '', accentColor: '#800020' },
  { id: 'traditional-3', name: 'Heritage Green', category: 'traditional', previewImage: '', accentColor: '#2F5233' },
  // Modern
  { id: 'modern-1', name: 'Clean Blue', category: 'modern', previewImage: '', accentColor: '#3B82F6' },
  { id: 'modern-2', name: 'Soft Rose', category: 'modern', previewImage: '', accentColor: '#F472B6' },
  { id: 'modern-3', name: 'Urban Gray', category: 'modern', previewImage: '', accentColor: '#6B7280' },
  // Minimalist
  { id: 'minimalist-1', name: 'Pure White', category: 'minimalist', previewImage: '', accentColor: '#1F2937' },
  { id: 'minimalist-2', name: 'Warm Beige', category: 'minimalist', previewImage: '', accentColor: '#92400E' },
  { id: 'minimalist-3', name: 'Sage Green', category: 'minimalist', previewImage: '', accentColor: '#65A30D' },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  selectedLanguage: Language;
  onTemplateChange: (templateId: string) => void;
  onLanguageChange: (language: Language) => void;
}

const TemplateSelector = ({ 
  selectedTemplate, 
  selectedLanguage,
  onTemplateChange,
  onLanguageChange 
}: TemplateSelectorProps) => {
  const categories = ['traditional', 'modern', 'minimalist'] as const;

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

      {/* Template Categories */}
      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <h4 className="font-display text-lg font-semibold capitalize flex items-center gap-2">
            {category === 'traditional' && <span className="w-3 h-3 rounded-full bg-gold" />}
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
                    'relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all',
                    selectedTemplate === template.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {/* Template Preview */}
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center p-2"
                    style={{ backgroundColor: `${template.accentColor}10` }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full mb-2"
                      style={{ backgroundColor: template.accentColor }}
                    />
                    <div className="w-full space-y-1">
                      <div className="h-1.5 bg-muted rounded w-3/4 mx-auto" />
                      <div className="h-1 bg-muted/50 rounded w-1/2 mx-auto" />
                      <div className="h-1 bg-muted/50 rounded w-2/3 mx-auto" />
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}

                  {/* Template Name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-2">
                    <p className="text-xs font-medium text-background truncate">{template.name}</p>
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
