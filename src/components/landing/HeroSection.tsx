import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-50">
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full px-2 py-2 border border-border shadow-soft">
          <a href="#" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#how-it-works" className="px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            How it works
          </a>
          <Button 
            size="sm" 
            onClick={onGetStarted}
            className="rounded-full"
          >
            Create Now
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20">
        {/* Subtle decorative element */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] opacity-30 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-primary/20">
            <path
              d="M100,10 Q150,50 190,100 Q150,150 100,190 Q50,150 10,100 Q50,50 100,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M100,30 Q140,60 170,100 Q140,140 100,170 Q60,140 30,100 Q60,60 100,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        <div className="max-w-3xl">
          {/* Small badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              ✓ Free • No signup required
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6"
          >
            Marriage biodata,
            <br />
            <span className="text-primary">reimagined</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            Create a beautiful, professional biodata in minutes. 
            Clean templates, simple process, instant download.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <Button
              size="lg"
              onClick={onGetStarted}
              className="group rounded-full px-8 h-14 text-base font-medium"
            >
              Start creating
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Ready in 3 minutes
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-12 left-6 md:left-12 lg:left-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground tracking-wider uppercase">Scroll</span>
            <div className="w-px h-12 bg-border" />
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 lg:px-20 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              How it works
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-medium">
              Three simple steps
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                number: '01',
                title: 'Enter your details',
                description: 'Fill in your personal information using our intuitive form. Takes just a few minutes.',
              },
              {
                number: '02',
                title: 'Pick a template',
                description: 'Choose from traditional, modern, or minimalist designs that suit your style.',
              },
              {
                number: '03',
                title: 'Download PDF',
                description: 'Get a high-quality, print-ready PDF instantly. Share it however you like.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <span className="text-5xl font-display font-medium text-primary/20 group-hover:text-primary/40 transition-colors">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-medium mt-4 mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
                Privacy first.
                <br />
                Always.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your data never leaves your browser. We don't store, share, or track 
                your personal information. Create with confidence.
              </p>
              <ul className="space-y-3">
                {['No account required', 'No data stored', 'No tracking'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-card border border-border shadow-medium p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="font-display text-lg font-medium">100% Private</p>
                  <p className="text-sm text-muted-foreground mt-1">Your data stays with you</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
              Ready to create your biodata?
            </h2>
            <p className="text-muted-foreground mb-8">
              It's completely free. No signup. No hassle.
            </p>
            <Button
              size="lg"
              onClick={onGetStarted}
              className="group rounded-full px-10 h-14 text-base font-medium"
            >
              Get started now
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 lg:px-20 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2025 Biodata Creator</span>
          <span>Made with care</span>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
