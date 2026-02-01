import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface HeroSectionProps {
  onGetStarted: () => void;
}

// Floating decorative elements
const FloatingElement = ({
  children,
  delay = 0,
  duration = 4,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => <motion.div initial={{
  opacity: 0,
  scale: 0
}} animate={{
  opacity: 1,
  scale: 1,
  y: [0, -8, 0]
}} transition={{
  opacity: {
    duration: 0.5,
    delay
  },
  scale: {
    duration: 0.5,
    delay
  },
  y: {
    duration,
    repeat: Infinity,
    ease: "easeInOut",
    delay
  }
}} className={className}>
    {children}
  </motion.div>;
const HeroSection = ({
  onGetStarted
}: HeroSectionProps) => {
  return <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <motion.nav initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div className="flex items-center gap-2" whileHover={{
          scale: 1.02
        }}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <Heart className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <span className="font-display text-xl font-semibold">SimplyCreate</span>
          </motion.div>
          
          <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full px-2 py-2 border border-border shadow-soft">
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary">
              Home
            </a>
            <a href="#how-it-works" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary">
              How it works
            </a>
            <Button size="sm" onClick={onGetStarted} className="rounded-full shadow-glow hover:shadow-lg transition-all">
              Create Now
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement delay={0.2} duration={5} className="absolute top-[15%] right-[10%]">
            <div className="w-20 h-20 rounded-full bg-primary/10" />
          </FloatingElement>
          <FloatingElement delay={0.5} duration={4} className="absolute top-[30%] right-[25%]">
            <div className="w-6 h-6 rounded-full bg-primary/20" />
          </FloatingElement>
          <FloatingElement delay={0.8} duration={6} className="absolute bottom-[25%] right-[15%]">
            <Star className="w-6 h-6 text-primary/25 fill-current" />
          </FloatingElement>
          <FloatingElement delay={1} duration={5} className="absolute top-[20%] left-[75%]">
            <Heart className="w-5 h-5 text-primary/20 fill-current" />
          </FloatingElement>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/50 to-transparent" />
        </div>

        <div className="max-w-4xl relative z-10">
          {/* Friendly badge */}
          <motion.div initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.4
        }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium text-secondary-foreground border border-border">
              <Sparkles className="w-4 h-4 text-primary" />
              Free forever • No signup required
            </span>
          </motion.div>

          {/* Main Headline - More fun and friendly */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
            Create your perfect
            <br />
            <span className="relative">
              <span className="text-primary">marriage biodata</span>
              <motion.span initial={{
              scaleX: 0
            }} animate={{
              scaleX: 1
            }} transition={{
              duration: 0.6,
              delay: 0.6
            }} className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/15 -z-10 rounded-full origin-left" />
            </span>
            {' '}
            <motion.span initial={{
            opacity: 0,
            rotate: -10
          }} animate={{
            opacity: 1,
            rotate: 0
          }} transition={{
            duration: 0.5,
            delay: 0.8
          }} className="inline-block">
              ✨
            </motion.span>
          </motion.h1>

          {/* Subtitle - Warmer tone */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
            Beautiful templates, simple process, instant download. 
            <br className="hidden md:block" />
            Start your journey to finding your perfect match! 💕
          </motion.p>

          {/* CTA - More prominent and fun */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button size="lg" onClick={onGetStarted} className="group rounded-full px-8 h-14 text-base font-medium shadow-glow hover:shadow-lg transition-all hover:-translate-y-0.5">
              Start creating — it's free!
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
          </motion.div>
        </div>

        {/* Scroll indicator - subtle corner placement */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 0.5
      }} whileHover={{
        opacity: 1
      }} transition={{
        delay: 1.2,
        duration: 0.5
      }} className="absolute bottom-6 right-6">
          <motion.div animate={{
          y: [0, 4, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }} className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({
          behavior: 'smooth'
        })}>
            <div className="w-5 h-8 rounded-full border border-border/60 group-hover:border-primary/60 transition-colors flex items-start justify-center p-1">
              <motion.div animate={{
              y: [0, 10, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="w-1 h-1 rounded-full bg-muted-foreground/60 group-hover:bg-primary transition-colors" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 lg:px-20 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card text-sm font-medium text-muted-foreground border border-border mb-4">
              <Star className="w-4 h-4 text-primary fill-current" />
              Super simple
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">
              Three easy steps to your
              <br />
              <span className="text-primary">beautiful biodata</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
            number: '01',
            emoji: '✍️',
            title: 'Fill in your details',
            description: 'Enter your personal information using our friendly, intuitive form.'
          }, {
            number: '02',
            emoji: '🎨',
            title: 'Pick your style',
            description: 'Choose from beautiful traditional, modern, or minimalist designs.'
          }, {
            number: '03',
            emoji: '📄',
            title: 'Download & share',
            description: 'Get a stunning, print-ready PDF instantly. Share it anywhere!'
          }].map((step, index) => <motion.div key={step.number} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} whileHover={{
            y: -4
          }} className="relative bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-medium transition-all group">
                <div className="absolute -top-4 left-8">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-glow">
                    {index + 1}
                  </span>
                </div>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {step.emoji}
                </div>
                <h3 className="font-display text-xl font-medium mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium text-muted-foreground border border-border mb-4">
                🔒 Your privacy matters
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
                100% private.
                <br />
                <span className="text-primary">Always.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your data never leaves your browser. We don't store, share, or track 
                your personal information. Create with complete peace of mind.
              </p>
              <ul className="space-y-4">
                {[{
                icon: '✓',
                text: 'No account required'
              }, {
                icon: '✓',
                text: 'No data stored on servers'
              }, {
                icon: '✓',
                text: 'No tracking or analytics'
              }].map(item => <motion.li key={item.text} className="flex items-center gap-3 text-sm" whileHover={{
                x: 4
              }}>
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.text}</span>
                  </motion.li>)}
              </ul>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }} className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary via-card to-secondary border border-border shadow-medium p-8 flex items-center justify-center">
                <motion.div className="text-center" animate={{
                y: [0, -8, 0]
              }} transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}>
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <span className="text-5xl">🔐</span>
                  </div>
                  <p className="font-display text-2xl font-medium">100% Private</p>
                  <p className="text-muted-foreground mt-2">Your data stays with you</p>
                </motion.div>
              </div>
              {/* Decorative elements */}
              <FloatingElement delay={0.3} duration={4} className="absolute -top-4 -right-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary fill-current" />
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }}>
            <motion.div animate={{
            scale: [1, 1.1, 1]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }} className="text-5xl mb-6">
              💫
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
              Ready to create your biodata?
            </h2>
            <p className="text-muted-foreground mb-8">
              It's completely free. No signup. No hassle.
              <br />
              Just beautiful biodatas in minutes!
            </p>
            <Button size="lg" onClick={onGetStarted} className="group rounded-full px-10 h-14 text-base font-medium shadow-glow hover:shadow-lg transition-all hover:-translate-y-0.5">
              Get started now — free!
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 lg:px-20 border-t border-border bg-card">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground fill-current" />
            </div>
            <span className="font-display text-lg font-medium">SimplyCreate</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 SimplyCreate. Made with 💕 for your special journey.
          </p>
        </div>
      </footer>
    </div>;
};
export default HeroSection;