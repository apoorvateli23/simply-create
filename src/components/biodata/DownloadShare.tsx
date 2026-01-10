import { motion } from 'framer-motion';
import { Download, Share2, MessageCircle, Mail, CheckCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DownloadShareProps {
  onDownload: () => void;
  isGenerating: boolean;
  downloadReady: boolean;
  pdfBlob: Blob | null;
}

const DownloadShare = ({ onDownload, isGenerating, downloadReady, pdfBlob }: DownloadShareProps) => {
  const shareViaWhatsApp = () => {
    if (!pdfBlob) return;
    
    // Create a shareable message
    const message = encodeURIComponent(
      "Here's my marriage biodata. Please review and let me know your thoughts!"
    );
    
    // On mobile, we can try to share the file directly
    if (navigator.share && pdfBlob) {
      const file = new File([pdfBlob], 'biodata.pdf', { type: 'application/pdf' });
      navigator.share({
        title: 'Marriage Biodata',
        text: 'Here is my marriage biodata',
        files: [file],
      }).catch(console.error);
    } else {
      // Fallback to WhatsApp web with text only
      window.open(`https://wa.me/?text=${message}`, '_blank');
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Marriage Biodata');
    const body = encodeURIComponent(
      "Dear,\n\nPlease find attached my marriage biodata for your review.\n\nLooking forward to hearing from you.\n\nBest regards"
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Download Card */}
      <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-medium text-center">
        {downloadReady ? (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-display text-2xl font-semibold mb-2">Your Biodata is Ready!</h3>
            <p className="text-muted-foreground mb-6">
              High-quality, print-ready PDF has been generated successfully.
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-semibold mb-2">Download Your Biodata</h3>
            <p className="text-muted-foreground mb-6">
              Generate a high-quality, print-ready PDF of your biodata.
            </p>
          </>
        )}

        <Button
          variant="hero"
          size="xl"
          onClick={onDownload}
          disabled={isGenerating}
          className="w-full max-w-xs mx-auto"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Generating PDF...
            </>
          ) : downloadReady ? (
            <>
              <Download className="w-5 h-5" />
              Download Again
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download High Quality PDF
            </>
          )}
        </Button>
      </div>

      {/* Share Options */}
      {downloadReady && (
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-primary" />
            <h4 className="font-display text-lg font-semibold">Share Your Biodata</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="soft"
              size="lg"
              onClick={shareViaWhatsApp}
              className="w-full"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              Share on WhatsApp
            </Button>
            
            <Button
              variant="soft"
              size="lg"
              onClick={shareViaEmail}
              className="w-full"
            >
              <Mail className="w-5 h-5 text-blue-600" />
              Share via Email
            </Button>
          </div>
        </div>
      )}

      {/* Privacy Reminder */}
      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 flex items-start gap-3">
        <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-green-800 dark:text-green-200">
          <strong>Your privacy is protected.</strong> We do not store your personal details and biodata after download. 
          All data is processed temporarily and deleted immediately.
        </p>
      </div>
    </motion.div>
  );
};

export default DownloadShare;
