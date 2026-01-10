import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold/5 rounded-full" />
      </div>

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm text-muted-foreground mb-8">
              <Shield className="w-4 h-4 text-primary" />
              <span>100% Free • No Sign-up • Privacy First</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-6"
          >
            Create Your Perfect{' '}
            <span className="text-gradient-gold">Marriage Biodata</span>
            <br />
            in Minutes
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Beautiful templates, AI-powered content, multi-language support. 
            Simply enter your details and download a print-ready PDF.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={onGetStarted}
              className="group"
            >
              Create Biodata — Completely Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* 3-Step Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                step: '01',
                icon: <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-semibold">1</div>,
                title: 'Enter Details',
                description: 'Fill in your information with our simple, guided form',
              },
              {
                step: '02',
                icon: <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-display font-semibold">2</div>,
                title: 'Choose Template',
                description: 'Pick from traditional, modern, or minimalist designs',
              },
              {
                step: '03',
                icon: <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-semibold">3</div>,
                title: 'Download PDF',
                description: 'Get your print-ready biodata instantly',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="relative p-6 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {item.icon}
                  <h3 className="font-display text-lg font-semibold mt-4 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>No Data Stored</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span>Ready in 3 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" />
              <span>High-Quality PDF</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
