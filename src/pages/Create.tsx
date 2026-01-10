import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, Download } from 'lucide-react';
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
  const [isGeneratingAboutMe, setIsGeneratingAboutMe] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleFormChange = useCallback((data: Partial<BiodataFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const handleGenerateAboutMe = async () => {
    setIsGeneratingAboutMe(true);
    
    // Simulate AI generation (replace with actual AI call when backend is ready)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedAboutMe = `I am a ${formData.occupation || 'professional'} based in ${formData.city || 'India'}. I believe in maintaining a balance between traditional values and modern outlook. I enjoy ${formData.hobbies || 'reading, traveling, and spending time with family'}. Looking for a life partner who shares similar values.`;
    
    handleFormChange({ aboutMe: generatedAboutMe.slice(0, 200) });
    setIsGeneratingAboutMe(false);
    
    toast({
      title: "About Me Generated!",
      description: "You can edit the text to personalize it further.",
    });
  };

  const handleGeneratePdf = async () => {
    if (!previewRef.current) return;
    
    setIsGeneratingPdf(true);
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      const blob = pdf.output('blob');
      setPdfBlob(blob);
      setDownloadReady(true);
      
      // Trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.fullName || 'biodata'}_biodata.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "PDF Downloaded!",
        description: "Your biodata has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const steps = [
    { id: 'form', label: 'Enter Details', number: 1 },
    { id: 'template', label: 'Choose Template', number: 2 },
    { id: 'download', label: 'Download', number: 3 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {/* Step Indicator */}
          <div className="hidden md:flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.id as Step)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                    currentStep === step.id
                      ? 'bg-primary text-primary-foreground'
                      : index < currentStepIndex
                      ? 'bg-green-100 text-green-800'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center text-xs font-semibold">
                    {step.number}
                  </span>
                  {step.label}
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Step Counter */}
          <div className="md:hidden text-sm text-muted-foreground">
            Step {currentStepIndex + 1} of 3
          </div>

          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form / Template / Download */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {currentStep === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-semibold mb-2">Enter Your Details</h2>
                    <p className="text-muted-foreground">Fill in the information to create your biodata.</p>
                  </div>
                  <BiodataForm
                    formData={formData}
                    onChange={handleFormChange}
                    onGenerateAboutMe={handleGenerateAboutMe}
                    isGenerating={isGeneratingAboutMe}
                  />
                  <div className="mt-8 flex justify-end">
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={() => setCurrentStep('template')}
                    >
                      Continue to Templates
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 'template' && (
                <motion.div
                  key="template"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-semibold mb-2">Choose a Template</h2>
                    <p className="text-muted-foreground">Select a design that matches your style.</p>
                  </div>
                  <TemplateSelector
                    selectedTemplate={selectedTemplate}
                    selectedLanguage={selectedLanguage}
                    onTemplateChange={setSelectedTemplate}
                    onLanguageChange={setSelectedLanguage}
                  />
                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentStep('form')}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to Form
                    </Button>
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={() => setCurrentStep('download')}
                    >
                      Continue to Download
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 'download' && (
                <motion.div
                  key="download"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-semibold mb-2">Download & Share</h2>
                    <p className="text-muted-foreground">Get your print-ready biodata PDF.</p>
                  </div>
                  <DownloadShare
                    onDownload={handleGeneratePdf}
                    isGenerating={isGeneratingPdf}
                    downloadReady={downloadReady}
                    pdfBlob={pdfBlob}
                  />
                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentStep('template')}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Change Template
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel - Preview */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-semibold">Live Preview</h3>
              </div>
              <div className="rounded-2xl border border-border shadow-medium overflow-hidden bg-white">
                <div className="transform scale-[0.6] origin-top-left w-[166.67%] -mb-[40%]">
                  <BiodataPreview
                    ref={previewRef}
                    formData={formData}
                    templateId={selectedTemplate}
                    language={selectedLanguage}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Preview updates as you type
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
