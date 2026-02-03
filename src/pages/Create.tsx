import { useState, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
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

const steps: { id: Step; label: string; number: string }[] = [
  { id: 'form', label: 'Details', number: '01' },
  { id: 'template', label: 'Template', number: '02' },
  { id: 'download', label: 'Download', number: '03' },
];

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState<Step>('form');
  const [formData, setFormData] = useState<BiodataFormData>(initialFormData);
  const [selectedTemplate, setSelectedTemplate] = useState('traditional-1');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [isGeneratingAboutMe, setIsGeneratingAboutMe] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

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
    if (!pdfRef.current) return;

    setIsGeneratingPdf(true);
    try {
      const element = pdfRef.current;
      const scale = 3;
      
      const canvas = await html2canvas(element, {
        scale: scale,
        backgroundColor: backgroundColor,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-pdf-content]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.transform = 'none';
          }
        }
      });

      const pdf = new jsPDF({ 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      const canvasAspect = canvas.width / canvas.height;
      const pdfAspect = pdfWidth / pdfHeight;
      
      let imgWidth = pdfWidth;
      let imgHeight = pdfHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > pdfAspect) {
        imgHeight = pdfWidth / canvasAspect;
        offsetY = (pdfHeight - imgHeight) / 2;
      } else {
        imgWidth = pdfHeight * canvasAspect;
        offsetX = (pdfWidth - imgWidth) / 2;
      }

      pdf.addImage(imgData, 'PNG', offsetX, offsetY, imgWidth, imgHeight, undefined, 'FAST');

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
        description: 'Your biodata has been saved in high quality.',
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: 'PDF Generation Failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const goToNextStep = () => {
    if (currentStep === 'form') setCurrentStep('template');
    else if (currentStep === 'template') setCurrentStep('download');
  };

  const goToPrevStep = () => {
    if (currentStep === 'download') setCurrentStep('template');
    else if (currentStep === 'template') setCurrentStep('form');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Step Indicator */}
          <div className="hidden sm:flex items-center gap-8">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  currentStepIndex >= index 
                    ? 'text-foreground' 
                    : 'text-muted-foreground/50'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentStepIndex > index 
                    ? 'bg-primary text-primary-foreground' 
                    : currentStepIndex === index 
                      ? 'border-2 border-primary text-primary'
                      : 'border border-border text-muted-foreground'
                }`}>
                  {currentStepIndex > index ? <Check className="w-3 h-3" /> : step.number}
                </span>
                <span className="hidden md:inline">{step.label}</span>
              </button>
            ))}
          </div>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Panel - Form/Controls */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-medium mb-2">
                {currentStep === 'form' && 'Enter your details'}
                {currentStep === 'template' && 'Choose a template'}
                {currentStep === 'download' && 'Download your biodata'}
              </h1>
              <p className="text-muted-foreground">
                {currentStep === 'form' && 'Fill in the information you want to include in your biodata.'}
                {currentStep === 'template' && 'Select a design that matches your style.'}
                {currentStep === 'download' && 'Your biodata is ready. Download and share it.'}
              </p>
            </div>

            {currentStep === 'form' && (
              <BiodataForm
                formData={formData}
                onChange={handleFormChange}
                onGenerateAboutMe={handleGenerateAboutMe}
                isGenerating={isGeneratingAboutMe}
              />
            )}

            {currentStep === 'template' && (
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                selectedLanguage={selectedLanguage}
                backgroundColor={backgroundColor}
                onTemplateChange={setSelectedTemplate}
                onLanguageChange={setSelectedLanguage}
                onBackgroundColorChange={setBackgroundColor}
              />
            )}

            {currentStep === 'download' && (
              <DownloadShare
                onDownload={handleGeneratePdf}
                isGenerating={isGeneratingPdf}
                downloadReady={downloadReady}
                pdfBlob={pdfBlob}
              />
            )}

            {/* Navigation */}
            <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
              {currentStep !== 'form' ? (
                <Button 
                  variant="ghost" 
                  onClick={goToPrevStep}
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep !== 'download' && (
                <Button 
                  onClick={goToNextStep}
                  className="rounded-full px-6"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Preview
                </h3>
              </div>

              <div 
                className="rounded-xl border border-border bg-card shadow-soft overflow-hidden"
                style={{ aspectRatio: '210/297' }}
              >
                <div 
                  className="origin-top-left"
                  style={{
                    transform: 'scale(0.55)',
                    width: 'calc(100% / 0.55)',
                  }}
                >
                  <BiodataPreview
                    formData={formData}
                    templateId={selectedTemplate}
                    language={selectedLanguage}
                    backgroundColor={backgroundColor}
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                This is a scaled preview. The PDF will be full size.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Hidden full-size PDF render area */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: 0,
          width: '210mm',
          minHeight: '297mm',
        }}
      >
        <BiodataPreview
          ref={pdfRef}
          formData={formData}
          templateId={selectedTemplate}
          language={selectedLanguage}
          backgroundColor={backgroundColor}
          forPdf={true}
        />
      </div>
    </div>
  );
};

export default Create;
