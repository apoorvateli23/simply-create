import { useState, useRef, useCallback } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Button } from '@/components/ui/button';
import BiodataForm from '@/components/biodata/BiodataForm';
import TemplateSelector from '@/components/biodata/TemplateSelector';
import BiodataPreview from '@/components/biodata/BiodataPreview';
import DownloadShare from '@/components/biodata/DownloadShare';
import { BiodataFormData, Language, initialFormData } from '@/types/biodata';
import { useToast } from '@/hooks/use-toast';

type Step = 'form' | 'template' | 'download';

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState<Step>('form');
  const [formData, setFormData] = useState<BiodataFormData>(initialFormData);
  const [selectedTemplate, setSelectedTemplate] = useState('traditional-1');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [isGeneratingAboutMe, setIsGeneratingAboutMe] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleFormChange = useCallback((data: Partial<BiodataFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const handleGenerateAboutMe = async () => {
    setIsGeneratingAboutMe(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const generatedAboutMe = `I am a ${formData.occupation || 'professional'} based in ${
      formData.city || 'India'
    }. I value family, growth, and balance in life.`;

    handleFormChange({ aboutMe: generatedAboutMe.slice(0, 200) });
    setIsGeneratingAboutMe(false);

    toast({
      title: 'About Me Generated',
      description: 'You can edit the text to personalize it.',
    });
  };

  const handleGeneratePdf = async () => {
    if (!previewRef.current) return;

    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      const blob = pdf.output('blob');
      setPdfBlob(blob);
      setDownloadReady(true);

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.fullName || 'biodata'}_biodata.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: 'PDF Downloaded',
        description: 'Your biodata has been saved.',
      });
    } catch {
      toast({
        title: 'PDF Generation Failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="w-20" />
        </div>
      </header>

      {/* Main */}
      <main className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel */}
          <div>
            {currentStep === 'form' && (
              <>
                <BiodataForm
                  formData={formData}
                  onChange={handleFormChange}
                  onGenerateAboutMe={handleGenerateAboutMe}
                  isGenerating={isGeneratingAboutMe}
                />
                <div className="mt-8 flex justify-end">
                  <Button size="lg" onClick={() => setCurrentStep('template')}>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </>
            )}

            {currentStep === 'template' && (
              <>
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  selectedLanguage={selectedLanguage}
                  backgroundColor={backgroundColor}
                  onTemplateChange={setSelectedTemplate}
                  onLanguageChange={setSelectedLanguage}
                  onBackgroundColorChange={setBackgroundColor}
                />
                <div className="mt-8 flex justify-between">
                  <Button variant="outline" size="lg" onClick={() => setCurrentStep('form')}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button size="lg" onClick={() => setCurrentStep('download')}>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </>
            )}

            {currentStep === 'download' && (
              <>
                <DownloadShare
                  onDownload={handleGeneratePdf}
                  isGenerating={isGeneratingPdf}
                  downloadReady={downloadReady}
                  pdfBlob={pdfBlob}
                />
                <div className="mt-8">
                  <Button variant="outline" size="lg" onClick={() => setCurrentStep('template')}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Change Template
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Right Panel */}
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-semibold">Live Preview</h3>
            </div>

            <div className="rounded-2xl border shadow-medium bg-white overflow-hidden">
              <div className="transform scale-[0.6] origin-top-left w-[166.67%] -mb-[40%]">
                <BiodataPreview
                  ref={previewRef}
                  formData={formData}
                  templateId={selectedTemplate}
                  language={selectedLanguage}
                  backgroundColor={backgroundColor}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
