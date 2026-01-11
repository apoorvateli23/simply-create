import { motion } from 'framer-motion';
import { Download, Share2, MessageCircle, Mail, CheckCircle } from 'lucide-react';
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
    
    const message = encodeURIComponent(
      "Here's my marriage biodata. Please review and let me know your thoughts!"
    );
    
    if (navigator.share && pdfBlob) {
      const file = new File([pdfBlob], 'biodata.pdf', { type: 'application/pdf' });
      navigator.share({
        title: 'Marriage Biodata',
        text: 'Here is my marriage biodata',
        files: [file],
      }).catch(console.error);
    } else {
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
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Main Download Card */}
      <div className="p-8 rounded-xl bg-card border border-border text-center">
        {downloadReady ? (
          <>
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-display text-xl font-medium mb-2">Ready!</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Your high-quality PDF has been generated.
            </p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Download className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-xl font-medium mb-2">Download PDF</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Generate a print-ready PDF of your biodata.
            </p>
          </>
        )}

        <Button
          onClick={onDownload}
          disabled={isGenerating}
          className="w-full max-w-xs mx-auto rounded-full h-12"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Generating...
            </>
          ) : downloadReady ? (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download Again
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {/* Share Options */}
      {downloadReady && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-4 h-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">Share</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={shareViaWhatsApp}
              className="h-11"
            >
              <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
              WhatsApp
            </Button>
            
            <Button
              variant="outline"
              onClick={shareViaEmail}
              className="h-11"
            >
              <Mail className="w-4 h-4 mr-2 text-blue-600" />
              Email
            </Button>
          </div>
        </motion.div>
      )}

      {/* Privacy Note */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border">
        <p className="text-xs text-center text-muted-foreground">
          <span className="inline-block mr-1">🔒</span>
          Your data is processed locally and never stored.
        </p>
      </div>
    </motion.div>
  );
};

export default DownloadShare;
