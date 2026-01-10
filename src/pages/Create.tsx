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

    const generatedAboutMe = `I am a ${formData.occupation || 'professional'} based in ${formData.city || 'India'}.`;
    handleFormChange({ aboutMe: generatedAboutMe.slice(0, 200) });

    setIsGeneratingAboutMe(false);
    toast({ title: 'About Me Generated!' });
  };

  const handleGeneratePdf = async () => {
    if (!previewRef.current) return;

    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'JPEG', 0, 0);

      const blob = pdf.output('blob');
      setPdfBlob(blob);
      setDownloadReady(true);

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.fullName || 'biodata'}_biodata.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast({ title: 'PDF Downloaded!' });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </header>

      <main className="container py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {currentStep === 'form' && (
            <>
              <BiodataForm
                formData={formData}
                onChange={handleFormChange}
                onGenerateAboutMe={handleGenerateAboutMe}
                isGenerating={isGeneratingAboutMe}
              />
              <Button onClick={() => setCurrentStep('template')}>
                Continue <ChevronRight />
              </Button>
            </>
          )}

          {currentStep === 'template' && (
            <>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                selectedLanguage={selectedLanguage}
                onTemplateChange={setSelectedTemplate}
                onLanguageChange={setSelectedLanguage}
              />
              <div className="flex justify-between">
                <Button onClick={() => setCurrentStep('form')}>
                  <ChevronLeft /> Back
                </Button>
                <Button onClick={() => setCurrentStep('download')}>
                  Continue <ChevronRight />
                </Button>
              </div>
            </>
          )}

          {currentStep === 'download' && (
            <DownloadShare
              onDownload={handleGeneratePdf}
              isGenerating={isGeneratingPdf}
              downloadReady={downloadReady}
              pdfBlob={pdfBlob}
            />
          )}
        </div>

        <div className="sticky top-24">
          <Eye className="w-5 h-5" />
          <BiodataPreview
            ref={previewRef}
            formData={formData}
            templateId={selectedTemplate}
            language={selectedLanguage}
          />
        </div>
      </main>
    </div>
  );
};

export default Create;
